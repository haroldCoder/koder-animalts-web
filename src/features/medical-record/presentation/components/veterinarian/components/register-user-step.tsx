import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, ArrowRight, FileText, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRegisterOwnerMutation } from "@/features/medical-record/application/queries";

export interface NewOwnerFormData {
    name: string;
    email: string;
    phone: string;
    identification: string;
    address?: string;
}

export interface CreatedOwnerInfo {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

export interface RegisterUserStepProps {
    onUserCreated: (owner: CreatedOwnerInfo) => void;
    onCancel: () => void;
}

export const RegisterUserStep: React.FC<RegisterUserStepProps> = ({
    onUserCreated,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewOwnerFormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            identification: "",
            address: "",
        },
    });

    const { mutateAsync: registerOwner, isPending } = useRegisterOwnerMutation();

    const handleFormSubmit = async (data: NewOwnerFormData) => {
        try {
            const response = await registerOwner({
                name: data.name,
                email: data.email,
                password: data.identification,
                phone: data.phone || undefined,
                address: data.address || undefined,
            });

            toast.success("Tutor registrado correctamente");

            const createdUser = response?.data?.user;
            const resolvedUserId = createdUser?.userId || createdUser?.id || "";
            const resolvedOwnerId = createdUser?.ownerId || createdUser?.id || "";

            onUserCreated({
                id: resolvedOwnerId,
                userId: resolvedUserId,
                name: createdUser?.name || data.name,
                email: createdUser?.email || data.email,
                phone: data.phone,
                address: data.address,
            });
        } catch (error: any) {
            console.error("Error al registrar tutor:", error);
            const msg = error?.message || "Ocurrió un error al registrar el tutor";
            toast.error(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground">Paso 1: Datos del Tutor / Titular</h4>
                <p className="text-xs text-muted-foreground">
                    Primero registra o ingresa los datos de la persona responsable de la mascota.
                </p>
            </div>

            {/* Nombre Completo */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <User className="size-3.5 text-primary" />
                    Nombre completo <span className="text-destructive">*</span>
                </label>
                <Input
                    placeholder="Ej. Juan Pérez"
                    className="h-10 text-sm bg-background"
                    disabled={isPending}
                    {...register("name", {
                        required: "El nombre es requerido",
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    })}
                />
                {errors.name && (
                    <span className="text-xs text-destructive">{errors.name.message}</span>
                )}
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Mail className="size-3.5 text-primary" />
                    Correo electrónico <span className="text-destructive">*</span>
                </label>
                <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="h-10 text-sm bg-background"
                    disabled={isPending}
                    {...register("email", {
                        required: "El correo electrónico es requerido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo electrónico válido",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                )}
            </div>

            {/* Teléfono y Documento / Contraseña en 2 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Teléfono */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Phone className="size-3.5 text-primary" />
                        Teléfono <span className="text-destructive">*</span>
                    </label>
                    <Input
                        type="tel"
                        placeholder="Ej. 3001234567"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("phone", {
                            required: "El teléfono es requerido",
                            pattern: {
                                value: /^[0-9+ -]{7,15}$/,
                                message: "Ingresa un número de teléfono válido",
                            },
                        })}
                    />
                    {errors.phone && (
                        <span className="text-xs text-destructive">{errors.phone.message}</span>
                    )}
                </div>

                {/* Cédula */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <FileText className="size-3.5 text-primary" />
                        Cédula (Contraseña) <span className="text-destructive">*</span>
                    </label>
                    <Input
                        placeholder="Ej. 1020304050"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("identification", {
                            required: "La cédula es requerida (será la contraseña)",
                            minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
                        })}
                    />
                    {errors.identification && (
                        <span className="text-xs text-destructive">{errors.identification.message}</span>
                    )}
                </div>
            </div>

            {/* Aviso de contraseña */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/60 text-xs text-muted-foreground">
                <KeyRound className="size-4 text-primary shrink-0" />
                <span>La cédula ingresada se asignará automáticamente como la contraseña inicial del tutor.</span>
            </div>

            {/* Dirección (Opcional) */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    Dirección de residencia (opcional)
                </label>
                <Input
                    placeholder="Ej. Calle 123 #45-67, Apto 801"
                    className="h-10 text-sm bg-background"
                    disabled={isPending}
                    {...register("address")}
                />
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    disabled={isPending}
                    className="cursor-pointer"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    size="sm"
                    disabled={isPending}
                    className="gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {isPending ? (
                        <Spinner className="size-4" />
                    ) : (
                        <>
                            <span>Continuar a Mascota</span>
                            <ArrowRight className="size-4" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
