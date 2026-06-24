import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { usePetMutationQuery } from "../../application/queries";
import { useAuth } from "@/common/hooks";
import { toast } from "sonner";
import { useGetAllClinics } from "@/features/clinics/application/queries";
import { AditionalInfoForm, BackdropMutationPet, GeneralInfoForm, MediaSectionForm } from "../components";
import { CreatePetFormValues } from "../interfaces";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CreatePet = () => {
    const navigate = useNavigate();
    const form = useForm<CreatePetFormValues>({
        defaultValues: {
            isActive: true,
            species: ""
        }
    });

    const { register, handleSubmit } = form;

    const [iaImageMode, setIaImageMode] = useState<"file" | "url">("file");

    const { mutateAsync: createPet, isPending, error: mutationError } = usePetMutationQuery();
    const { user } = useAuth();
    const { data: clinics, isPending: isPendingClinics } = useGetAllClinics();

    useEffect(() => {
        if (mutationError) {
            toast.error(mutationError.message, {
                style: {
                    background: "#000",
                    color: "#CA0A0A"
                }
            });
        }
    }, [mutationError]);

    const onSubmit = async (data: CreatePetFormValues) => {
        try {
            await createPet({
                name: data.name,
                species: data.species,
                breed: data.breed,
                ...(data.gender && { gender: data.gender }),
                birthdate: data.birthdate,
                weight: data.weight ? Number(data.weight) : undefined,
                color: data.color,
                microchip: data.microchip,
                isActive: data.isActive,
                clinicId: data.clinicId || "",
                userId: user!,
                mainImage: data.image?.[0] as File,
                iaImage: data.iaImageFile?.[0] as File,
                images: data.images ? Array.from(data.images) : undefined,
            });
            navigate(-1);
        } catch (e) {
            console.error("Error creating pet:", e);
        }
    };

    const clinicsOptions = useMemo(() => {
        return clinics?.map((clinic) => {
            return { value: clinic.id, label: clinic.name }
        })
    }, [clinics])

    return (
        <div className="relative max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScrollArea className="h-[calc(100dvh-10rem)] w-full px-5">
                {isPending && (
                    <BackdropMutationPet />
                )}

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Añadir Nueva Mascota</h1>
                    <p className="text-muted-foreground">Ingresa los datos del paciente para registrar su expediente completo.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <GeneralInfoForm form={form} clinicsOptions={clinicsOptions ?? []} isPendingClinics={isPendingClinics} />

                    <MediaSectionForm form={form} iaImageMode={iaImageMode} setIaImageMode={setIaImageMode} />

                    <AditionalInfoForm register={register} />

                    {/* Form Actions */}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button className={"cursor-pointer"} variant="outline" type="button" onClick={() => navigate(-1)} disabled={isPending}>
                            Cancelar
                        </Button>
                        <Button className={"cursor-pointer gap-2"} type="submit" disabled={isPending}>
                            {isPending ? <Spinner className="size-4" /> : <Plus className="size-4" />}
                            {isPending ? 'Registrando...' : 'Registrar Mascota'}
                        </Button>
                    </div>
                </form>
            </ScrollArea>
        </div>
    );
};