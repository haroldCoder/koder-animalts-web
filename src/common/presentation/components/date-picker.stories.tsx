import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DatePicker } from './date-picker'

interface DatePickerDemoProps {
  initialStart?: Date
  initialEnd?: Date
  disabledStart?: boolean
  disabledEnd?: boolean
}

/** Fechas controladas por el componente padre: la story mantiene ambos extremos. */
const DatePickerDemo = ({
  initialStart,
  initialEnd,
  disabledStart = false,
  disabledEnd = false,
}: DatePickerDemoProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(initialStart)
  const [endDate, setEndDate] = useState<Date | undefined>(initialEnd)

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      disabledStart={disabledStart}
      disabledEnd={disabledEnd}
    />
  )
}

/**
 * Rango de fechas para filtrar historial (citas, historial médico, documentos).
 * Son dos popovers independientes con el calendario en español.
 */
const meta = {
  title: 'Common/DatePicker',
  component: DatePickerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Cuando una fecha está definida, el disparador cambia de color y muestra la fecha en formato dd/MM/yyyy; si está vacío muestra "Fecha inicio" / "Fecha final".',
      },
    },
  },
  argTypes: {
    initialStart: { control: 'date' },
    initialEnd: { control: 'date' },
    disabledStart: { control: 'boolean' },
    disabledEnd: { control: 'boolean' },
  },
} satisfies Meta<typeof DatePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Sin fechas: ambos disparadores en estado placeholder. */
export const Empty: Story = {}

/** Rango completo: las dos fechas se muestran resaltadas. */
export const WithRange: Story = {
  args: {
    initialStart: new Date('2026-09-01'),
    initialEnd: new Date('2026-09-23'),
  },
}

/** Solo fecha inicial, como queda el filtro a medio llenar. */
export const OnlyStartDate: Story = {
  args: {
    initialStart: new Date('2026-09-01'),
  },
}

/** Fecha final sin inicio. */
export const OnlyEndDate: Story = {
  args: {
    initialEnd: new Date('2026-09-23'),
  },
}

/**
 * `disabledStart` / `disabledEnd` deshabilitan el calendario completo
 * (así evita el filtro de documentos que una fecha sea futura).
 */
export const BothDisabled: Story = {
  args: {
    initialStart: new Date('2026-09-01'),
    initialEnd: new Date('2026-09-23'),
    disabledStart: true,
    disabledEnd: true,
  },
}

/** Fechas en el mismo día: rango de un solo día (filtros de "hoy"). */
export const SameDay: Story = {
  args: {
    initialStart: new Date('2026-09-23'),
    initialEnd: new Date('2026-09-23'),
  },
}

/** Variante oscura de los disparadores y del calendario. */
export const DarkTheme: Story = {
  args: {
    initialStart: new Date('2026-09-01'),
  },
  parameters: {
    theme: 'dark',
  },
}
