import type { ClinicOption } from '@/common/presentation/interfaces'

const CLINICS = [
  {
    label: 'Clínica Veterinaria Central',
    address: 'Cra. 45 #26-15, Bogotá',
    phone: '+57 601 555 0134',
    email: 'contacto@vetcentral.com',
  },
  {
    label: 'Animal Care Norte',
    address: 'Cll. 127 #19-42, Bogotá',
    phone: '+57 601 555 0198',
    email: 'citas@animalcarenorte.com',
  },
  {
    label: 'VetSalud Sur',
    address: 'Av. Caracas #48-11, Bogotá',
    phone: '+57 601 555 0177',
    email: 'servicioalcliente@vetsaludsur.com',
  },
]

/**
 * Opción de clínica tal como la consumen `ClinicSelector` y `ClinicDetail`:
 * `value` para el select, `label` para mostrar y `aditional` para el detalle.
 */
export const makeClinicOption = (
  overrides: Partial<ClinicOption> = {},
  index = 0
): ClinicOption => {
  const clinic = CLINICS[index % CLINICS.length]

  return {
    value: `clinic-${index + 1}`,
    label: clinic.label,
    aditional: {
      address: clinic.address,
      phone: clinic.phone,
      email: clinic.email,
    },
    ...overrides,
  }
}

export const makeClinicOptions = (count = 3): ClinicOption[] =>
  Array.from({ length: count }, (_, index) => makeClinicOption({}, index))

/** Clínica sin datos de contacto: cubre el estado "Sin información adicional". */
export const makeClinicWithoutContact = (): ClinicOption =>
  makeClinicOption({
    aditional: { address: '', phone: '', email: '' },
  })
