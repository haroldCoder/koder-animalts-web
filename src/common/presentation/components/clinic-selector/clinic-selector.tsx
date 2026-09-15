import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loading } from "../loading";
import { ClinicOption } from "../../interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { ClinicDetail } from "./clinic-detail";

interface ClinicSelectorProps {
    clinicsOptions: ClinicOption[];
    onChange: (value: string | null) => void;
    isPendingClinics: boolean;
    value?: string;
}

export const ClinicSelector = ({
    clinicsOptions,
    onChange,
    isPendingClinics,
    value,
}: ClinicSelectorProps) => {
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

    return (
        <Select items={clinicsOptions} onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Selecciona una clínica" />
            </SelectTrigger>
            <SelectContent>
                {isPendingClinics ? (
                    <div className="flex items-center justify-center p-4">
                        <Loading className="scale-75" />
                        <span className="ml-2 text-sm text-muted-foreground">Cargando clínicas...</span>
                    </div>
                ) : !clinicsOptions || clinicsOptions.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No hay clínicas disponibles
                    </div>
                ) : (
                    clinicsOptions.map((clinic) => (
                        <SelectItem
                            key={clinic.value}
                            value={clinic.value}
                            className="group w-full cursor-pointer"
                        >

                            <Popover
                                open={openPopoverId === clinic.value}
                                onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? clinic.value : null)}
                            >

                                <PopoverTrigger
                                    onMouseEnter={() => setOpenPopoverId(clinic.value)}
                                    onMouseLeave={() => setOpenPopoverId(null)}
                                    className="flex items-center justify-between w-full select-none outline-none border-0 p-0 bg-transparent text-inherit text-left cursor-pointer"
                                >
                                    <span className="truncate flex-1">{clinic.label}</span>
                                    <Info className="size-3.5 text-muted-foreground/60 ml-2 shrink-0 group-hover:text-primary transition-colors" />
                                </PopoverTrigger>
                                <PopoverContent
                                    side="right"
                                    align="start"
                                    sideOffset={8}
                                    className="w-72 p-0 border border-border shadow-xl rounded-xl bg-popover z-50 animate-in fade-in zoom-in-95 duration-100"
                                    onMouseEnter={() => setOpenPopoverId(clinic.value)}
                                    onMouseLeave={() => setOpenPopoverId(null)}
                                >
                                    <ClinicDetail clinic={clinic} />
                                </PopoverContent>
                            </Popover>
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};
