import type { Decorator } from '@storybook/react-vite'
import { MainLayoutContext } from '@/common/presentation/layout'
import type { UserEntity } from '@/features/user/domain/entities'

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
