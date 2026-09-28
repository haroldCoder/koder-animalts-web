import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from "@/components/ui/combobox";
import React, { useMemo, useRef } from "react";
import { AppointmentRequestStatus } from "@/features/appointment-request/domain";
import { getLabelStatusRequest, getStatusColor, getStatusDot } from "../../constants";

interface FilterStatusProps {
    value: AppointmentRequestStatus[];
    handleChange: (value: AppointmentRequestStatus[]) => void;
}

export const FilterStatus = ({ value, handleChange }: FilterStatusProps) => {
    const ALL_STATUSES = useMemo<AppointmentRequestStatus[]>(
        () => Object.values(AppointmentRequestStatus),
        []
    );
    const anchor = useRef<HTMLDivElement>(null);

    const statusOptions = useMemo(
        () =>
            ALL_STATUSES.map((status) => ({
                value: status,
                label: getLabelStatusRequest(status),
                dot: getStatusDot(status),
                color: getStatusColor(status),
            })),
        [],
    );

    return (
        <Combobox multiple autoHighlight items={ALL_STATUSES} value={value} onValueChange={handleChange}>
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

    )
}