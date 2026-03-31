import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Don't redirect while auth is still resolving
    if (loading) return null;

    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to='/login' replace />;
    }

    return children;
}