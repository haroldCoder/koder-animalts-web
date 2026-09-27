import { VeterinarianEntity } from "../../domain/entities";

export interface VeterinariansResponseEntity {
    statusCode: number;
    message?: string;
    data: VeterinarianEntity[];
}
