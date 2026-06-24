import { Input } from '@/components/ui/input'
import { Dog } from 'lucide-react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { genderOptions, speciesOptions } from '../constants'
import { Loading } from '@/common/presentation/components'
import { UseFormReturn } from 'react-hook-form'
import { CreatePetFormValues } from '../interfaces'

interface GeneralInfoFormProps {
  form: UseFormReturn<CreatePetFormValues>
  clinicsOptions: { value: string, label: string }[]
  isPendingClinics: boolean
}

export const GeneralInfoForm = ({ form, clinicsOptions, isPendingClinics }: GeneralInfoFormProps) => {
  const { control, register, formState: { errors } } = form;

  return (
    < Fragment >
      {/* General Information */}

      < div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6" >
        <div className="flex items-center gap-2 border-b border-border/50 pb-4">
          <Dog className="size-5 text-primary" />
          <h2 className="text-xl font-semibold">Información General</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre de la Mascota *</label>
            <Input placeholder="Ej. Firulais" {...register("name", { required: true })} />
            {errors.name && <span className="text-xs text-destructive">Este campo es requerido</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Especie *</label>
            <Controller
              control={control}
              name="species"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select items={speciesOptions} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una especie" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      speciesOptions.map((species) => (
                        <SelectItem key={species.value} value={species.value}>
                          {species.label}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              )}
            />
            {errors.species && <span className="text-xs text-destructive">Este campo es requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Clinica *</label>
            <Controller
              control={control}
              name="clinicId"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select items={clinicsOptions} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una clínica" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      isPendingClinics ?
                        <Loading />
                        :
                        clinicsOptions?.map((clinic) => (
                          <SelectItem key={clinic.value} value={clinic.value}>
                            {clinic.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.clinicId && <span className="text-xs text-destructive">Este campo es requerido</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Raza</label>
            <Input placeholder="Ej. Golden Retriever" {...register("breed")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Género</label>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange } }) => (
                <Select items={genderOptions} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el género" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      genderOptions.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha de Nacimiento</label>
            <Input type="date" {...register("birthdate")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Peso (kg)</label>
            <Input type="number" step="0.01" placeholder="Ej. 12.5" {...register("weight")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <Input placeholder="Ej. Dorado" {...register("color")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Microchip</label>
            <Input placeholder="Número de microchip" {...register("microchip")} />
          </div>
        </div>
      </div >
    </Fragment >
  )
}
