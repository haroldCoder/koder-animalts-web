import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Login } from './login'
import { withMockAuth } from '@/stories/decorators'

/**
 * Formulario de inicio de sesión: correo, contraseña, enlace para recuperar acceso
 * y botón de submit con estados de carga y manejo de errores de validación y de red.
 */
const meta = {
  title: 'Features/Auth/Login',
  component: Login,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Gestiona el inicio de sesión con React Hook Form y React Query (`useLoginUser`). Valida campos obligatorios y formato de correo antes de despachar la mutación.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[420px] mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

/** Estado inicial limpio: campos vacíos listos para captura de datos. */
export const Default: Story = {}

/** Formulario completado con credenciales válidas antes de enviar. */
export const FilledForm: Story = {
  play: async ({ canvas }) => {
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')

    await userEvent.type(emailInput, 'carlos.mendoza@koderanimalts.com')
    await userEvent.type(passwordInput, 'Segura123!')

    await expect(emailInput).toHaveValue('carlos.mendoza@koderanimalts.com')
    await expect(passwordInput).toHaveValue('Segura123!')
  },
}

/**
 * Errores de validación requeridos: disparados al intentar enviar con campos en blanco.
 */
export const ValidationErrors: Story = {
  play: async ({ canvas }) => {
    const submitButton = canvas.getByRole('button', { name: /iniciar sesión/i })
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('El correo electrónico es requerido')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('La contraseña es requerida')
    ).toBeInTheDocument()
  },
}

/**
 * Validación de formato de correo y longitud mínima de contraseña.
 */
export const InvalidEmailAndShortPassword: Story = {
  play: async ({ canvas }) => {
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const submitButton = canvas.getByRole('button', { name: /iniciar sesión/i })

    await userEvent.type(emailInput, 'correo-invalido-sin-dominio')
    await userEvent.type(passwordInput, '123')
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('Dirección de correo electrónico inválida')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('La contraseña debe tener al menos 6 caracteres')
    ).toBeInTheDocument()
  },
}

/**
 * Error de servidor (401 Unauthorized): credenciales incorrectas.
 * Muestra el contenedor de alerta rojo con el mensaje retornado por el API.
 */
export const ServerError: Story = {
  decorators: [
    withMockAuth({
      mode: 'error',
      statusCode: 401,
      message: 'Credenciales inválidas. Verifica tu correo y contraseña.',
    }),
  ],
  play: async ({ canvas }) => {
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const submitButton = canvas.getByRole('button', { name: /iniciar sesión/i })

    await userEvent.type(emailInput, 'usuario@koderanimalts.com')
    await userEvent.type(passwordInput, 'password-erroneo')
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText(
        'Credenciales inválidas. Verifica tu correo y contraseña.'
      )
    ).toBeInTheDocument()
  },
}

/**
 * Estado de carga / enviando datos: el botón muestra el spinner y se deshabilita.
 */
export const LoadingState: Story = {
  decorators: [
    withMockAuth({
      mode: 'pending',
    }),
  ],
  play: async ({ canvas }) => {
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const submitButton = canvas.getByRole('button', { name: /iniciar sesión/i })

    await userEvent.type(emailInput, 'veterinario@koderanimalts.com')
    await userEvent.type(passwordInput, 'Contraseña123')
    await userEvent.click(submitButton)

    await expect(submitButton).toBeDisabled()
  },
}

/**
 * Variante en tema oscuro: verifica bordes, fondo oscuro y contraste de inputs.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
}
