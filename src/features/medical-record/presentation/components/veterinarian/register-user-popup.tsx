import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, UserPlus, FileText, KeyRound } from "lucide-react";
import { Popup } from "@/common/presentation/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRegisterOwnerMutation } from "@/features/medical-record/application/queries";
import { UserAuthProfile } from "@/features/auth/domain/entities";

export interface NewUserFormData {
    name: string;
    email: string;
    phone: string;
    identification: string;
    address?: string;
}

export interface RegisterUserPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: UserAuthProfile | NewUserFormData) => void;
}

export const RegisterUserPopup: React.FC<RegisterUserPopupProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewUserFormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            identification: "",
            address: "",
        },
    });

    const { mutateAsync: registerOwner, isPending } = useRegisterOwnerMutation();

    const handleFormSubmit = async (data: NewUserFormData) => {
        try {
            const response = await registerOwner({
                name: data.name,
                email: data.email,
                password: data.identification,
                phone: data.phone || undefined,
                address: data.address || undefined,
            });

            toast.success("Tutor registrado exitosamente");
            onSuccess?.(response?.data?.user || data);
            reset();
            onClose();
        } catch (error: any) {
            console.error("Error al registrar tutor:", error);
            const msg = error?.message || "Ocurrió un error al registrar el tutor";
            toast.error(msg);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Popup
            isOpen={isOpen}
            onClose={handleClose}
            title="Registrar Nuevo Tutor"
            className="max-w-lg"
        >
            <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                    Ingresa los datos del tutor o titular para vincularlo a la nueva mascota que registrarás.
                </p>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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

                    {/* Teléfono y Documento / Contraseña */}
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

                        {/* Cédula (Contraseña inicial) */}
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

                    {/* Indicador sobre la contraseña */}
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
                            onClick={handleClose}
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
                                <UserPlus className="size-4" />
                            )}
                            <span>{isPending ? "Registrando..." : "Registrar Tutor"}</span>
                        </Button>
                    </div>
                </form>
            </div>
        </Popup>
    );
};
