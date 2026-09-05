import { TabsAppointmentView } from "@/common/presentation/enums";
import { UserRole } from "@/features/user";
import { Clock, FileText, History } from "lucide-react";
import { useMemo, useState } from "react";

interface UseAvailableTabsArgs {
    userRole: UserRole;
    tab?: string;
}

export const useAvailableTabs = ({ userRole, tab }: UseAvailableTabsArgs) => {
    const isOwner = userRole === UserRole.owner;


    const defaultTab = isOwner
        ? TabsAppointmentView.UPCOMING
        : (TabsAppointmentView[tab as keyof typeof TabsAppointmentView] || TabsAppointmentView.UPCOMING);
    const [activeTab, setActiveTab] = useState<TabsAppointmentView>(defaultTab);
    const tabs = useMemo(() => [
        {
            id: TabsAppointmentView.UPCOMING,
            label: "Próximas",
            icon: Clock,
            description: "Consulta y gestiona las próximas citas veterinarias",
            allowed: true
        },
        {
            id: TabsAppointmentView.HISTORY,
            label: "Historial de Citas",
            icon: History,
            description: "Revisa el registro de citas pasadas",
            allowed: !isOwner
        },
        {
            id: TabsAppointmentView.MEDICAL_RECORD,
            label: "Historial Médico",
            icon: FileText,
            description: "Revisa toda la información médica e historial clínico",
            allowed: !isOwner
        },
    ].filter(tab => tab.allowed), [userRole]);

    return { activeTab, setActiveTab, tabs };
}
