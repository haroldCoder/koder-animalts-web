import { ClinicEntity } from "../entities";

export interface IClinicRepository {
    getAllClinics(): Promise<ClinicEntity[]>;
}
