import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { PetEntity } from '@/features/pet/domain/entities'
import { CarouselSelectPet } from './carousel-select-pet'
import { makePets } from '@/stories/mocks'

interface CarouselSelectPetDemoProps {
  pets: PetEntity[]
  initialSelectedPet?: string | null
  isLoading?: boolean
  withClearFilters?: boolean
}

/**
 * La selección es controlada por el padre, así que la story mantiene el estado
 * para que al hacer clic en una mascota se vea el resaltado y el botón de limpiar.
 */
const CarouselSelectPetDemo = ({
  pets,
  initialSelectedPet = null,
  isLoading = false,
  withClearFilters = false,
}: CarouselSelectPetDemoProps) => {
  const [selectedPet, setSelectedPet] = useState<string | null>(initialSelectedPet)

  return (
    <div className="w-full max-w-3xl">
      <CarouselSelectPet
        pets={pets}
        selectedPet={selectedPet}
        onSelectPet={(petId) => setSelectedPet(petId === '' ? null : petId)}
        onClearFilters={withClearFilters ? () => setSelectedPet(null) : undefined}
        isLoading={isLoading}
      />
    </div>
  )
}

/**
 * Carrusel de mascotas del dueño, con filtro por mascota seleccionada.
 * Cada ítem muestra la foto real de la mascota con su nombre.
 * Se usa en `Vaccination` y en la vista de documentos.
 */
const meta = {
  title: 'Common/CarouselSelectPet',
  component: CarouselSelectPetDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Con `pets` vacío el componente no renderiza nada (`return null`). Con `onClearFilters` aparece el botón de limpiar filtro; sin él, limpiar equivale a llamar `onSelectPet("")`.',
      },
    },
  },
  argTypes: {
    pets: { control: false },
    initialSelectedPet: { control: 'text' },
    isLoading: { control: 'boolean' },
    withClearFilters: { control: 'boolean' },
  },
} satisfies Meta<typeof CarouselSelectPetDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Varias mascotas y ninguna seleccionada. */
export const SeveralPets: Story = {
  args: {
    pets: makePets(4),
  },
}

/** Una mascota seleccionada: el ítem se resalta. */
export const OneSelected: Story = {
  args: {
    pets: makePets(4),
    initialSelectedPet: 'pet-2',
  },
}

/** Con botón de limpiar filtro visible (mascota seleccionada + `onClearFilters`). */
export const WithClearFilters: Story = {
  args: {
    pets: makePets(4),
    initialSelectedPet: 'pet-3',
    withClearFilters: true,
  },
}

/** Muchas mascotas: el carrusel se desplaza lateralmente. */
export const ManyPets: Story = {
  args: {
    pets: makePets(12),
  },
}

/** Mascotas sin foto: se ve el fallback de iniciales. */
export const PetsWithoutPhoto: Story = {
  args: {
    pets: makePets(4).map((pet) => ({ ...pet, image: undefined })),
  },
}

/** Estado de carga: se pintan bloques grises en lugar de las mascotas. */
export const Loading: Story = {
  args: {
    pets: makePets(5),
    isLoading: true,
  },
}

/** Sin mascotas el componente no renderiza nada; la story muestra el contenedor vacío. */
export const WithoutPets: Story = {
  args: {
    pets: [],
  },
}

/** Variante oscura del carrusel y de los ítems. */
export const DarkTheme: Story = {
  args: {
    pets: makePets(6),
    initialSelectedPet: 'pet-1',
  },
  parameters: {
    theme: 'dark',
  },
}
