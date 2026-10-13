import { IAuthRepository } from "../../domain/repositories";
import { AuthResponseDto } from "../../domain/entities";

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    return this.authRepository.login(email, password);
  }
}