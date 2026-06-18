import { useMemo } from "react";

export const useAuth = (): { user: string | null } => {
    const user = useMemo(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }, [localStorage.getItem('user')]);

    return { user };
}