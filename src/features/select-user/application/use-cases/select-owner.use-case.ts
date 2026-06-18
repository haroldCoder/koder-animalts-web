import { ISelectUserRepository } from "../../domain/repositories";

export class SelectOwnerUseCase {
    constructor(private selectUserRepository: ISelectUserRepository) { }

    async execute(userId: string, phone: string, address: string): Promise<void> {
        await this.selectUserRepository.selectOwner(userId, phone, address);
    }
}
