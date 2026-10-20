import React from "react";
import { PetEntity } from "@/features/pet/domain/entities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Utensils,
    Home,
    AlertTriangle,
    Scissors,
    HeartPulse
} from "lucide-react";

export interface PetMedicalReviewFormData {
    provenance: string;
    diet: string;
    isNeutered: boolean;
    neuteredDate: string;
    previousIllnesses: string;
    hasAllergies: boolean;
    allergiesDescription: string;
}

interface PetMedicalReviewCardProps {
    pet: PetEntity;
    data: PetMedicalReviewFormData;
    onChange: (fields: Partial<PetMedicalReviewFormData>) => void;
    isReadOnly?: boolean;
}

export const PetMedicalReviewCard: React.FC<PetMedicalReviewCardProps> = ({
    pet,
    data,
    onChange,
    isReadOnly = false,
}) => {
    return (
        <div className="bg-white dark:bg-bg-dark-2 rounded-2xl border border-border-1 dark:border-border/10 p-6 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-1 dark:border-border/10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-main/10 text-main">
                        <Activity className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-1 dark:text-white">
                            Reseña y Antecedentes Médicos
                        </h3>
                        <p className="text-xs text-text-3 dark:text-muted-foreground">
                            Información basal y patológica del paciente ({pet.name})
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">
                        {pet.species || "Especie no def."}
                    </Badge>
                    {pet.breed && (
                        <Badge variant="outline" className="text-xs">
                            {pet.breed}
                        </Badge>
                    )}
                    {pet.gender && (
                        <Badge variant="outline" className="text-xs">
                            {pet.gender === "MALE" || pet.gender === "Macho" ? "Macho" : "Hembra"}
                        </Badge>
                    )}
                    {pet.weight && (
                        <Badge variant="outline" className="text-xs">
                            {pet.weight} kg
                        </Badge>
                    )}
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Procedencia */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                        <Home className="size-3.5 text-main" />
                        Procedencia
                    </Label>
                    <Input
                        disabled={isReadOnly}
                        value={data.provenance}
                        onChange={(e) => onChange({ provenance: e.target.value })}
                        placeholder="Ej. Criadero, Rescate, Adopción, Hogar de paso..."
                        className="bg-bg-1/30 dark:bg-bg-dark-3/30"
                    />
                </div>

                {/* Alimentación */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                        <Utensils className="size-3.5 text-main" />
                        Alimentación
                    </Label>
                    <Input
                        disabled={isReadOnly}
                        value={data.diet}
                        onChange={(e) => onChange({ diet: e.target.value })}
                        placeholder="Ej. Concentrado Premium, Dieta BARF, Casera..."
                        className="bg-bg-1/30 dark:bg-bg-dark-3/30"
                    />
                </div>
            </div>

            {/* Switches: Castrado y Alergias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Castrado / Esterilizado */}
                <div className="p-4 rounded-xl border border-border-1 dark:border-border/10 bg-gray-50/50 dark:bg-bg-dark-3/20 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <Scissors className="size-4 text-main" />
                            <div>
                                <p className="text-sm font-semibold text-text-1 dark:text-white">
                                    Castrado / Esterilizado
                                </p>
                                <p className="text-xs text-text-3 dark:text-muted-foreground">
                                    ¿Ha sido sometido a castración quirúrgica?
                                </p>
                            </div>
                        </div>
                        <Switch
                            disabled={isReadOnly}
                            checked={data.isNeutered}
                            onCheckedChange={(checked) => onChange({ isNeutered: checked })}
                        />
                    </div>

                    {data.isNeutered && (
                        <div className="pt-2">
                            <Label className="text-xs text-text-3 dark:text-muted-foreground">
                                Fecha de esterilización (opcional)
                            </Label>
                            <Input
                                type="date"
                                disabled={isReadOnly}
                                value={data.neuteredDate}
                                onChange={(e) => onChange({ neuteredDate: e.target.value })}
                                className="mt-1 bg-white dark:bg-bg-dark-2 text-xs"
                            />
                        </div>
                    )}
                </div>

                {/* Alergias */}
                <div className="p-4 rounded-xl border border-border-1 dark:border-border/10 bg-gray-50/50 dark:bg-bg-dark-3/20 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <AlertTriangle className={`size-4 ${data.hasAllergies ? "text-amber-500" : "text-text-3"}`} />
                            <div>
                                <p className="text-sm font-semibold text-text-1 dark:text-white">
                                    Alergias Conocidas
                                </p>
                                <p className="text-xs text-text-3 dark:text-muted-foreground">
                                    Reacciones adversas a fármacos o alimentos
                                </p>
                            </div>
                        </div>
                        <Switch
                            disabled={isReadOnly}
                            checked={data.hasAllergies}
                            onCheckedChange={(checked) => onChange({ hasAllergies: checked })}
                        />
                    </div>

                    {data.hasAllergies && (
                        <div className="pt-2 animate-in fade-in duration-300">
                            <Label className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                Detalle de alergias
                            </Label>
                            <Input
                                disabled={isReadOnly}
                                value={data.allergiesDescription}
                                onChange={(e) => onChange({ allergiesDescription: e.target.value })}
                                placeholder="Ej. Penicilina, pollo, picadura de pulga..."
                                className="mt-1 bg-white dark:bg-bg-dark-2 text-xs border-amber-300 dark:border-amber-700/50 focus-visible:ring-amber-400"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Enfermedades Anteriores */}
            <div className="space-y-2 pt-2">
                <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                    <HeartPulse className="size-3.5 text-main" />
                    Enfermedades Anteriores / Patologías Previas
                </Label>
                <Textarea
                    disabled={isReadOnly}
                    value={data.previousIllnesses}
                    onChange={(e) => onChange({ previousIllnesses: e.target.value })}
                    placeholder="Registra antecedentes patológicos relevantes, cirugías, traumatismos o tratamientos crónicos previos..."
                    rows={3}
                    className="bg-bg-1/30 dark:bg-bg-dark-3/30 resize-none text-sm"
                />
            </div>
        </div>
    );
};
