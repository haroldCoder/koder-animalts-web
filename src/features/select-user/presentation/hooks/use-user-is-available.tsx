import { UserRole } from "@/features/user";
import { useGetUser } from "@/features/user/application/queries"
import { useMemo } from "react"

export const useUserAvailable = (userId: string) => {
    const { data: user, isLoading } = useGetUser(userId);

    const userAvailable = useMemo(() => {
        return user?.role != UserRole.veterinary && user?.role != UserRole.owner;
    }, [user])

    return {
        userAvailable,
        loading: isLoading
    }
}