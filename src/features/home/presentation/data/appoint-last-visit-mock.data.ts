import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { AppointmentStatusEnum } from "@/features/appointment/domain/enums";

export const appointmentLastVisitMockData: AppointmentEntity[] = [
    {
        id: "1",
        date: new Date(),
        reason: "Consulta general",
        clinicName: "VetCare Center",
        petName: "Bimbo",
        veterinarianName: "Dr. Carlos Ruiz",
        status: AppointmentStatusEnum.SCHEDULED,
        petId: "pet-1",
        veterinarianId: "vet-1",
    },
    {
        id: "2",
        date: new Date(),
        reason: "Consulta general",
        clinicName: "Animal Health",
        petName: "Luna",
        veterinarianName: "Dra. Ana Silva",
        status: AppointmentStatusEnum.SCHEDULED,
        petId: "pet-2",
        veterinarianId: "vet-2",
    },
    {
        id: "3",
        date: new Date(),
        reason: "Consulta general",
        clinicName: "PetLife Clinic",
        petName: "Max",
        veterinarianName: "Dr. Jorge Paz",
        status: AppointmentStatusEnum.SCHEDULED,
        petId: "pet-3",
        veterinarianId: "vet-3",
    },
    {
        id: "4",
        date: new Date(),
        reason: "Consulta general",
        clinicName: "VetCare Center",
        petName: "Bella",
        veterinarianName: "Dra. Sofía Castro",
        status: AppointmentStatusEnum.SCHEDULED,
        petId: "pet-4",
        veterinarianId: "vet-4",
    },
    {
        id: "5",
        date: new Date(),
        reason: "Consulta general",
        clinicName: "Mascotas Felices",
        petName: "Toby",
        veterinarianName: "Dr. Juan Pérez",
        status: AppointmentStatusEnum.SCHEDULED,
        petId: "pet-5",
        veterinarianId: "vet-5",
    }
];

