import { ClinicEntity } from "../../domain/entities";

export interface ClinicResponseEntity {
    statusCode: number;
    data: ClinicEntity[];
}