import { authSessionStorage } from "@/features/auth/infrastructure/storage";

export const userExistLocalData = (): boolean => {
  return authSessionStorage.isAuthenticated() || !!localStorage.getItem("user");
};