import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { ConsultationType } from "@/features/appointment/domain/enums";

export const appointmentMockData: AppointmentEntity[] = [
    {
        id: '1',
        date: new Date(),
        reasonForVisit: 'Consulta general',
        notes: 'Todo bien',
        type: ConsultationType.CONSULTATION,
        clinicName: 'Clinic 1',
        petName: 'Pet 1',
        veterinaryName: 'Veterinary 1',
        documentIds: ["1"],
        veterinaryId: "1",
        ownerId: "1",
        clinicId: "1",
        petPhoto: "https://images.sample.com/dog.jpg",
        petId: "1"
    },
    {
        id: '2',
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // Mañana
        reasonForVisit: 'Vacunación',
        notes: 'Vacuna 2',
        type: ConsultationType.VACCINATION,
        clinicName: 'Clinic 2',
        petName: 'Pet 2',
        veterinaryName: 'Veterinary 2',
        documentIds: ["1"],
        veterinaryId: "1",
        ownerId: "1",
        clinicId: "1",
        petPhoto: "https://images.sample.com/cat.jpg",
        petId: "1"
    },
    {
        id: '3',
        date: new Date(new Date().setDate(new Date().getDate() + 7)), // En una semana (no debe aparecer en avisos)
        reasonForVisit: 'Cirugía',
        notes: 'Cirugía 3',
        type: ConsultationType.SURGERY,
        clinicName: 'Clinic 3',
        petName: 'Pet 3',
        veterinaryName: 'Veterinary 3',
        documentIds: ["1"],
        veterinaryId: "1",
        ownerId: "1",
        clinicId: "1",
        petPhoto: "https://images.sample.com/dog2.jpg",
        petId: "1"
    },
    {
        id: '4',
        date: new Date(),
        reasonForVisit: 'Examen de laboratorio',
        notes: 'Examen de laboratorio 4',
        type: ConsultationType.LAB_RESULTS,
        clinicName: 'Clinic 4',
        petName: 'Pet 4',
        veterinaryName: 'Veterinary 4',
        documentIds: ["1"],
        veterinaryId: "1",
        ownerId: "1",
        clinicId: "1",
        petPhoto: "https://images.sample.com/dog3.jpg",
        petId: "1"
    },
]