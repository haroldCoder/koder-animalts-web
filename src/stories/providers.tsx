import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface AppProvidersProps {
  children: ReactNode
  /** Ruta inicial del `MemoryRouter` (parámetro `router.initialPath`). */
  initialPath: string
  /** Fuerza las variantes `dark:` sin depender de `next-themes`. */
  theme: 'light' | 'dark'
}

/**
 * Réplica de los providers de `src/main.tsx` para que cualquier componente
 * renderice igual que en la app: React Query, tooltips, router, tokens de tema y toasts.
 *
 * Vive en su propio archivo porque `preview.tsx` no debe declarar componentes
 * (regla `react-refresh/only-export-components`).
 */
export const AppProviders = ({ children, initialPath, theme }: AppProvidersProps) => {
  // Un cliente por story: la caché de una story no debe filtrarse a la siguiente.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <div
            className={cn(
              'font-sans antialiased text-foreground bg-background min-h-screen',
              theme === 'dark' && 'dark'
            )}
          >
            {children}
            <Toaster />
          </div>
        </MemoryRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
