export interface UserAuthProfile {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: 'OWNER' | 'VETERINARIAN' | 'UNKNOWN';
  ownerId?: string | null;
  veterinarianId?: string | null;
  clinicId?: string | null;
  userId?: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSessionData {
  tokens: AuthTokens;
  user: UserAuthProfile;
}

export interface AuthResponseDto {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserAuthProfile;
  };
}
