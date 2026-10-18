import { useEffect, useState, useCallback } from "react";
import { authSessionStorage } from "@/features/auth/infrastructure/storage";
import { UserAuthProfile } from "@/features/auth/domain/entities";
import { HttpAuthRepository } from "@/features/auth/infrastructure/http";
import { LogoutUseCase } from "@/features/auth/application/use-cases";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const authRepository = new HttpAuthRepository();
const logoutUseCase = new LogoutUseCase(authRepository);

export interface UseAuthReturn {
  user: string | null;
  userId: string | null;
  userProfile: UserAuthProfile | null;
  veterinarianId: string | null;
  ownerId: string | null;
  clinicId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [userId, setUserId] = useState<string | null>(() => authSessionStorage.getUserId());
  const [userProfile, setUserProfile] = useState<UserAuthProfile | null>(() => authSessionStorage.getUser());
  const [accessToken, setAccessToken] = useState<string | null>(() => authSessionStorage.getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | null>(() => authSessionStorage.getRefreshToken());

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const updateState = () => {
      setUserId(authSessionStorage.getUserId());
      setUserProfile(authSessionStorage.getUser());
      setAccessToken(authSessionStorage.getAccessToken());
      setRefreshToken(authSessionStorage.getRefreshToken());
    };

    const unsubscribe = authSessionStorage.subscribe(updateState);
    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUseCase.execute();
    } finally {
      queryClient.clear();
      navigate("/auth");
    }
  }, [queryClient, navigate]);

  const veterinarianId =
    userProfile?.veterinarianId ||
    (userProfile?.role === "VETERINARIAN" ? userProfile?.id || userId : null);

  return {
    user: userId,
    userId,
    userProfile,
    veterinarianId,
    ownerId: userProfile?.ownerId ?? null,
    clinicId: userProfile?.clinicId ?? null,
    accessToken,
    refreshToken,
    isAuthenticated: !!userId && !!accessToken,
    logout,
  };
};