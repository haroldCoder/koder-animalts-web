import { ClinicEntity, ClinicSummaryEntity, VeterinarianEntity } from "../entities";

export interface IClinicRepository {
    getAllClinics(): Promise<ClinicEntity[]>;
    summaryClinic(userId: string): Promise<ClinicSummaryEntity>;
    getAllVeterinariansOfClinic(clinicId: string): Promise<VeterinarianEntity[]>;
}

