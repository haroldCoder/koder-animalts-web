import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Syringe } from "lucide-react"
import { useGetMedicalRecordsByUserId } from "@/features/medical-record/application/queries"
import { useAuth } from "@/common/hooks"
import { useGetPetsByVeterinaryUserId } from "@/features/pet/application/queries"
import { Loading, PetSelector } from "@/common/presentation/components"
import { useMemo } from "react"
import { useCreateVaccinationForm } from "../hooks"
import { returnNameConsultationType } from "@/common/presentation/utils"
import { useRegisterVaccination } from "../../application/mutations"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MedicalRecordDetail } from "./medical-record-detail"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { CreateVaccinationEntity } from "../../domain/entities"

export function CreateVaccinationDialog() {
  const { user } = useAuth();
  const { data: pets, isLoading: isLoadingPets } = useGetPetsByVeterinaryUserId(user!);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const { register, handleSubmit, control, errors, watch, form } = useCreateVaccinationForm();
  const selectedPet = watch("petId");
  const { mutate, isPending } = useRegisterVaccination();

  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = (data: CreateVaccinationEntity) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setOpenDialog(false);
      }
    });
  };

  const { data: medicalRecords, isLoading: isLoadingMedicalRecords } = useGetMedicalRecordsByUserId(user!, { petId: selectedPet });

  const petOptions = useMemo(() => {
    if (!pets) return [];
    return pets.map((pet) => ({
      value: pet.id,
      label: pet.name,
      image: pet.image,
    }));
  }, [pets]);

  const medicalRecordsOptions = useMemo(() => {
    if (!medicalRecords) return [];
    return medicalRecords.map((medicalRecord) => ({
      value: medicalRecord.id,
      label: `${returnNameConsultationType(medicalRecord.type)} - ${medicalRecord.petName} - ${medicalRecord.date.toLocaleString()}`,
      entity: medicalRecord,
    }));
  }, [medicalRecords]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button className="bg-main hover:bg-main-hover text-white transition-all hover:scale-105 shadow-md hover:shadow-lg py-5 px-6 font-semibold flex items-center gap-2 rounded-xl">
          <Syringe className="w-5 h-5" />
          Agregar Vacuna
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Vacuna</DialogTitle>
          <DialogDescription>
            Ingresa los detalles de la vacunación. Asegúrate de vincularla al expediente médico correspondiente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="vaccineName" className="text-sm font-medium">
                Nombre de la Vacuna <span className="text-red-500">*</span>
              </label>
              <Input id="vaccineName" placeholder="Ej. Rabia, Parvovirus..." {...register("vaccineName", { required: true })} />
            </div>

            <div className="flex flex-col gap-2">
              <PetSelector control={control} petsOptions={petOptions} errors={errors} isLoadingPets={isLoadingPets} />
            </div>

            <div className="flex flex-col gap-2 w-full overflow-hidden">
              <label htmlFor="medicalRecord" className="text-sm font-medium">
                Expediente Médico <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="medicalRecordId"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    disabled={!selectedPet}
                    items={medicalRecordsOptions}
                    value={value}
                    onValueChange={onChange}
                  >
                    <SelectTrigger className="w-full max-w-full overflow-hidden">
                      <span className="truncate flex-1 text-left">
                        <SelectValue placeholder="Selecciona una cita o expediente" />
                      </span>
                    </SelectTrigger>
                    <SelectContent >
                      {
                        isLoadingMedicalRecords && (
                          <SelectItem><Loading /></SelectItem>
                        )
                      }
                      {medicalRecords?.length === 0 && (
                        <SelectItem>No hay expedientes médicos</SelectItem>
                      )}
                      {medicalRecordsOptions?.map((medicalRecord) => (
                        <SelectItem className={"hover:!bg-main hover:!text-white w-full"} key={medicalRecord.value} value={medicalRecord.value}>
                          <Popover open={openPopoverId === medicalRecord.value} onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? medicalRecord.value : null)}>
                            <PopoverTrigger
                              onMouseEnter={() => setOpenPopoverId(medicalRecord.value)}
                              onMouseLeave={() => setOpenPopoverId(null)}
                              className="cursor-pointer focus:outline-none rounded-full flex shrink-0 select-none outline-none border-0 p-0 bg-transparent"
                            >{medicalRecord.label}</PopoverTrigger>
                            <PopoverContent
                              side="right"
                              align="center"
                            >
                              <MedicalRecordDetail medicalRecord={medicalRecord.entity} />
                            </PopoverContent>
                          </Popover>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="dateAdministered" className="text-sm font-medium">
                  Fecha de Aplicación
                </label>
                <Input id="dateAdministered" type="date" {...register("dateAdministered", { required: true })} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nextDueDate" className="text-sm font-medium">
                  Próxima Dosis
                </label>
                <Input id="nextDueDate" type="date" {...register("nextDueDate")} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lotNumber" className="text-sm font-medium">
                Número de Lote (Opcional)
              </label>
              <Input id="lotNumber" placeholder="Lote de la vacuna" {...register("lotNumber")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="mr-2 hidden sm:inline-flex">Cancelar</Button>
            <Button type="submit" disabled={isPending} className="bg-main hover:bg-main-hover text-white">
              {isPending ? <Loading /> : "Registrar Vacuna"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
