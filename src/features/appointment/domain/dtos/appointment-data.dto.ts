import { AppointmentEntity } from "../entities";

export interface AppointmentDataDto extends AppointmentEntity {
    ownerName: string,
    petPhoto: string,
}
