import { IAuthRepository } from "../../domain/repositories";
import { AuthResponseDto } from "../../domain/entities";

export class SignupUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    email: string,
    password: string,
    name: string,
    image: string | File | null,
    role?: string,
    phone?: string,
    address?: string,
    clinicId?: string,
    specialty?: string
  ): Promise<AuthResponseDto> {
    return this.authRepository.signup(
      email,
      password,
      name,
      image,
      role,
      phone,
      address,
      clinicId,
      specialty
    );
  }
}