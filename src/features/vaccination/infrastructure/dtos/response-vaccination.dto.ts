export interface ResponseVaccinationDto {
    statusCode: number;
    data: Array<{
        id: string;
        vaccineName: string;
        dateAdministered: string;
        nextDueDate: string;
        lotNumber: string;
        createdAt: string;
        medicalRecordId: string;
        medicalRecord: {
            pet: {
                name: string;
            }
        },
        veterinarian: {
            id: string;
            name: string;
        }
    }>
}