import React from "react";
import { Activity } from "lucide-react";

export const MedicalRecordHistoryEmpty: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Activity className="text-muted-foreground/40" size={40} />
            <h2 className="text-text-2 font-semibold">No hay Historial medico</h2>
            <p className="text-text-3">Tu historial medico aparecerá aquí</p>
        </div>
    );
};