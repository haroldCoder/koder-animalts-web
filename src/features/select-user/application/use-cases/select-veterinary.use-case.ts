import { ISelectUserRepository } from "../../domain/repositories";

export class SelectVeterinaryUseCase {
    constructor(private selectUserRepository: ISelectUserRepository) { }

    async execute(userId: string, clinicId: string, phone: string, speciality?: string): Promise<void> {
        await this.selectUserRepository.selectVeterinary(userId, clinicId, phone, speciality);
    }
}
