import { CalendarClock, CalendarPlus, FileText, History, LayoutDashboard, PawPrint, Syringe } from "lucide-react";

export const ownerLinks = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Ver mis mascotas", path: "/home/pets", icon: <PawPrint className="w-5 h-5" /> },
    { name: "Historial de citas", path: "/home/history", icon: <History className="w-5 h-5" /> },
    { name: "Documentos de mis mascotas", path: "/home/documents", icon: <FileText className="w-5 h-5" /> },
    { name: "Próximas citas", path: "/home/appointments", icon: <CalendarClock className="w-5 h-5" /> },
];

export const veterinaryLinks = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Próximas citas", path: "/home/appointments", icon: <CalendarClock className="w-5 h-5" /> },
    { name: "Programar cita", path: "/home/schedule", icon: <CalendarPlus className="w-5 h-5" /> },
    { name: "Documentos", path: "/home/documents", icon: <FileText className="w-5 h-5" /> },
    { name: "Vacunas", path: "/home/vaccinations", icon: <Syringe className="w-5 h-5" /> },
];