import { IAuthRepository } from "../../domain/repositories";
import { AuthResponseDto } from "../../domain/entities";
import { authSessionStorage } from "../../infrastructure/storage";

export class RefreshTokenUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<AuthResponseDto> {
    const refreshToken = authSessionStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.authRepository.refreshToken(refreshToken);
    if (response?.data?.accessToken && response?.data?.refreshToken) {
      authSessionStorage.updateTokens(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.user
      );
    }

    return response;
  }
}
