import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { VaccineItemCard } from "./vaccine-item-card";

export interface VaccineLabelItem<TKey extends string = string> {
    key: TKey;
    label: string;
    desc: string;
}

interface VaccineChecklistGridProps<TKey extends string> {
    title: string;
    items: VaccineLabelItem<TKey>[];
    values: Partial<Record<TKey, boolean>>;
    onToggle: (key: TKey) => void;
    isReadOnly?: boolean;
}

export const VaccineChecklistGrid = <TKey extends string>({
    title,
    items,
    values,
    onToggle,
    isReadOnly = false,
}: VaccineChecklistGridProps<TKey>) => {
    const activeCount = Object.values(values).filter(Boolean).length;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                    <ShieldCheck className="size-3.5 text-main" />
                    {title}
                </Label>
                <span className="text-xs text-text-3">
                    {activeCount} de {items.length} aplicadas
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.map((item) => (
                    <VaccineItemCard
                        key={item.key}
                        label={item.label}
                        description={item.desc}
                        isChecked={Boolean(values[item.key])}
                        onToggle={() => onToggle(item.key)}
                        isReadOnly={isReadOnly}
                    />
                ))}
            </div>
        </div>
    );
};
