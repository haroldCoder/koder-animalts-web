import type { Decorator, Preview } from '@storybook/react-vite'
import { AppProviders } from '@/stories/providers'
import '../src/index.css'

/**
 * Parámetros propios del proyecto. Se pueden sobrescribir por story:
 * - `router.initialPath`: ruta inicial del MemoryRouter (para títulos activos y `useLocation`).
 * - `theme`: 'light' | 'dark' para revisar las variantes de tema sin depender de `next-themes`.
 */
interface AppParameters {
  router?: { initialPath?: string }
  theme?: 'light' | 'dark'
}

const withAppProviders: Decorator = (Story, context) => {
  const { router, theme } = context.parameters as AppParameters

  return (
    <AppProviders key={context.id} initialPath={router?.initialPath ?? '/'} theme={theme ?? 'light'}>
      <Story />
    </AppProviders>
  )
}

const preview: Preview = {
  decorators: [withAppProviders],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Common', 'Features', 'UI'],
      },
    },
  },
}

export default preview
