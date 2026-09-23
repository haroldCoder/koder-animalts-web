import type { Meta, StoryObj } from '@storybook/react-vite'
import { makeOwner, makeVeterinarian } from '@/stories/mocks'
import { withMainLayout } from '@/stories/decorators'
import { NavMenu } from './nav-menu'

/**
 * Navegación principal. Los enlaces dependen del rol y el ítem activo se
 * calcula con `location.pathname.endsWith(link.path)`.
 *
 * En pantallas pequeñas el menú queda fijo abajo; desde `lg` se muestra en línea
 * dentro del header.
 */
const meta = {
  title: 'Common/NavMenu',
  component: NavMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'OWNER: Dashboard, Documentos, Mascotas, Próximas citas. VETERINARIAN: Dashboard, Eventos médicos, Programar cita, Documentos, Historial médico, Vacunas.',
      },
    },
  },
} satisfies Meta<typeof NavMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Menú del dueño de mascota: 4 enlaces. */
export const OwnerLinks: Story = {
  decorators: [withMainLayout(makeOwner())],
  parameters: {
    router: { initialPath: '/home' },
  },
}

/** Menú del veterinario: 6 enlaces, incluye programar cita e historial médico. */
export const VeterinarianLinks: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  parameters: {
    router: { initialPath: '/home' },
  },
}

/** Ítem activo: la ruta inicial coincide con el enlace de vacunas. */
export const ActiveItemOnVaccinations: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  parameters: {
    router: { initialPath: '/home/vaccinations' },
  },
}

/** Ítem activo en una ruta del dueño. */
export const ActiveItemOnPets: Story = {
  decorators: [withMainLayout(makeOwner())],
  parameters: {
    router: { initialPath: '/home/pets' },
  },
}

/** Variante oscura del ítem activo (usa clases `dark:`). */
export const DarkTheme: Story = {
  decorators: [withMainLayout(makeOwner())],
  parameters: {
    theme: 'dark',
    router: { initialPath: '/home/documents' },
  },
}
