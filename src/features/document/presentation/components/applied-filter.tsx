import { X } from "lucide-react";
import { format } from "date-fns";

interface AppliedFilterProps {
    appliedDocumentName: string;
    setAppliedDocumentName: (name: string) => void;
    appliedVeterinarianName: string;
    setAppliedVeterinarianName: (name: string) => void;
    startDate?: Date;
    setStartDate?: (date?: Date) => void;
    endDate?: Date;
    setEndDate?: (date?: Date) => void;
}

export const AppliedFilter = ({
    appliedDocumentName,
    setAppliedDocumentName,
    appliedVeterinarianName,
    setAppliedVeterinarianName,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}: AppliedFilterProps) => {
    return (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <span className="font-semibold">Filtros activos:</span>
            {appliedDocumentName && (
                <span className="flex items-center gap-1 bg-background border px-2 py-0.5 rounded-md">
                    Documento: "{appliedDocumentName}"
                    <X className="h-3 w-3 cursor-pointer hover:text-foreground ml-1" onClick={() => setAppliedDocumentName("")} />
                </span>
            )}
            {appliedVeterinarianName && (
                <span className="flex items-center gap-1 bg-background border px-2 py-0.5 rounded-md">
                    Veterinario: "{appliedVeterinarianName}"
                    <X className="h-3 w-3 cursor-pointer hover:text-foreground ml-1" onClick={() => setAppliedVeterinarianName("")} />
                </span>
            )}
            {(startDate || endDate) && (
                <span className="flex items-center gap-1 bg-background border px-2 py-0.5 rounded-md">
                    Rango: {startDate ? format(startDate, "dd/MM/yyyy") : "Inicio"} - {endDate ? format(endDate, "dd/MM/yyyy") : "Fin"}
                    <X className="h-3 w-3 cursor-pointer hover:text-foreground ml-1" onClick={() => { setStartDate?.(undefined); setEndDate?.(undefined); }} />
                </span>
            )}
        </div>
    )
}
