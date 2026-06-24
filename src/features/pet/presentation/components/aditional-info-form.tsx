import { Activity } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { CreatePetFormValues } from "../interfaces";
import { Fragment } from "react";

interface AditionalInfoFormProps {
    register: UseFormRegister<CreatePetFormValues>;
}

export const AditionalInfoForm = ({ register }: AditionalInfoFormProps) => {
    return (
        <Fragment>
            {/* Additional Info */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                    <Activity className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold">Configuración Adicional</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-center space-y-2 pt-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" {...register("isActive")} className="w-4 h-4 rounded border-input text-primary focus:ring-primary" />
                            <span className="text-sm font-medium">Paciente Activo</span>
                        </label>
                        <p className="text-xs text-muted-foreground ml-7">Indica si el paciente se encuentra actualmente recibiendo atención.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}