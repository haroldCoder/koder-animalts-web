import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { AuthScreen } from './auth-screen'

/**
 * Pantalla principal de autenticación: tarjeta flotante con efecto glassmorphism,
 * gradiente de fondo, encabezado ilustrado y pestañas para alternar entre
 * inicio de sesión y registro de nuevo usuario.
 */
const meta = {
  title: 'Features/Auth/AuthScreen',
  component: AuthScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Página completa de auth. Contiene el encabezado con el icono de usuario, la navegación por Tabs (`Iniciar Sesión` y `Registro`), y conmuta dinámicamente entre los componentes `Login` y `SignUp`.',
      },
    },
  },
} satisfies Meta<typeof AuthScreen>

export default meta
type Story = StoryObj<typeof meta>

/** Vista por defecto: pestaña "Iniciar Sesión" seleccionada activando el formulario de Login. */
export const DefaultLoginTab: Story = {}

/**
 * Pestaña "Registro" seleccionada: conmuta hacia el formulario de SignUp
 * con el campo de nombre y la zona de carga de foto de perfil.
 */
export const RegisterTab: Story = {
  play: async ({ canvas }) => {
    const registerTab = canvas.getByRole('tab', { name: /registro/i })
    await userEvent.click(registerTab)

    await expect(
      await canvas.findByPlaceholderText('Nombre completo')
    ).toBeInTheDocument()
  },
}

/**
 * Cambio interactivo entre pestañas: valida la navegación fluida de Login a Registro
 * y de regreso a Login comprobando la presencia de los elementos clave de cada formulario.
 */
export const InteractiveTabSwitching: Story = {
  play: async ({ canvas }) => {
    const registerTab = canvas.getByRole('tab', { name: /registro/i })
    const loginTab = canvas.getByRole('tab', { name: /iniciar sesión/i })

    // Cambiar a Registro
    await userEvent.click(registerTab)
    await expect(
      await canvas.findByPlaceholderText('Nombre completo')
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('button', { name: /crear cuenta/i })
    ).toBeInTheDocument()

    // Regresar a Iniciar Sesión
    await userEvent.click(loginTab)
    await expect(
      await canvas.findByText('¿Olvidaste tu contraseña?')
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument()
  },
}

/**
 * Variante en tema oscuro: valida el fondo gradiente oscuro, la tarjeta translúcida
 * con borde sutil, las pestañas oscuras y la legibilidad de la tipografía.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
}

/**
 * Vista en resolución móvil: verifica el centrado, la adaptación del padding (`p-4 sm:p-8`)
 * y que no existan desbordamientos horizontales en pantallas reducidas.
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
