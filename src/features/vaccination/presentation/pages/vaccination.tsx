import { DataTable } from "@/common/presentation/components";
import { columnsTable } from "../constants";
import { Button } from "@/components/ui/button";
import { Syringe, ChevronDown, Activity } from "lucide-react";
import styles from "./vaccination.module.css";
import { useMemo, useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useGetAllVaccinationsQuery } from "../../application/queries";
import { useAuth } from "@/common/hooks";

export const Vaccination = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const { user } = useAuth();
    const { data: vaccinationsData, isLoading } = useGetAllVaccinationsQuery(user!, {});

    const vaccinationsMappedData = useMemo(() => {
        if (!vaccinationsData) return [];
        return vaccinationsData.map(vaccination => ({
            ...vaccination,
            date: format(vaccination.date, "dd/MM/yyyy"),
            nextDate: vaccination.nextDate ? format(vaccination.nextDate, "dd/MM/yyyy") : "-",
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

    useEffect(() => {
        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener("resize", checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkOverflow);
        };
    }, [vaccinationsData]);

    return (
        <div className="h-[calc(100vh-70px)] flex flex-col p-6 md:p-8 gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Vacunas</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gestiona el historial de vacunación y próximos recordatorios de tus mascotas.</p>
                </div>
                <Button className="bg-main hover:bg-main-hover text-white transition-all hover:scale-105 shadow-md hover:shadow-lg py-5 px-6 font-semibold flex items-center gap-2 rounded-xl">
                    <Syringe className="w-5 h-5" />
                    Agregar Vacuna
                </Button>
            </div>
            
            <div className="relative flex-1 min-h-0 flex flex-col bg-bg-dark-1/5 dark:bg-bg-dark-2/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
                <div
                    ref={containerRef}
                    onScroll={checkOverflow}
                    className="flex-1 overflow-y-auto p-4 md:p-6"
                >
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-16 w-full bg-gray-200/50 dark:bg-bg-dark-1 animate-pulse rounded-xl"></div>
                            ))}
                        </div>
                    ) : vaccinationsMappedData.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mb-6">
                                <Activity className="w-10 h-10 text-main opacity-80" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No hay vacunas registradas</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">Aún no has registrado ninguna vacuna para tus mascotas. Mantén al día su historial médico registrando la primera ahora.</p>
                            <Button className="bg-main hover:bg-main-hover text-white flex items-center gap-2 rounded-xl">
                                <Syringe className="w-4 h-4" />
                                Registrar Primera Vacuna
                            </Button>
                        </div>
                    ) : (
                        <div className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
                            <DataTable columns={columnsTable} data={vaccinationsMappedData} styles={styles.table} />
                        </div>
                    )}
                </div>
                
                {showScrollIndicator && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <Button 
                            onClick={() => containerRef.current?.scrollTo({ top: containerRef.current?.scrollHeight, behavior: "smooth" })} 
                            size="icon" 
                            className="pointer-events-auto bg-white/80 dark:bg-bg-dark-2/80 backdrop-blur-md text-main hover:text-main-hover hover:bg-white dark:hover:bg-bg-dark-1 shadow-lg border border-gray-200 dark:border-gray-700 h-10 w-10 rounded-full transition-all duration-300 animate-bounce cursor-pointer"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
