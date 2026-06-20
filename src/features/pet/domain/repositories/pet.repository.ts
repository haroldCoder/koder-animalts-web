import { PetEntity } from "../entities";

export interface IPetRepository {
    findByOwnerUserId(userId: string): Promise<PetEntity[]>;
}
