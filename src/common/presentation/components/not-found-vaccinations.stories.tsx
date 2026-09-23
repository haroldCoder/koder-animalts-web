import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { NotFoundVaccinations } from './not-found-vaccinations'

/**
 * Estado vacío de la tabla de vacunas. La página le pasa el botón de creación
 * como función (`createVaccinationDialog`), por eso el prop es una función que
 * devuelve JSX y no un nodo.
 */
const meta = {
  title: 'Common/NotFoundVaccinations',
  component: NotFoundVaccinations,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Ocupa todo el alto del contenedor (`h-full`), así que en la app se monta dentro de un área con altura definida. El `description` lo define quien lo usa según el rol.',
      },
    },
  },
  argTypes: {
    description: { control: 'text' },
    createVaccinationDialog: { control: false },
  },
} satisfies Meta<typeof NotFoundVaccinations>

export default meta
type Story = StoryObj<typeof meta>

/** Con acción de creación: botón que abre el diálogo de nueva vacuna. */
export const WithCreateAction: Story = {
  args: {
    description: 'Registra la primera vacuna para llevar el control del esquema de vacunación.',
    createVaccinationDialog: () => <Button>Aplicar vacuna</Button>,
  },
}

/** Sin acción: el dueño no puede registrar vacunas, solo consultarlas. */
export const WithoutAction: Story = {
  args: {
    description: 'Cuando el veterinario registre una vacuna aparecerá aquí.',
  },
}

/** Sin `description`: se renderiza el párrafo vacío y solo quedan icono y título. */
export const WithoutDescription: Story = {
  args: {
    createVaccinationDialog: () => <Button variant="outline">Aplicar vacuna</Button>,
  },
}

/** Variante oscura del estado vacío. */
export const DarkTheme: Story = {
  args: {
    description: 'Registra la primera vacuna para llevar el control del esquema.',
    createVaccinationDialog: () => <Button>Aplicar vacuna</Button>,
  },
  parameters: {
    theme: 'dark',
  },
}
