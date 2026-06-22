export interface AppointmentResponseEntity {
    statusCode: number;
    data: Array<{
        id: string,
        visitDate: string,
        type: "CONSULTATION" | "VACCINATION" | "SURGERY" | "EMERGENCY" | "LAB_RESULTS" | "HOSPITALIZATION",
        reasonForVisit: string,
        diagnosis: string,
        treatment: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
        petId: string,
        veterinarianId: string,
        vaccinations: [
            {
                id: string,
                vaccineName: string,
                dateAdministered: string,
                nextDueDate: string,
                lotNumber: string,
                createdAt: string,
                medicalRecordId: string
            }
        ],
        pet: {
            name: string,
            mainImage: string,
            owner?: {
                user: {
                    name: string
                }
            }
        },
        veterinarian: {
            user: {
                name: string
            },
            clinic: {
                name: string
            }
        };
    }>
}
