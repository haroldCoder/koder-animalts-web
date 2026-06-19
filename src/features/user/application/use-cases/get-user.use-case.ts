import { UserEntity } from "../../domain/entities";
import { UserRepository } from "../../domain/respositories";

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string): Promise<UserEntity | null> {
        return this.userRepository.getUser(userId);
    }
}
