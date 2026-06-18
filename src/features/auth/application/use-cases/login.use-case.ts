import { IAuthRepository } from "../../domain/repositories";

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(email: string, password: string): Promise<any> {
        const response = await this.authRepository.login(email, password);

        return response;
    }
}