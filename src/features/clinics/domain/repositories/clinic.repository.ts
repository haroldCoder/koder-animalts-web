import { ClinicEntity, ClinicSummaryEntity } from "../entities";

export interface IClinicRepository {
    getAllClinics(): Promise<ClinicEntity[]>;
    summaryClinic(userId: string): Promise<ClinicSummaryEntity>;
}
