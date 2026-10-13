import { AuthResponseDto, UserAuthProfile } from "../entities";

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthResponseDto>;
  signup(
    email: string,
    password: string,
    name: string,
    image: string | File | null,
    role?: string,
    phone?: string,
    address?: string,
    clinicId?: string,
    specialty?: string
  ): Promise<AuthResponseDto>;
  refreshToken(refreshToken: string): Promise<AuthResponseDto>;
  logout(refreshToken?: string): Promise<void>;
  getProfile(): Promise<UserAuthProfile>;
}