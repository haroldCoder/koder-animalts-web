import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="font-sans antialiased text-foreground bg-background p-4 min-h-[400px] flex items-center justify-center">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview