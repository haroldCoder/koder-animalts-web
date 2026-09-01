import React, { useMemo } from "react";
import { ListFilter } from "lucide-react";
import { VaccinationStatus } from "../../domain/enums";
import { getStatusLabel } from "../utils";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox";

interface FilterStatusProps {
    value?: VaccinationStatus[];
    onChange?: (statuses: VaccinationStatus[]) => void;
}

const ALL_STATUSES: VaccinationStatus[] = [
    VaccinationStatus.PENDING,
    VaccinationStatus.DONE,
    VaccinationStatus.CANCELLED,
];

/** Dot color per status (small indicator circle) */
const STATUS_DOT: Record<VaccinationStatus, string> = {
    [VaccinationStatus.PENDING]: "bg-gray-400 dark:bg-gray-500",
    [VaccinationStatus.DONE]: "bg-green-500",
    [VaccinationStatus.CANCELLED]: "bg-red-500",
};

export const FilterStatus = ({ value, onChange }: FilterStatusProps) => {
    const anchor = useComboboxAnchor();

    const statusOptions = useMemo(
        () =>
            ALL_STATUSES.map((status) => ({
                value: status,
                dot: STATUS_DOT[status],
                ...getStatusLabel(status),
            })),
        [],
    );

    const handleChange = (selected: string[]) => {
        onChange?.(selected as VaccinationStatus[]);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Label with icon */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground select-none shrink-0">
                <ListFilter className="w-3.5 h-3.5" />
                Estado
            </span>

            <Combobox
                multiple
                autoHighlight
                items={ALL_STATUSES}
                value={value}
                onValueChange={handleChange}
            >
                {/* Trigger: chips container */}
                <ComboboxChips
                    ref={anchor}
                    className="
                        min-w-[9rem] max-w-xs
                        border border-border/60
                        bg-background/60 dark:bg-input/20
                        backdrop-blur-sm
                        shadow-sm
                        hover:border-ring/50
                        transition-colors duration-200
                        rounded-lg
                    "
                >
                    <ComboboxValue>
                        {(values: string[]) => (
                            <React.Fragment>
                                {values.map((val) => {
                                    const option = statusOptions.find((o) => o.value === val);
                                    return (
                                        <ComboboxChip
                                            key={val}
                                            className="
                                                bg-transparent border border-border/50
                                                hover:border-border
                                                px-1.5 gap-1
                                                transition-colors
                                            "
                                        >
                                            {/* Colored dot */}
                                            <span
                                                className={`
                                                    inline-block w-1.5 h-1.5 rounded-full shrink-0
                                                    ${option?.dot ?? "bg-gray-400"}
                                                `}
                                            />
                                            <span className="text-xs font-medium text-foreground/90">
                                                {option?.label ?? val}
                                            </span>
                                        </ComboboxChip>
                                    );
                                })}
                                <ComboboxChipsInput

                                    placeholder={values.length === 0 ? "Filtrar por estado…" : ""}
                                    className="text-xs placeholder:text-muted-foreground/60"
                                />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>

                {/* Dropdown */}
                <ComboboxContent anchor={anchor} className="min-w-[10rem]">
                    <ComboboxEmpty>Sin resultados.</ComboboxEmpty>
                    <ComboboxList>
                        {(item: string) => {
                            const option = statusOptions.find((o) => o.value === item);
                            return (
                                <ComboboxItem
                                    key={item}
                                    value={item}
                                    className="gap-2 py-1.5 px-2 rounded-md"
                                >
                                    {/* Dot indicator */}
                                    <span
                                        className={`
                                            inline-block w-2 h-2 rounded-full shrink-0
                                            ${option?.dot ?? "bg-gray-400"}
                                        `}
                                    />
                                    {/* Badge label */}
                                    <span
                                        className={`
                                            ${option?.color ?? ""}
                                            px-2 py-0.5 rounded-full text-xs font-semibold
                                        `}
                                    >
                                        {option?.label ?? item}
                                    </span>
                                </ComboboxItem>
                            );
                        }}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
};
