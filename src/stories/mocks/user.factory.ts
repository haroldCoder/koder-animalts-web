import type { UserEntity } from '@/features/user/domain/entities'
import { UserRole } from '@/features/user/domain/enums'
import { makeImage } from './image.factory'

/**
 * Usuario de ejemplo. `MainLayoutContext` lo requiere en 13 componentes,
 * así que estas factories son la base del decorador `withMainLayout`.
 */
export const makeUser = (overrides: Partial<UserEntity> = {}): UserEntity => ({
  name: 'Laura Gómez',
  email: 'laura.gomez@gmail.com',
  role: UserRole.owner,
  image: makeImage('Laura Gómez'),
  ...overrides,
})

/** Dueño de mascota: rol `OWNER`, sin título de doctor en el header. */
export const makeOwner = (overrides: Partial<UserEntity> = {}): UserEntity =>
  makeUser({ role: UserRole.owner, ...overrides })

/** Veterinario: rol `VETERINARIAN`, el header antepone "Dr.". */
export const makeVeterinarian = (overrides: Partial<UserEntity> = {}): UserEntity =>
  makeUser({
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@koderanimalts.com',
    role: UserRole.veterinary,
    image: makeImage('Carlos Mendoza', '#0f766e'),
    ...overrides,
  })

/** Usuario sin foto: cubre el fallback de iniciales en `Avatar`. */
export const makeUserWithoutImage = (overrides: Partial<UserEntity> = {}): UserEntity =>
  makeUser({ image: undefined, ...overrides })
