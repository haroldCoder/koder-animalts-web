import { useAuth } from "./common/hooks"
import { Navigate } from "react-router-dom"

export const RootRedirect = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/home" replace />
    }

    return (
        <Navigate to="/Auth" replace />
    )
}