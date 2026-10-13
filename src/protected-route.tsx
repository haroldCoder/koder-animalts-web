import { useAuth } from './common/hooks'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/Auth" replace />;
    }

    return <Outlet />;
}