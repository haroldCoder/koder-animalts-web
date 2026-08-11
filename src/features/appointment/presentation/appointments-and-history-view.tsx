import { useState } from "react";
import { UpcomingAppointment } from "./upcoming-appointment";
import { CalendarDays, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalRecordView } from "@/features/medical-record/presentation/medical-record-view";
import { ScheduleAppointmentForm } from "./schedule-appointment-form";

type Tab = 'upcoming' | 'history' | 'schedule';

export const AppointmentsAndHistoryView = () => {
    const [activeTab, setActiveTab] = useState<Tab>('upcoming');

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {activeTab === 'history' ? 'Historial de Citas' : 'Mis Citas'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {activeTab === 'upcoming' && 'Consulta y gestiona tus próximas citas veterinarias'}
                        {activeTab === 'history' && 'Revisa todas las citas que ya han ocurrido'}
                        {activeTab === 'schedule' && 'Agenda una nueva consulta veterinaria'}
                    </p>
                </div>
                {activeTab !== 'schedule' && (
                    <Button
                        onClick={() => setActiveTab('schedule')}
                        className="cursor-pointer gap-2"
                    >
                        <Plus className="size-4" />
                        Agendar Cita
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'upcoming'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Clock className="size-4" />
                    Próximas
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'history'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <CalendarDays className="size-4" />
                    Historial
                </button>
            </div>

            {/* Content */}
            <div className="mt-1">
                {activeTab === 'upcoming' && <UpcomingAppointment />}
                {activeTab === 'history' && <MedicalRecordView />}
                {activeTab === 'schedule' && (
                    <div className="max-w-2xl mx-auto w-full">
                        <ScheduleAppointmentForm onSuccess={() => setActiveTab('upcoming')} />
                    </div>
                )}
            </div>
        </div>
    );
};
