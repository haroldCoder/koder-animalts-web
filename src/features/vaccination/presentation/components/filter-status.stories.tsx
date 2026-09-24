import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { FilterStatus } from './filter-status'
import { VaccinationStatus } from '../../domain/enums'
import { useState } from 'react'

/**
 * Selector múltiple con chips para filtrar el listado de vacunas según su estado:
 * `PENDING` (Pendiente), `DONE` (Aplicada) y `CANCELLED` (Cancelada).
 * Integra indicador de color tipo dot para cada estado y soporte para teclado y búsqueda.
 */
const meta = {
  title: 'Features/Vaccination/FilterStatus',
  component: FilterStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza los primitivos `Combobox`, `ComboboxChips` y `ComboboxChip` para permitir selecciones múltiples de estados de vacunación con badges coloreados.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 flex justify-center items-center min-w-[320px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: 'check',
      options: [
        VaccinationStatus.PENDING,
        VaccinationStatus.DONE,
        VaccinationStatus.CANCELLED,
      ],
      description: 'Estados de vacunación actualmente seleccionados',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof FilterStatus>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado por defecto: sin ningún estado seleccionado, muestra el placeholder.
 */
export const Default: Story = {
  args: {
    value: [],
  },
}

/**
 * Con un estado preseleccionado (Pendiente).
 */
export const WithSingleStatus: Story = {
  args: {
    value: [VaccinationStatus.PENDING],
  },
}

/**
 * Con múltiples estados activos (Pendiente y Aplicada).
 */
export const WithMultipleStatuses: Story = {
  args: {
    value: [VaccinationStatus.PENDING, VaccinationStatus.DONE],
  },
}

/**
 * Todos los estados seleccionados simultáneamente.
 */
export const AllStatusesSelected: Story = {
  args: {
    value: [
      VaccinationStatus.PENDING,
      VaccinationStatus.DONE,
      VaccinationStatus.CANCELLED,
    ],
  },
}

/**
 * Componente interactivo controlado: mantiene el estado local al seleccionar o remover chips.
 */
export const ControlledInteractive: Story = {
  render: (args) => {
    const InteractiveWrapper = () => {
      const [selected, setSelected] = useState<VaccinationStatus[]>([
        VaccinationStatus.PENDING,
      ])
      return (
        <FilterStatus
          {...args}
          value={selected}
          onChange={(newVal) => {
            setSelected(newVal)
            args.onChange?.(newVal)
          }}
        />
      )
    }
    return <InteractiveWrapper />
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText(/filtrar por estado…/i)
    await expect(input).toBeInTheDocument()
    await userEvent.click(input)
  },
}

/**
 * Variante en tema oscuro.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  args: {
    value: [VaccinationStatus.PENDING, VaccinationStatus.DONE],
  },
}
