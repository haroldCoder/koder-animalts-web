import { useAuth } from './common/hooks'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/Auth" replace />;
    }

    return <Outlet />;
}