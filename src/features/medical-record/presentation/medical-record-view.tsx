import { useCallback, useContext, useMemo, useState } from "react";
import { useAuth, useClearParamOnCondition } from "@/common/hooks";
import { useGetMedicalRecordsByUserId } from "../application/queries";
import { MedicalRecordEntity } from "../domain/entities";
import {
    MedicalRecordCardToggle,
    MedicalRecordHistoryEmpty,
    TellHistory,
    PetBackgroundTab,
    RegisterPatientModal,
} from "./components";
import { ScheduleMedicalRecord } from "./schedule-medical-record";
import { DatePicker, Error, Loading } from "@/common/presentation/components";
import { Plus, ClipboardList, Star, Stethoscope, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { useGetPetsByOwnerUserId, useGetPetsByVeterinaryUserId } from "@/features/pet/application/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { routes } from "@/common/presentation/constants";
import { usePetOptionsWithRegister } from "./hooks";

export const MedicalRecordView = () => {
    const { medicalRecordId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState<"records" | "background">("records");
    const { user } = useAuth();
    const { user: userContext } = useContext(MainLayoutContext)!;
    const [historyVisual, setHistoryVisual] = useState(false);

    const { data: pets, isLoading: isLoadingPets, refetch: refetchPets } = userContext?.role === UserRole.veterinary ? useGetPetsByVeterinaryUserId(user!) : useGetPetsByOwnerUserId(user!);
    const context = useContext(MainLayoutContext);

    const [filters, setFilters] = useState<{
        medicalRecordId?: string;
        petId: string | undefined;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({
        medicalRecordId: medicalRecordId,
        petId: undefined,
        startDate: undefined,
        endDate: undefined
    });

    const {
        petsOptions,
        isRegisterPatientOpen,
        setIsRegisterPatientOpen,
        handlePetSelect,
        handlePetCreated,
    } = usePetOptionsWithRegister({
        pets,
        enableRegister: activeTab === "background" && context?.user.role === UserRole.veterinary,
        onSelectPet: (petId) => setFilters(prev => ({ ...prev, petId })),
        refetchPets,
    });

    const hasActiveFilters = !!(filters.petId || filters.startDate || filters.endDate)

    const queryFilters = useMemo(() => ({
        ...filters,
        medicalRecordId: hasActiveFilters ? undefined : (filters.medicalRecordId ?? medicalRecordId)
    }), [filters, hasActiveFilters, medicalRecordId]);

    const { data: records, isLoading, error } = useGetMedicalRecordsByUserId(user!, queryFilters);

    const handleClearParam = useCallback(() => {
        setFilters(prev => ({ ...prev, medicalRecordId: undefined }));
    }, []);

    useClearParamOnCondition(medicalRecordId, hasActiveFilters, routes.medicalRecord.link,
        () => handleClearParam()
    );

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <ClipboardList className="size-6 text-primary" />
                        <h1 className="text-2xl font-bold tracking-tight">Expediente Clínico</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Consulta y gestiona el historial de consultas, antecedentes y plan de vacunación
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {activeTab === "records" && (
                        <Button
                            disabled={!records || records.length === 0}
                            onClick={() => setHistoryVisual(prev => !prev)}
                            className="cursor-pointer bg-bg-dark-1 text-gray-300 hover:text-main hover:bg-bg-dark-2 gap-2 self-start sm:self-auto"
                        >
                            <Star className="text-main fill-main/20" />
                            {historyVisual ? "Ver historial en tarjetas" : "Contar historia"}
                        </Button>
                    )}

                    {context?.user.role === UserRole.veterinary && (
                        <Button
                            onClick={() => setShowForm(true)}
                            className="cursor-pointer gap-2 self-start sm:self-auto"
                        >
                            <Plus className="size-4" />
                            Nuevo Registro
                        </Button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-border-1 dark:border-border/10 pb-px">
                <button
                    type="button"
                    onClick={() => setActiveTab("records")}
                    className={`flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
                        activeTab === "records"
                            ? "border-main text-main dark:text-main"
                            : "border-transparent text-text-3 hover:text-text-1 dark:hover:text-white"
                    }`}
                >
                    <Stethoscope className="size-4" />
                    <span>Historial de Consultas</span>
                    {records && records.length > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            activeTab === "records" ? "bg-main/10 text-main" : "bg-bg-1 dark:bg-bg-dark-3 text-text-3"
                        }`}>
                            {records.length}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("background")}
                    className={`flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
                        activeTab === "background"
                            ? "border-main text-main dark:text-main"
                            : "border-transparent text-text-3 hover:text-text-1 dark:hover:text-white"
                    }`}
                >
                    <FileText className="size-4" />
                    <span>Antecedentes y Reseña</span>
                    {selectedPet && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            activeTab === "background" ? "bg-main/10 text-main" : "bg-bg-1 dark:bg-bg-dark-3 text-text-3"
                        }`}>
                            {selectedPet.name}
                        </span>
                    )}
                </button>
            </div>

            <RegisterPatientModal
                isOpen={isRegisterPatientOpen}
                onClose={() => setIsRegisterPatientOpen(false)}
                onPetCreated={handlePetCreated}
            />

            {/* Pet selector & filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Select
                    key={filters.petId || ""}
                    value={filters.petId ?? ""}
                    onValueChange={(value) => handlePetSelect(value)}
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
                            petsOptions.map((opt) => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.value === "-1" ? (
                                        <div className="flex items-center gap-2 w-full text-main font-medium py-0.5">
                                            <div className="size-6 rounded-full bg-main/10 flex items-center justify-center text-main shrink-0">
                                                <Plus className="size-3.5" />
                                            </div>
                                            <span>{opt.label}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarImage src={opt.image} />
                                                <AvatarFallback>
                                                    {opt.label.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <span>{opt.label}</span>
                                        </div>
                                    )}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>

                {activeTab === "records" && (
                    <>
                        <div className="w-full md:w-auto">
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
                        </div>
                        <Button
                            disabled={!hasActiveFilters}
                            className="cursor-pointer bg-main px-8 py-4 w-full md:w-auto"
                            onClick={() => setFilters({ petId: undefined, startDate: undefined, endDate: undefined })}
                        >
                            Limpiar filtros
                        </Button>
                    </>
                )}
            </div>

            {/* Content Tab Switching */}
            {activeTab === "background" ? (
                <PetBackgroundTab
                    pet={selectedPet}
                    isVeterinary={context?.user.role === UserRole.veterinary}
                />
            ) : (
                /* Tab Historial de Consultas */
                isLoading ? (
                    <div className="flex justify-center">
                        <Loading />
                    </div>
                ) : !records || records.length === 0 ? (
                    <div className="py-20">
                        <MedicalRecordHistoryEmpty />
                    </div>
                ) : (
                    historyVisual ? (
                        <TellHistory
                            medicalRecords={records}
                            pets={pets}
                            selectedPetId={filters.petId}
                            onSelectPetId={(petId) => setFilters(prev => ({ ...prev, petId }))}
                            onBackToCards={() => setHistoryVisual(false)}
                        />
                    ) : (
                        <div className="flex flex-col gap-4">
                            {records.map((record: MedicalRecordEntity) => (
                                <MedicalRecordCardToggle key={record.id} medicalRecord={record} />
                            ))}
                        </div>
                    )
                )
            )}
        </div>
    );
};
