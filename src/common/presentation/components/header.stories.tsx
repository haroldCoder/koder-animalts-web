import type { Meta, StoryObj } from '@storybook/react-vite'
import { makeOwner, makeUserWithoutImage, makeVeterinarian } from '@/stories/mocks'
import { withMainLayout } from '@/stories/decorators'
import { Header } from './header'

/**
 * Encabezado de la app: logo, título de la ruta actual, menú de navegación,
 * avatar y cierre de sesión.
 *
 * Requiere `MainLayoutContext` (usuario con rol) y el router:
 * el título se resuelve buscando `location.pathname` entre las rutas conocidas.
 */
const meta = {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'El título muestra el `label` de la ruta activa y cae a "Dashboard" si no coincide. El botón Logout borra `localStorage.user`, limpia la caché de React Query y navega al login.',
      },
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

/** Veterinario en el dashboard: el saludo antepone "Dr." y usa su foto. */
export const VeterinarianWithPhoto: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  parameters: {
    router: { initialPath: '/home' },
  },
}

/** Dueño sin foto: el avatar cae al fallback con la inicial del nombre. */
export const OwnerWithoutPhoto: Story = {
  decorators: [withMainLayout(makeUserWithoutImage())],
  parameters: {
    router: { initialPath: '/home' },
  },
}

/** Ruta distinta a la raíz: el título sale del `label` de esa ruta. */
export const OnPetsRoute: Story = {
  decorators: [withMainLayout(makeOwner())],
  parameters: {
    router: { initialPath: '/home/pets' },
  },
}

/** Ruta desconocida: el título cae al valor por defecto "Dashboard". */
export const UnknownRoute: Story = {
  decorators: [withMainLayout(makeOwner())],
  parameters: {
    router: { initialPath: '/ruta-que-no-existe' },
  },
}

/** Nombre largo: valida el truncado y que el menú no se desplace. */
export const LongName: Story = {
  decorators: [
    withMainLayout(
      makeOwner({
        name: 'Alejandra María Fernanda Restrepo Villalobos',
        email: 'alejandra.restrepo.villalobos@gmail.com',
      })
    ),
  ],
  parameters: {
    router: { initialPath: '/home' },
  },
}

/** Variante oscura: revisa los tokens `dark:` del header y del menú. */
export const DarkTheme: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  parameters: {
    theme: 'dark',
    router: { initialPath: '/home' },
  },
}
