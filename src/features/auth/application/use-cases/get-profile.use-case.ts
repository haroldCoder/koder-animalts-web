import { IAuthRepository } from "../../domain/repositories";
import { UserAuthProfile } from "../../domain/entities";

export class GetProfileUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<UserAuthProfile> {
    return this.authRepository.getProfile();
  }
}
