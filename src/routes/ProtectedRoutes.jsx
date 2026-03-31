
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Don't redirect while auth is still resolving
    if (loading) return null;

    if (!currentUser) {
        return <Navigate to='/login' replace />;
    }

    return children;
}
