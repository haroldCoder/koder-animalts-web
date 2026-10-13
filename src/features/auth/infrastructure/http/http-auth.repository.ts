import { apiClient } from "@/common";
import { IAuthRepository } from "../../domain/repositories";
import { AuthResponseDto, UserAuthProfile } from "../../domain/entities";

export class HttpAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<AuthResponseDto> {
    const response = await apiClient.post<AuthResponseDto>("/auth/login", {
      body: {
        email,
        password,
      },
    });

    return response;
  }

  async signup(
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
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }
    if (role) {
      formData.append("role", role);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    if (address) {
      formData.append("address", address);
    }
    if (clinicId) {
      formData.append("clinicId", clinicId);
    }
    if (specialty) {
      formData.append("specialty", specialty);
    }

    const response = await apiClient.post<AuthResponseDto>("/auth/signup", {
      body: formData,
    });

    return response;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    const response = await apiClient.post<AuthResponseDto>("/auth/refresh", {
      body: {
        refreshToken,
      },
    });

    return response;
  }

  async logout(refreshToken?: string): Promise<void> {
    await apiClient.post<void>("/auth/logout", {
      body: refreshToken ? { refreshToken } : {},
    });
  }

  async getProfile(): Promise<UserAuthProfile> {
    const response = await apiClient.get<{
      statusCode: number;
      message: string;
      data: UserAuthProfile;
    }>("/auth/me");

    return response.data;
  }
}