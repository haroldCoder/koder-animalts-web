export interface ClinicSummaryResponseEntity {
    statusCode: number;
    data: {
        totalPets: number;
        totalUsers: number;
        clinicName: string;
    }
}