import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Bug } from "lucide-react";
import { DewormingPlan } from "@/features/pet/domain/entities";

interface DewormingControlSectionProps {
    deworming: DewormingPlan;
    onChange: (deworming: DewormingPlan) => void;
    isReadOnly?: boolean;
}

export const DewormingControlSection: React.FC<DewormingControlSectionProps> = ({
    deworming,
    onChange,
    isReadOnly = false,
}) => {
    const handleInternalToggle = (checked: boolean) => {
        onChange({
            ...deworming,
            internalParasites: checked,
        });
    };

    const handleInternalDateChange = (date: string) => {
        onChange({
            ...deworming,
            lastInternalDewormingDate: date,
        });
    };

    const handleExternalToggle = (checked: boolean) => {
        onChange({
            ...deworming,
            externalParasites: checked,
        });
    };

    const handleExternalDateChange = (date: string) => {
        onChange({
            ...deworming,
            lastExternalDewormingDate: date,
        });
    };

    return (
        <div className="space-y-3 pt-2">
            <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                <Bug className="size-3.5 text-main" />
                Control Antiparasitario
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Endoparásitos */}
                <div className="p-4 rounded-xl border border-border-1 dark:border-border/10 bg-gray-50/50 dark:bg-bg-dark-3/20 space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-text-1 dark:text-white">
                                Endoparásitos (Desparasitación Interna)
                            </p>
                            <p className="text-xs text-text-3 dark:text-muted-foreground">
                                Control de nematodos, cestodos y giardiasis
                            </p>
                        </div>
                        <Switch
                            disabled={isReadOnly}
                            checked={deworming.internalParasites}
                            onCheckedChange={handleInternalToggle}
                        />
                    </div>

                    {deworming.internalParasites && (
                        <div className="pt-2 animate-in fade-in duration-200">
                            <Label className="text-xs text-text-3 dark:text-muted-foreground">
                                Fecha última aplicación interna
                            </Label>
                            <Input
                                type="date"
                                disabled={isReadOnly}
                                value={deworming.lastInternalDewormingDate ? String(deworming.lastInternalDewormingDate) : ""}
                                onChange={(e) => handleInternalDateChange(e.target.value)}
                                className="mt-1 bg-white dark:bg-bg-dark-2 text-xs"
                            />
                        </div>
                    )}
                </div>

                {/* Ectoparásitos */}
                <div className="p-4 rounded-xl border border-border-1 dark:border-border/10 bg-gray-50/50 dark:bg-bg-dark-3/20 space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-text-1 dark:text-white">
                                Ectoparásitos (Desparasitación Externa)
                            </p>
                            <p className="text-xs text-text-3 dark:text-muted-foreground">
                                Pipetas, collares o pastillas para pulgas / garrapatas
                            </p>
                        </div>
                        <Switch
                            disabled={isReadOnly}
                            checked={deworming.externalParasites}
                            onCheckedChange={handleExternalToggle}
                        />
                    </div>

                    {deworming.externalParasites && (
                        <div className="pt-2 animate-in fade-in duration-200">
                            <Label className="text-xs text-text-3 dark:text-muted-foreground">
                                Fecha última aplicación externa
                            </Label>
                            <Input
                                type="date"
                                disabled={isReadOnly}
                                value={deworming.lastExternalDewormingDate ? String(deworming.lastExternalDewormingDate) : ""}
                                onChange={(e) => handleExternalDateChange(e.target.value)}
                                className="mt-1 bg-white dark:bg-bg-dark-2 text-xs"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
