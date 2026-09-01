import { VaccinationEntity } from "../../domain/entities";
import { VaccinationStatus } from "../../domain/enums";

export const vaccinationMockData: VaccinationEntity[] = [
    {
        id: "1",
        name: "Rabia",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 1",
        petName: "Pet 1",
        status: VaccinationStatus.PENDING
    },
    {
        id: "2",
        name: "Parvovirus",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 2",
        petName: "Pet 2",
        status: VaccinationStatus.PENDING
    },
    {
        id: "3",
        name: "Moquillo",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 3",
        petName: "Pet 3",
        status: VaccinationStatus.PENDING
    },
    {
        id: "4",
        name: "Rabia",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 1",
        petName: "Pet 1",
        status: VaccinationStatus.PENDING
    },
    {
        id: "5",
        name: "Parvovirus",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 2",
        petName: "Pet 2",
        status: VaccinationStatus.PENDING
    },
    {
        id: "6",
        name: "Moquillo",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 3",
        petName: "Pet 3",
        status: VaccinationStatus.PENDING
    },
    {
        id: "7",
        name: "Rabia",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 1",
        petName: "Pet 1",
        status: VaccinationStatus.PENDING
    },
    {
        id: "8",
        name: "Parvovirus",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 2",
        petName: "Pet 2",
        status: VaccinationStatus.PENDING
    },
    {
        id: "9",
        name: "Moquillo",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 3",
        petName: "Pet 3",
        status: VaccinationStatus.PENDING
    },
    {
        id: "10",
        name: "Rabia",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 1",
        petName: "Pet 1",
        status: VaccinationStatus.PENDING
    },
    {
        id: "11",
        name: "Parvovirus",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 2",
        petName: "Pet 2",
        status: VaccinationStatus.PENDING
    },
    {
        id: "12",
        name: "Moquillo",
        date: new Date("2024-01-01"),
        nextDate: new Date("2025-01-01"),
        lotNumber: "123456789",
        medicalRecordId: "Medical Record 3",
        petName: "Pet 3",
        status: VaccinationStatus.PENDING
    },
];