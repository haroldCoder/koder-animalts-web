import { useState } from "react";
import { useAuth } from "@/common/hooks";
import { useGetMedicalRecordsByUserId } from "../application/queries";
import { MedicalRecordEntity } from "../domain/entities";
import { MedicalRecordCardToggle, MedicalRecordHistoryEmpty } from "./components";
import { ScheduleMedicalRecord } from "./schedule-medical-record";
import { Error, Loading } from "@/common/presentation/components";
import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MedicalRecordView = () => {
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    const { data: records, isLoading, error } = useGetMedicalRecordsByUserId(user!);

    if (isLoading) return <Loading />;
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
                <Button
                    onClick={() => setShowForm(true)}
                    className="cursor-pointer gap-2"
                >
                    <Plus className="size-4" />
                    Nuevo Registro
                </Button>
            </div>

            {/* Content */}
            {!records || records.length === 0 ? (
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
