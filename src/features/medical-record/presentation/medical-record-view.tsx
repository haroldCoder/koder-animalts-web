import { useContext, useMemo, useState } from "react";
import { useAuth } from "@/common/hooks";
import { useGetMedicalRecordsByUserId } from "../application/queries";
import { MedicalRecordEntity } from "../domain/entities";
import { MedicalRecordCardToggle, MedicalRecordHistoryEmpty } from "./components";
import { ScheduleMedicalRecord } from "./schedule-medical-record";
import { DatePicker, Error, Loading } from "@/common/presentation/components";
import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useGetPetsByOwnerUserId, useGetPetsByVeterinaryUserId } from "@/features/pet/application/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const MedicalRecordView = () => {
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    const { user: userContext } = useContext(MainLayoutContext)!;

    const { data: pets, isLoading: isLoadingPets } = userContext?.role === UserRole.veterinary ? useGetPetsByVeterinaryUserId(user!) : useGetPetsByOwnerUserId(user!);
    const context = useContext(MainLayoutContext);

    const [filters, setFilters] = useState<{
        petId: string | undefined;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({
        petId: undefined,
        startDate: undefined,
        endDate: undefined
    });

    const { data: records, isLoading, error } = useGetMedicalRecordsByUserId(user!, filters);

    const selectedPet = useMemo(() => pets?.find(
        pet => pet.id === filters.petId
    ), [pets, filters.petId]);

    if (error) return <Error message={error?.message || "Error al cargar el historial médico"} />;

    if (showForm) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <ScheduleMedicalRecord />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <ClipboardList className="size-6 text-primary" />
                        <h1 className="text-2xl font-bold tracking-tight">Historial Médico</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Consulta y gestiona el registro clínico completo de tus mascotas
                    </p>
                </div>
                {
                    context?.user.role === UserRole.veterinary && (
                        <Button
                            onClick={() => setShowForm(true)}
                            className="cursor-pointer gap-2"
                        >
                            <Plus className="size-4" />
                            Nuevo Registro
                        </Button>
                    )
                }

            </div>

            {/* filters */}
            <div className="flex items-center gap-4">
                <Select
                    value={filters.petId}
                    onValueChange={(value) => {
                        setFilters(prev => ({
                            ...prev,
                            petId: value ?? ""
                        }));
                    }}
                >
                    <SelectTrigger className="w-full">
                        {selectedPet ? (
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={selectedPet.image} />
                                    <AvatarFallback>
                                        {selectedPet.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <span>{selectedPet.name}</span>
                            </div>
                        ) : (
                            <SelectValue placeholder="Selecciona una mascota" />
                        )}
                    </SelectTrigger>

                    <SelectContent>
                        {isLoadingPets ? (
                            <div className="flex items-center justify-center p-2">
                                <Loading />
                            </div>
                        ) : (
                            pets?.map((pet) => (
                                <SelectItem
                                    key={pet.id}
                                    value={pet.id}
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={pet.image} />
                                            <AvatarFallback>
                                                {pet.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span>{pet.name}</span>
                                    </div>
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
                <DatePicker
                    startDate={filters.startDate ?? new Date()}
                    endDate={filters.endDate ?? new Date()}
                    setStartDate={(value?: Date) => {
                        setFilters(prev => ({ ...prev, startDate: value ?? new Date() }))
                    }}
                    setEndDate={(value?: Date) => {
                        setFilters(prev => ({ ...prev, endDate: value ?? new Date() }))
                    }}
                />
                <Button
                    className="cursor-pointer bg-main px-8 py-4"
                    onClick={() => setFilters({ petId: undefined, startDate: undefined, endDate: undefined })}
                >
                    Limpiar filtros
                </Button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex justify-center">
                    <Loading />
                </div>
            ) : !records || records.length === 0 ? (
                <div className="py-20">
                    <MedicalRecordHistoryEmpty />
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {records.map((record: MedicalRecordEntity) => (
                        <MedicalRecordCardToggle key={record.id} medicalRecord={record} />
                    ))}
                </div>
            )}
        </div>
    );
};
