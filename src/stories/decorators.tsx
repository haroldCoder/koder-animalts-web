import type { Decorator } from '@storybook/react-vite'
import { MainLayoutContext } from '@/common/presentation/layout'
import type { UserEntity } from '@/features/user/domain/entities'
import { MockAuthContainer, type MockAuthConfig } from './mock-auth-container'
import {
  MockAppointmentContainer,
  type MockAppointmentConfig,
} from './mock-appointment-container'
import {
  MockVaccinationContainer,
  type MockVaccinationConfig,
} from './mock-vaccination-container'

export type { MockAuthConfig, MockAppointmentConfig, MockVaccinationConfig }

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

/**
 * Intercepta peticiones de citas y mascotas en `apiClient` e inicializa `localStorage.user`
 * para stories de componentes y vistas del módulo de citas (`UpcomingAppointment`,
 * `AppointmentHistory`, `AppointmentsList`, `ScheduleAppointmentForm`, etc.).
 */
export const withMockAppointments = (
  config: MockAppointmentConfig = {}
): Decorator => (Story) => (
  <MockAppointmentContainer config={config}>
    <Story />
  </MockAppointmentContainer>
)

/**
 * Intercepta peticiones de vacunas, mascotas y expedientes médicos en `apiClient`
 * e inicializa `localStorage.user` para stories del módulo de vacunación
 * (`Vaccination`, `CreateVaccinationDialog`, `UpdateStatus`, etc.).
 */
export const withMockVaccinations = (
  config: MockVaccinationConfig = {}
): Decorator => (Story) => (
  <MockVaccinationContainer config={config}>
    <Story />
  </MockVaccinationContainer>
)
