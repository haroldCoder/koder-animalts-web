import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dog, ArrowLeft, Sparkles, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePetMutationQuery } from "@/features/pet/application/queries";
import { useGetAllClinics } from "@/features/clinics/application/queries";
import { speciesOptions, genderOptions } from "@/features/pet/presentation/constants";
import { useAuth } from "@/common/hooks";
import { PetPhotoPicker } from "./pet-photo-picker";
import { CreatedOwnerInfo } from "./register-user-step";

export interface NewPetFormData {
    name: string;
    species: string;
    breed?: string;
    gender?: string;
    birthdate?: string;
    color?: string;
    weight?: string;
}

export interface RegisterPetStepProps {
    owner: CreatedOwnerInfo;
    onPetCreated: (pet: any) => void;
    onBack: () => void;
}

export const RegisterPetStep: React.FC<RegisterPetStepProps> = ({
    owner,
    onPetCreated,
    onBack,
}) => {
    const { userProfile, clinicId: authClinicId } = useAuth();
    const queryClient = useQueryClient();
    const { data: clinics = [] } = useGetAllClinics();

    const [mainPhoto, setMainPhoto] = useState<File | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<NewPetFormData>({
        defaultValues: {
            name: "",
            species: "Canino",
            breed: "",
            gender: "MALE",
            birthdate: "",
            color: "",
            weight: "",
        },
    });

    const { mutateAsync: createPet, isPending } = usePetMutationQuery();

    const effectiveClinicId =
        authClinicId ||
        userProfile?.clinicId ||
        (clinics.length > 0 ? clinics[0].id : "");

    const handleFormSubmit = async (data: NewPetFormData) => {
        if (!mainPhoto) {
            setPhotoError("Debes seleccionar o capturar la fotografía principal de la mascota");
            return;
        }
        setPhotoError(null);

        try {
            const petPayload = {
                name: data.name,
                species: data.species,
                breed: data.breed || undefined,
                gender: data.gender || undefined,
                birthdate: data.birthdate || undefined,
                color: data.color || undefined,
                weight: data.weight ? Number(data.weight) : undefined,
                isActive: true,
                userId: owner.userId || owner.id,
                clinicId: effectiveClinicId,
                mainImage: mainPhoto,
            };

            const created = await createPet(petPayload);

            // Invalidate queries so that the veterinarian's pets lists refresh automatically
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["pets-clinic"] }),
                queryClient.invalidateQueries({ queryKey: ["pets"] }),
                queryClient.invalidateQueries({ queryKey: ["get-pets-vet"] }),
                queryClient.invalidateQueries({ queryKey: ["search-pets-vet"] }),
            ]);

            toast.success(`Mascota "${data.name}" registrada con éxito`);
            onPetCreated(created);
        } catch (error: any) {
            console.error("Error al registrar mascota:", error);
            const msg = error?.message || "Ocurrió un error al registrar la mascota";
            toast.error(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Header info & Owner summary badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/70">
                <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Dog className="size-4 text-primary" />
                        Paso 2: Datos de la Mascota
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Ingresa los datos esenciales del paciente.
                    </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                    <UserCheck className="size-3.5" />
                    <span>Tutor: {owner.name}</span>
                </div>
            </div>

            {/* Photo Picker (Upload or Camera) */}
            <PetPhotoPicker
                selectedFile={mainPhoto}
                onFileChange={(file) => {
                    setMainPhoto(file);
                    if (file) setPhotoError(null);
                }}
                error={photoError || undefined}
            />

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Nombre */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                        Nombre de la mascota <span className="text-destructive">*</span>
                    </label>
                    <Input
                        placeholder="Ej. Lucas"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("name", {
                            required: "El nombre es requerido",
                        })}
                    />
                    {errors.name && (
                        <span className="text-xs text-destructive">{errors.name.message}</span>
                    )}
                </div>

                {/* Especie */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                        Especie <span className="text-destructive">*</span>
                    </label>
                    <Controller
                        control={control}
                        name="species"
                        rules={{ required: "La especie es requerida" }}
                        render={({ field: { onChange, value } }) => (
                            <Select items={speciesOptions} onValueChange={onChange} value={value} disabled={isPending}>
                                <SelectTrigger className="h-10 text-sm bg-background">
                                    <SelectValue placeholder="Selecciona una especie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {speciesOptions.map((species) => (
                                        <SelectItem key={species.value} value={species.value}>
                                            {species.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.species && (
                        <span className="text-xs text-destructive">{errors.species.message}</span>
                    )}
                </div>

                {/* Raza */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Raza</label>
                    <Input
                        placeholder="Ej. Labrador, Mestizo..."
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("breed")}
                    />
                </div>

                {/* Sexo / Género */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Sexo / Género</label>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <Select items={genderOptions} onValueChange={onChange} value={value} disabled={isPending}>
                                <SelectTrigger className="h-10 text-sm bg-background">
                                    <SelectValue placeholder="Selecciona el sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genderOptions.map((g) => (
                                        <SelectItem key={g.value} value={g.value}>
                                            {g.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* Edad / Fecha de Nacimiento */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Fecha de Nacimiento / Edad</label>
                    <Input
                        type="date"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("birthdate")}
                    />
                </div>

                {/* Peso (kg) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Peso estimado (kg)</label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Ej. 8.5"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("weight")}
                    />
                </div>

                {/* Color */}
                <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground">Color / Pelaje</label>
                    <Input
                        placeholder="Ej. Café con manchas blancas"
                        className="h-10 text-sm bg-background"
                        disabled={isPending}
                        {...register("color")}
                    />
                </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    disabled={isPending}
                    className="gap-1.5 cursor-pointer text-xs"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Volver a Tutor</span>
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
                        <Sparkles className="size-4" />
                    )}
                    <span>{isPending ? "Registrando Mascota..." : "Finalizar y Registrar Mascota"}</span>
                </Button>
            </div>
        </form>
    );
};
