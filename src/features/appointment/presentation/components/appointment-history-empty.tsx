import React from "react";
import { Activity } from "lucide-react";

export const AppointmentHistoryEmpty: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Activity className="text-muted-foreground/40" size={40} />
            <h2 className="text-text-2 font-semibold">No hay citas pasadas</h2>
            <p className="text-text-3">Las citas que ya han ocurrido aparecerán aquí</p>
        </div>
    );
};