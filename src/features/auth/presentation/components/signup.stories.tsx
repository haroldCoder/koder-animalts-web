import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { SignUp } from './signup'
import { makeMockImageFile } from '@/stories/mocks'
import { withMockAuth } from '@/stories/decorators'

/**
 * Formulario de registro de usuario: nombre, correo, contraseña, confirmación
 * y zona de carga de foto de perfil (drag & drop o selector de archivos nativo)
 * con previsualización inmediata y validaciones integradas.
 */
const meta = {
  title: 'Features/Auth/SignUp',
  component: SignUp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza React Hook Form con `Controller` para la imagen y `useSignupUsers` de React Query. Valida igualdad de contraseñas, tipos de archivo y campos obligatorios.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[440px] mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

/** Estado inicial: campos vacíos y zona de carga de foto sin archivo seleccionado. */
export const Default: Story = {}

/**
 * Foto de perfil seleccionada: muestra miniatura previsualizada, nombre del archivo
 * y botón para limpiar o reemplazar la imagen.
 */
export const WithImageSelected: Story = {
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const mockFile = makeMockImageFile('dra-carlos-mendoza.png')

    await userEvent.upload(fileInput, mockFile)

    const previewImg = canvasElement.querySelector(
      'img[alt="preview"]'
    ) as HTMLImageElement
    await expect(previewImg).toBeInTheDocument()
    await expect(canvasElement.textContent).toContain('dra-carlos-mendoza.png')
  },
}

/** Formulario completo con todos los datos válidos listo para enviar. */
export const FilledForm: Story = {
  play: async ({ canvas, canvasElement }) => {
    const nameInput = canvas.getByPlaceholderText('Nombre completo')
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const confirmInput = canvas.getByPlaceholderText('Confirmar')
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    await userEvent.type(nameInput, 'Dra. Valentina Arismendi')
    await userEvent.type(emailInput, 'valentina.arismendi@koderanimalts.com')
    await userEvent.type(passwordInput, 'Veterinaria2026!')
    await userEvent.type(confirmInput, 'Veterinaria2026!')

    const mockFile = makeMockImageFile('dra-valentina.png')
    await userEvent.upload(fileInput, mockFile)

    await expect(nameInput).toHaveValue('Dra. Valentina Arismendi')
    await expect(emailInput).toHaveValue('valentina.arismendi@koderanimalts.com')
    await expect(passwordInput).toHaveValue('Veterinaria2026!')
    await expect(confirmInput).toHaveValue('Veterinaria2026!')
  },
}

/**
 * Errores de validación disparados al intentar enviar el formulario vacío:
 * exige nombre, correo, contraseña y foto de perfil.
 */
export const ValidationErrors: Story = {
  play: async ({ canvas }) => {
    const submitButton = canvas.getByRole('button', { name: /crear cuenta/i })
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('El nombre es requerido')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('El correo electrónico es requerido')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('La contraseña es requerida')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('La imagen de perfil es requerida')
    ).toBeInTheDocument()
  },
}

/**
 * Validación cuando la confirmación de contraseña no coincide con la original.
 */
export const PasswordMismatch: Story = {
  play: async ({ canvas }) => {
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const confirmInput = canvas.getByPlaceholderText('Confirmar')
    const submitButton = canvas.getByRole('button', { name: /crear cuenta/i })

    await userEvent.type(passwordInput, 'Password123')
    await userEvent.type(confirmInput, 'Diferente456')
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('Las contraseñas no coinciden')
    ).toBeInTheDocument()
  },
}

/**
 * Validación de longitud mínima en nombre y contraseña, y formato de correo electrónico.
 */
export const ShortFieldsValidation: Story = {
  play: async ({ canvas }) => {
    const nameInput = canvas.getByPlaceholderText('Nombre completo')
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const confirmInput = canvas.getByPlaceholderText('Confirmar')
    const submitButton = canvas.getByRole('button', { name: /crear cuenta/i })

    await userEvent.type(nameInput, 'Lu')
    await userEvent.type(emailInput, 'correo-invalido')
    await userEvent.type(passwordInput, '123')
    await userEvent.type(confirmInput, '123')
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('El nombre debe tener al menos 3 caracteres')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('Dirección de correo electrónico inválida')
    ).toBeInTheDocument()
    await expect(
      await canvas.findByText('Mínimo 6 caracteres')
    ).toBeInTheDocument()
  },
}

/**
 * Error de servidor (409 Conflict): correo ya registrado en el sistema.
 */
export const ServerError: Story = {
  decorators: [
    withMockAuth({
      mode: 'error',
      statusCode: 409,
      message: 'El correo electrónico ya se encuentra registrado.',
    }),
  ],
  play: async ({ canvas, canvasElement }) => {
    const nameInput = canvas.getByPlaceholderText('Nombre completo')
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const confirmInput = canvas.getByPlaceholderText('Confirmar')
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const submitButton = canvas.getByRole('button', { name: /crear cuenta/i })

    await userEvent.type(nameInput, 'Dr. Roberto Gómez')
    await userEvent.type(emailInput, 'roberto.gomez@koderanimalts.com')
    await userEvent.type(passwordInput, 'Veterinario123!')
    await userEvent.type(confirmInput, 'Veterinario123!')

    const mockFile = makeMockImageFile('roberto.png')
    await userEvent.upload(fileInput, mockFile)

    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText(
        'El correo electrónico ya se encuentra registrado.'
      )
    ).toBeInTheDocument()
  },
}

/**
 * Estado de envío de datos: botón deshabilitado con spinner de carga.
 */
export const LoadingState: Story = {
  decorators: [
    withMockAuth({
      mode: 'pending',
    }),
  ],
  play: async ({ canvas, canvasElement }) => {
    const nameInput = canvas.getByPlaceholderText('Nombre completo')
    const emailInput = canvas.getByPlaceholderText('Correo electrónico')
    const passwordInput = canvas.getByPlaceholderText('Contraseña')
    const confirmInput = canvas.getByPlaceholderText('Confirmar')
    const fileInput = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const submitButton = canvas.getByRole('button', { name: /crear cuenta/i })

    await userEvent.type(nameInput, 'Dra. Andrea Beltrán')
    await userEvent.type(emailInput, 'andrea.beltran@koderanimalts.com')
    await userEvent.type(passwordInput, 'Veterinaria123!')
    await userEvent.type(confirmInput, 'Veterinaria123!')

    const mockFile = makeMockImageFile('andrea.png')
    await userEvent.upload(fileInput, mockFile)

    await userEvent.click(submitButton)

    await expect(submitButton).toBeDisabled()
  },
}

/**
 * Variante en tema oscuro: verifica contrastes del dropzone, inputs y botón.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
}
