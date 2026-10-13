import { UserAuthProfile } from "../../domain/entities";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY, LEGACY_USER_KEY, AUTH_EVENT_NAME } from "../constants/session";

class AuthSessionStorage {
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  getUser(): UserAuthProfile | null {
    try {
      const rawUser = localStorage.getItem(USER_KEY);
      if (rawUser) {
        return JSON.parse(rawUser) as UserAuthProfile;
      }
      return null;
    } catch {
      return null;
    }
  }

  getUserId(): string | null {
    const user = this.getUser();
    if (user?.id) {
      return user.id;
    }

    try {
      const legacy = localStorage.getItem(LEGACY_USER_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        return typeof parsed === "string" ? parsed : parsed?.id ?? null;
      }
    } catch {
      // ignore
    }

    return null;
  }

  isAuthenticated(): boolean {
    return !!(this.getAccessToken() || this.getRefreshToken());
  }

  saveSession(
    accessToken: string,
    refreshToken: string,
    user: UserAuthProfile
  ): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      // Preservar retrocompatibilidad con componentes existentes que esperan user = id
      localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(user.id));
    } catch (e) {
      console.error("Error saving auth session in localStorage:", e);
    }

    this.notifyAuthChange();
  }

  updateTokens(
    accessToken: string,
    refreshToken: string,
    user?: UserAuthProfile
  ): void {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(user.id));
      }
    } catch (e) {
      console.error("Error updating tokens:", e);
    }

    this.notifyAuthChange();
  }

  clearSession(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(LEGACY_USER_KEY);
    } catch (e) {
      console.error("Error clearing auth session:", e);
    }

    this.notifyAuthChange();
  }

  private notifyAuthChange(): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME));
    }
  }

  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") {
      return () => { };
    }

    const handler = () => listener();
    window.addEventListener(AUTH_EVENT_NAME, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }
}

export const authSessionStorage = new AuthSessionStorage();
