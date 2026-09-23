import type { PetEntity } from '@/features/pet/domain/entities'

/**
 * Fotos reales de mascotas para los fixtures (Unsplash, uso libre).
 * Se piden a 400px con recorte: cada una pesa entre 15 y 55 KB y responde
 * `200 image/jpeg`. Requieren red; si el entorno no tiene salida a internet
 * las stories siguen renderizando, con el fallback de iniciales del avatar.
 */
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70`

export const PET_PHOTOS = {
  beagle: photo('1543466835-00a7907e9de1'),
  golden: photo('1552053831-71594a27632d'),
  frenchBulldog: photo('1583337130417-3346a1be7dee'),
  borderCollie: photo('1587300003388-59208cc962cb'),
  jackRussell: photo('1561037404-61cd46aa615b'),
  goldenPuppy: photo('1594149929911-78975a43d4f5'),
  catBicolor: photo('1514888286974-6c03e2ca1dba'),
  kittenTabby: photo('1518791841217-8f162f1e1131'),
  catGinger: photo('1573865526739-10659fec78a5'),
  rabbit: photo('1585110396000-c9ffd4e4b308'),
} as const

const CLINICS = ['Clínica Veterinaria Central', 'Animal Care Norte', 'VetSalud Sur']

interface PetFixture {
  name: string
  species: string
  breed: string
  color: string
  gender: string
  weight: number
  birthdate: string
  photo: string
}

/**
 * Fixtures coherentes: el nombre, la especie, la raza y la foto corresponden
 * entre sí (no se le pone cara de gato a un Beagle).
 */
const PET_FIXTURES: PetFixture[] = [
  {
    name: 'Max',
    species: 'Perro',
    breed: 'Beagle',
    color: 'Blanco y café',
    gender: 'Macho',
    weight: 11.4,
    birthdate: '2021-04-12',
    photo: PET_PHOTOS.beagle,
  },
  {
    name: 'Luna',
    species: 'Gato',
    breed: 'Mestizo',
    color: 'Blanco y negro',
    gender: 'Hembra',
    weight: 4.2,
    birthdate: '2022-01-30',
    photo: PET_PHOTOS.catBicolor,
  },
  {
    name: 'Toby',
    species: 'Perro',
    breed: 'Golden Retriever',
    color: 'Dorado',
    gender: 'Macho',
    weight: 28.6,
    birthdate: '2019-09-03',
    photo: PET_PHOTOS.golden,
  },
  {
    name: 'Nala',
    species: 'Gato',
    breed: 'Tabby',
    color: 'Atigrado',
    gender: 'Hembra',
    weight: 3.1,
    birthdate: '2023-06-18',
    photo: PET_PHOTOS.kittenTabby,
  },
  {
    name: 'Rocky',
    species: 'Perro',
    breed: 'Bulldog Francés',
    color: 'Crema',
    gender: 'Macho',
    weight: 12.8,
    birthdate: '2020-11-25',
    photo: PET_PHOTOS.frenchBulldog,
  },
  {
    name: 'Maya',
    species: 'Gato',
    breed: 'Naranja doméstico',
    color: 'Naranja',
    gender: 'Hembra',
    weight: 4.6,
    birthdate: '2021-08-09',
    photo: PET_PHOTOS.catGinger,
  },
  {
    name: 'Simba',
    species: 'Perro',
    breed: 'Border Collie',
    color: 'Tricolor',
    gender: 'Macho',
    weight: 18.3,
    birthdate: '2018-03-21',
    photo: PET_PHOTOS.borderCollie,
  },
  {
    name: 'Bruno',
    species: 'Perro',
    breed: 'Jack Russell',
    color: 'Blanco y negro',
    gender: 'Macho',
    weight: 7.5,
    birthdate: '2022-12-05',
    photo: PET_PHOTOS.jackRussell,
  },
  {
    name: 'Zeus',
    species: 'Perro',
    breed: 'Golden Retriever',
    color: 'Dorado',
    gender: 'Macho',
    weight: 6.2,
    birthdate: '2024-02-14',
    photo: PET_PHOTOS.goldenPuppy,
  },
  {
    name: 'Kira',
    species: 'Conejo',
    breed: 'Conejo enano',
    color: 'Blanco',
    gender: 'Hembra',
    weight: 1.8,
    birthdate: '2023-10-02',
    photo: PET_PHOTOS.rabbit,
  },
  {
    name: 'Sasha',
    species: 'Gato',
    breed: 'Naranja doméstico',
    color: 'Naranja',
    gender: 'Hembra',
    weight: 3.9,
    birthdate: '2020-05-16',
    photo: PET_PHOTOS.catGinger,
  },
  {
    name: 'Chloe',
    species: 'Perro',
    breed: 'Jack Russell',
    color: 'Blanco y café',
    gender: 'Hembra',
    weight: 6.8,
    birthdate: '2023-01-27',
    photo: PET_PHOTOS.jackRussell,
  },
]

/**
 * Mascota de ejemplo con foto real. Cualquier campo se puede sobrescribir
 * para cubrir casos incompletos (sin peso, sin microchip, sin clínica…).
 *
 * Con más de 12 mascotas los fixtures se repiten en ciclo (las fotos también).
 */
export const makePet = (overrides: Partial<PetEntity> = {}, index = 0): PetEntity => {
  const fixture = PET_FIXTURES[index % PET_FIXTURES.length]

  return {
    id: `pet-${index + 1}`,
    name: fixture.name,
    birthdate: new Date(fixture.birthdate),
    image: fixture.photo,
    breed: fixture.breed,
    isActive: true,
    gender: fixture.gender,
    species: fixture.species,
    weight: fixture.weight,
    microchip: `98514100${100000 + index}`,
    color: fixture.color,
    clinicName: CLINICS[index % CLINICS.length],
    ...overrides,
  }
}

/** Lista de mascotas con ids estables, para carruseles y tablas. */
export const makePets = (count = 3, overrides: Partial<PetEntity> = {}): PetEntity[] =>
  Array.from({ length: count }, (_, index) => makePet(overrides, index))

/** Mascota sin foto: fuerza el fallback de iniciales en el avatar. */
export const makePetWithoutImage = (overrides: Partial<PetEntity> = {}): PetEntity =>
  makePet({ image: undefined, ...overrides }, 1)
