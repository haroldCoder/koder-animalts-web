import { IAuthRepository } from "../../domain/repositories";

export class SignupUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(email: string, password: string, name: string, image: string | File | null): Promise<any> {
        const response = await this.authRepository.signup(email, password, name, image);

        return response;
    }
}