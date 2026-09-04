import { useContext, useState } from "react";
import { UpcomingAppointment } from "./upcoming-appointment";
import { AppointmentHistory } from "./appointment-history";
import { Clock, History, FileText } from "lucide-react";
import { MedicalRecordView } from "@/features/medical-record/presentation/medical-record-view";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { ScheduleAppointmentForm } from "./schedule-appointment-form";
import { TabsAppointmentView } from "@/common/presentation/enums";
import { useSearchParams } from "react-router-dom";

type Tab = TabsAppointmentView.UPCOMING | TabsAppointmentView.HISTORY | TabsAppointmentView.MEDICAL_RECORD | TabsAppointmentView.SCHEDULE;

export const AppointmentsAndHistoryView = () => {
    const [searchParams] = useSearchParams();

    const [activeTab, setActiveTab] = useState<Tab>(TabsAppointmentView[searchParams.get('tab') as keyof typeof TabsAppointmentView] || TabsAppointmentView.UPCOMING);

    const { user } = useContext(MainLayoutContext)!;

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {activeTab === TabsAppointmentView.UPCOMING && 'Próximas Citas'}
                        {activeTab === TabsAppointmentView.HISTORY && 'Historial de Citas'}
                        {activeTab === TabsAppointmentView.MEDICAL_RECORD && 'Historial Médico'}
                        {activeTab === TabsAppointmentView.SCHEDULE && 'Agendar Cita'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {activeTab === TabsAppointmentView.UPCOMING && 'Consulta y gestiona las próximas citas veterinarias'}
                        {activeTab === TabsAppointmentView.HISTORY && 'Revisa el registro de citas pasadas'}
                        {activeTab === TabsAppointmentView.MEDICAL_RECORD && 'Revisa toda la información médica e historial clínico'}
                        {activeTab === TabsAppointmentView.SCHEDULE && 'Agenda una nueva consulta veterinaria'}
                    </p>
                </div>
                {activeTab !== TabsAppointmentView.SCHEDULE && user.role == UserRole.veterinary && (
                    <Button
                        onClick={() => setActiveTab(TabsAppointmentView.SCHEDULE)}
                        className="cursor-pointer gap-2"
                    >
                        <Plus className="size-4" />
                        Agendar Cita
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-muted/50 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab(TabsAppointmentView.UPCOMING)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === TabsAppointmentView.UPCOMING
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Clock className="size-4" />
                    Próximas
                </button>
                <button
                    onClick={() => setActiveTab(TabsAppointmentView.HISTORY)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === TabsAppointmentView.HISTORY
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <History className="size-4" />
                    Historial de Citas
                </button>
                <button
                    onClick={() => setActiveTab(TabsAppointmentView.MEDICAL_RECORD)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === TabsAppointmentView.MEDICAL_RECORD
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <FileText className="size-4" />
                    Historial Médico
                </button>
            </div>

            {/* Content */}
            <div className="mt-1">

                {activeTab === TabsAppointmentView.SCHEDULE && (
                    <div className="max-w-2xl mx-auto w-full">
                        <ScheduleAppointmentForm onSuccess={() => setActiveTab(TabsAppointmentView.UPCOMING)} />
                    </div>
                )}
                {activeTab === TabsAppointmentView.UPCOMING && <UpcomingAppointment />}
                {activeTab === TabsAppointmentView.HISTORY && <AppointmentHistory />}
                {activeTab === TabsAppointmentView.MEDICAL_RECORD && <MedicalRecordView />}
            </div>
        </div>
    );
};

