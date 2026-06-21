import { PetEntity } from "../entities";

export interface IPetRepository {
    findByOwnerUserId(userId: string): Promise<PetEntity[]>;
    searchPetByVeterinarianUserId(userId: string, petName?: string, ownerName?: string): Promise<PetEntity[]>;
}
