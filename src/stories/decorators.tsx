import type { Decorator } from '@storybook/react-vite'
import { MainLayoutContext } from '@/common/presentation/layout'
import type { UserEntity } from '@/features/user/domain/entities'
import { MockAuthContainer, type MockAuthConfig } from './mock-auth-container'

export type { MockAuthConfig }

/**
 * Inyecta el usuario que exige `MainLayoutContext`.
 *
 * Lo consumen 13 componentes (`Header`, `NavMenu`, `AppointmentCard`,
 * `MedicalRecordCardToggle`, páginas de home, etc.). Sin este decorador
 * el `useContext(MainLayoutContext)!` revienta al leer `.user`.
 *
 * @example
 * decorators: [withMainLayout(makeVeterinarian())]
 */
export const withMainLayout = (user: UserEntity): Decorator => (
  Story
) => (
  <MainLayoutContext.Provider value={{ user }}>
    <Story />
  </MainLayoutContext.Provider>
)

/**
 * Intercepta peticiones en `apiClient.post` durante la story para simular
 * respuestas exitosas, errores 401/409 o peticiones pendientes sin levantar el backend.
 */
export const withMockAuth = (config: MockAuthConfig): Decorator => (
  Story
) => (
  <MockAuthContainer config={config}>
    <Story />
  </MockAuthContainer>
)
