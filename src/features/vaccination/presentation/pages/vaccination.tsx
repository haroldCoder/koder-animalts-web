import { CarouselSelectPet, DataTable, NotFoundVaccinations } from "@/common/presentation/components";
import { CreateVaccinationDialog, FilterStatus } from "../components";
import { columnsTable } from "../constants";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import styles from "./vaccination.module.css";
import { useMemo, useState, useEffect, useRef, useContext } from "react";
import { useGetAllVaccinationsQuery } from "../../application/queries";
import { useAuth } from "@/common/hooks";
import { useSearchParams } from "react-router-dom";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useGetPetsByOwnerUserId } from "@/features/pet/application/queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VaccinationStatus } from "../../domain/enums";

export const Vaccination = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const { user } = useAuth();
    const { user: userSession } = useContext(MainLayoutContext)!;

    const [searchParams] = useSearchParams();
    const medicalRecordId = searchParams.get("medicalRecord");
    const startDateString = searchParams.get("startDate");
    const endDateString = searchParams.get("endDate");
    const [petIdSelected, setPetIdSelected] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<VaccinationStatus[] | null>(null);
    const [page, setPage] = useState<number>(1);
    const limit = 6;

    const { data: vaccinationsData, isLoading } = useGetAllVaccinationsQuery(user!, {
        page,
        limit,
        medicalRecordId: medicalRecordId ?? undefined,
        petId: petIdSelected == "" ? undefined : petIdSelected,
        startDate: startDateString ? new Date(startDateString) : undefined,
        endDate: endDateString ? new Date(endDateString) : undefined,
        status: statusFilter ?? undefined
    });

    useEffect(() => {
        setPage(1);
    }, [petIdSelected, statusFilter, medicalRecordId, startDateString, endDateString]);

    const { data: pets, isLoading: isLoadingPets } = useGetPetsByOwnerUserId(user!);


    const vaccinationsMappedData = useMemo(() => {
        if (!vaccinationsData?.vaccinations) return [];
        return vaccinationsData.vaccinations.map(vaccination => ({
            ...vaccination,
            date: vaccination.date ?? "-",
            nextDate: vaccination.nextDate ?? "-",
            lotNumber: vaccination.lotNumber ?? "-"
        }))
    }, [vaccinationsData])


    const checkOverflow = () => {
        const element = containerRef.current;
        if (element) {
            const hasOverflow = element.scrollHeight > element.clientHeight;
            const isNotAtBottom = element.scrollTop + element.clientHeight < element.scrollHeight - 10;
            setShowScrollIndicator(hasOverflow && isNotAtBottom);
        }
    };

    const selectedPet = (petId: string) => {
        setPetIdSelected(petId);
    }

    useEffect(() => {
        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener("resize", checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkOverflow);
        };
    }, [vaccinationsData]);

    const petsData = useMemo(() => {
        if (!pets) return [];
        return pets;
    }, [pets]);

    const changeStatusFiler = (status: VaccinationStatus[]) => {
        setStatusFilter(status);
    }

    return (
        <div className="flex flex-col p-6 md:p-8 gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Vacunas</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gestiona el historial de vacunación y próximos recordatorios de tus mascotas.</p>
                </div>
                {
                    userSession.role == UserRole.veterinary && (
                        <CreateVaccinationDialog />
                    )
                }

            </div>

            <div className="relative flex-1 min-h-0 flex py-2 flex-col bg-bg-dark-1/5 dark:bg-bg-dark-2/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
                {
                    userSession.role == UserRole.owner && (
                        <CarouselSelectPet pets={petsData} selectedPet={petIdSelected} onSelectPet={selectedPet} isLoading={isLoadingPets} />
                    )
                }
                <div className="flex justify-end px-3 ">
                    <FilterStatus onChange={changeStatusFiler} value={statusFilter ?? []} />
                </div>

                <div
                    ref={containerRef}
                    onScroll={checkOverflow}
                    className="flex-1 overflow-y-auto p-4 md:p-6"
                >
                    {vaccinationsMappedData.length === 0 && !isLoading ? (
                        <NotFoundVaccinations
                            description={userSession.role == UserRole.veterinary ? "Aún no has registrado ninguna vacuna para tus mascotas. Mantén al día su historial médico registrando la primera ahora." : ""}
                            createVaccinationDialog={() => userSession.role == UserRole.veterinary && <CreateVaccinationDialog />} />
                    ) : (
                        <div className="rounded-xl max-h-[45dvh] border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
                            <ScrollArea className="h-full">
                                <DataTable
                                    columns={columnsTable}
                                    data={vaccinationsMappedData}
                                    styles={styles.table}
                                    pagination={{
                                        hasPrev: vaccinationsData?.pagination.hasPrev ?? false,
                                        hasNext: vaccinationsData?.pagination.hasNext ?? false,
                                        total: vaccinationsData?.pagination.total ?? 0,
                                        limit: vaccinationsData?.pagination.limit ?? 0,
                                        page: vaccinationsData?.pagination.page ?? 0,
                                        totalPages: vaccinationsData?.pagination.totalPages ?? 0,
                                        onPageChange: setPage,
                                    }}
                                    isLoading={isLoading}
                                />
                            </ScrollArea>
                        </div>
                    )}

                </div>

                {showScrollIndicator && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <Button
                            onClick={() => containerRef.current?.scrollTo({ top: containerRef.current?.scrollHeight, behavior: "smooth" })}
                            size="icon"
                            className="pointer-events-auto bg-gray-900/60 dark:bg-bg-dark-2/50 backdrop-blur-md text-main hover:text-main-hover hover:bg-white dark:hover:bg-bg-dark-1 shadow-lg border border-gray-200 dark:border-gray-700 h-10 w-10 rounded-full transition-all duration-300 animate-bounce cursor-pointer"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
