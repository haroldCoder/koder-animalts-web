import { CalendarClock, CalendarPlus, FileText, History, LayoutDashboard, PawPrint, Syringe } from "lucide-react";
import { routes } from "./routes";

export const ownerLinks = [
    { name: "Dashboard", path: routes.home.link, icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Ver mis mascotas", path: routes.pets.link, icon: <PawPrint className="w-5 h-5" /> },
    { name: "Historial de citas", path: routes.history.link, icon: <History className="w-5 h-5" /> },
    { name: "Documentos de mis mascotas", path: routes.documents.link, icon: <FileText className="w-5 h-5" /> },
    { name: "Próximas citas", path: routes.appointments.link, icon: <CalendarClock className="w-5 h-5" /> },
];

export const veterinaryLinks = [
    { name: "Dashboard", path: routes.home.link, icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Próximas citas", path: routes.appointments.link, icon: <CalendarClock className="w-5 h-5" /> },
    { name: "Programar cita", path: routes.schedule.link, icon: <CalendarPlus className="w-5 h-5" /> },
    { name: "Documentos", path: routes.documents.link, icon: <FileText className="w-5 h-5" /> },
    { name: "Vacunas", path: routes.vaccinations.link, icon: <Syringe className="w-5 h-5" /> },
];