export interface ClinicSummaryResponseEntity {
    statusCode: number;
    data: {
        totalPets: number;
        totalOwners: number;
        clinicName: string;
    }
}