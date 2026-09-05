import { useContext, useMemo } from "react";
import { UpcomingAppointment } from "./upcoming-appointment";
import { AppointmentHistory } from "./appointment-history";
import { MedicalRecordView } from "@/features/medical-record/presentation/medical-record-view";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { ScheduleAppointmentForm } from "./schedule-appointment-form";
import { TabsAppointmentView } from "@/common/presentation/enums";
import { useSearchParams } from "react-router-dom";
import { useAvailableTabs } from "./hooks";

type Tab = TabsAppointmentView.UPCOMING | TabsAppointmentView.HISTORY | TabsAppointmentView.MEDICAL_RECORD | TabsAppointmentView.SCHEDULE;

export const AppointmentsAndHistoryView = () => {
    const [searchParams] = useSearchParams();

    const { user } = useContext(MainLayoutContext)!;

    const { activeTab, setActiveTab, tabs } = useAvailableTabs({ userRole: user.role, tab: searchParams.get('tab') ?? undefined });

    const activeTabInfo = useMemo(() => tabs.find(t => t.id === activeTab), [activeTab, tabs]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {activeTabInfo?.label}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {activeTabInfo?.description}
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
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === tab.id
                                ? 'bg-background shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="size-4" />
                            {tab.label}
                        </button>
                    );
                })}
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

