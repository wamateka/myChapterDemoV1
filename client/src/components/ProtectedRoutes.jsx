import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children, requireAdmin = false }) {
    const { user, isAdmin, loadingUser } = useAuth();
    if (loadingUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    // if (requireAdmin && !isAdmin) {
    //     return <Navigate to="/dashboard" replace />
    // }


    return  children
}

export default ProtectedRoutes
