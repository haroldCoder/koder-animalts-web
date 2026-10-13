import { IAuthRepository } from "../../domain/repositories";
import { authSessionStorage } from "../../infrastructure/storage";

export class LogoutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    const refreshToken = authSessionStorage.getRefreshToken();
    try {
      if (authSessionStorage.getAccessToken()) {
        await this.authRepository.logout(refreshToken || undefined);
      }
    } catch (error) {
      console.warn("Backend logout failed or was unreachable:", error);
    } finally {
      authSessionStorage.clearSession();
    }
  }
}
