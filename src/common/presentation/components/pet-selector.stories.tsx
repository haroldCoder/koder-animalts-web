import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { expect, userEvent, within } from 'storybook/test'
import type { PetOption } from './pet-selector'
import { PetSelector } from './pet-selector'
import { makePets } from '@/stories/mocks'

const pets = makePets(4)

const petOptions: PetOption[] = pets.map((pet) => ({
  value: pet.id,
  label: pet.name,
  image: pet.image,
}))

interface PetSelectorDemoProps {
  petsOptions: PetOption[]
  isLoadingPets?: boolean
  initialValue?: string
  showError?: boolean
}

/**
 * `PetSelector` recibe el `control` y los `errors` de react-hook-form, así que
 * la story monta un formulario mínimo para darle un contexto real
 * (`Controller` sobre el campo `petId`).
 */
const PetSelectorDemo = ({
  petsOptions,
  isLoadingPets = false,
  initialValue,
  showError = false,
}: PetSelectorDemoProps) => {
  const { control } = useForm<{ petId: string }>({
    defaultValues: { petId: initialValue ?? '' },
  })

  // El componente solo comprueba si `errors.petId` existe para pintar el mensaje.
  const errors = showError ? { petId: { type: 'required', message: 'Debes seleccionar un paciente' } } : {}

  return (
    <div className="w-80">
      <PetSelector
        control={control}
        errors={errors}
        petsOptions={petsOptions}
        isLoadingPets={isLoadingPets}
      />
    </div>
  )
}

/**
 * Selector de mascota paciente: cada opción muestra la foto real de la mascota
 * con `HoverPetAvatar` (la foto ampliada aparece al pasar el mouse por el ítem).
 * Se usa en agendar cita, crear vacuna y programar registro médico.
 */
const meta = {
  title: 'Common/PetSelector',
  component: PetSelectorDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'El campo se llama `petId` y es obligatorio: el mensaje de error lo pinta el propio componente cuando `errors.petId` existe. Las fotos viven dentro del desplegable, por eso hay una story con `play` que lo abre.',
      },
    },
  },
  argTypes: {
    petsOptions: { control: false },
    isLoadingPets: { control: 'boolean' },
    initialValue: { control: 'text' },
    showError: { control: 'boolean' },
  },
} satisfies Meta<typeof PetSelectorDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Caso habitual: hay mascotas disponibles y ninguna seleccionada. */
export const WithPets: Story = {
  args: {
    petsOptions: petOptions,
  },
}

/**
 * Desplegable abierto con `play`: aquí es donde se ven las fotos de las mascotas.
 * Base UI renderiza el popup en un portal, así que se consulta sobre `document.body`.
 */
export const OpenDropdownWithPhotos: Story = {
  args: {
    petsOptions: petOptions,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox'))

    const options = await within(document.body).findAllByRole('option')
    await expect(options.length).toBeGreaterThan(1)
  },
}

/** Mascota ya seleccionada (por ejemplo al reabrir el formulario). */
export const SelectedPet: Story = {
  args: {
    petsOptions: petOptions,
    initialValue: 'pet-2',
  },
}

/** Mientras se consultan las mascotas del veterinario. */
export const LoadingPets: Story = {
  args: {
    petsOptions: [],
    isLoadingPets: true,
  },
}

/** Sin mascotas: mensaje para el veterinario que aún no tiene pacientes. */
export const WithoutPets: Story = {
  args: {
    petsOptions: [],
  },
}

/** Error de validación tras intentar enviar el formulario sin paciente. */
export const ValidationError: Story = {
  args: {
    petsOptions: petOptions,
    showError: true,
  },
}

/** Mascotas sin foto: se ve el fallback de iniciales dentro de la opción. */
export const PetsWithoutPhoto: Story = {
  args: {
    petsOptions: makePets(3).map((pet) => ({ value: pet.id, label: pet.name })),
  },
}

/** Variante oscura del selector. */
export const DarkTheme: Story = {
  args: {
    petsOptions: petOptions,
    initialValue: 'pet-1',
  },
  parameters: {
    theme: 'dark',
  },
}

/** Lista larga: valida el scroll del desplegable con muchos pacientes. */
export const ManyPets: Story = {
  args: {
    petsOptions: makePets(9).map((pet) => ({
      value: pet.id,
      label: `${pet.name} · ${pet.breed}`,
      image: pet.image,
    })),
  },
}
