import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { ClinicOption } from '@/common/presentation/interfaces'
import { ClinicSelector } from './clinic-selector'
import { makeClinicOptions } from '@/stories/mocks'

interface ClinicSelectorDemoProps {
  clinicsOptions: ClinicOption[]
  isPendingClinics?: boolean
  initialValue?: string
}

/** El valor vive en el componente que lo usa, así que la story lo mantiene con estado. */
const ClinicSelectorDemo = ({
  clinicsOptions,
  isPendingClinics = false,
  initialValue,
}: ClinicSelectorDemoProps) => {
  const [value, setValue] = useState<string | null>(initialValue ?? null)

  return (
    <div className="w-80">
      <ClinicSelector
        clinicsOptions={clinicsOptions}
        onChange={setValue}
        isPendingClinics={isPendingClinics}
        value={value ?? undefined}
      />
    </div>
  )
}

/**
 * Selector de clínica para crear/editar mascota. Cada opción tiene un icono de
 * información que abre el popover `ClinicDetail` al pasar el mouse.
 */
const meta = {
  title: 'Common/ClinicSelector',
  component: ClinicSelectorDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dentro del desplegable cubre tres estados: cargando clínicas, sin clínicas disponibles y listado con detalle en popover.',
      },
    },
  },
  argTypes: {
    clinicsOptions: { control: false },
    isPendingClinics: { control: 'boolean' },
    initialValue: { control: 'text' },
  },
} satisfies Meta<typeof ClinicSelectorDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Caso habitual: clínicas cargadas y ninguna seleccionada. */
export const WithClinics: Story = {
  args: {
    clinicsOptions: makeClinicOptions(3),
  },
}

/** Clínica ya seleccionada (edición de mascota existente). */
export const SelectedClinic: Story = {
  args: {
    clinicsOptions: makeClinicOptions(3),
    initialValue: 'clinic-2',
  },
}

/** Mientras se consultan las clínicas: spinner dentro del desplegable. */
export const LoadingClinics: Story = {
  args: {
    clinicsOptions: [],
    isPendingClinics: true,
  },
}

/** Sin clínicas registradas: mensaje "No hay clínicas disponibles". */
export const WithoutClinics: Story = {
  args: {
    clinicsOptions: [],
  },
}

/** Variante oscura del select y del popover de detalle. */
export const DarkTheme: Story = {
  args: {
    clinicsOptions: makeClinicOptions(3),
    initialValue: 'clinic-1',
  },
  parameters: {
    theme: 'dark',
  },
}
