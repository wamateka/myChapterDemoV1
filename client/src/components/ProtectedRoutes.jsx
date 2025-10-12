import React, {useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children, requireAdmin = false }) {
    const { user, isAdmin, loadingUser, logingUser, changeUserState} = useAuth();
    const navigate = useNavigate()
    if (loadingUser || logingUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        )
    }

    if (!user) {
        console.log(loadingUser)
        console.log(logingUser)
        console.log("no user");
        return <Navigate to="/login" replace />
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />
    }


    return  children
}

export default ProtectedRoutes
