import { createContext, useState, useEffect, useContext } from 'react'
import api from '../api'
import { Children } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLaodingUser]= useState(false);
    const [logingUser, setLoginguser] = useState(false);

    useEffect(() => {
        setLaodingUser(true)
        api.get('/auth/me')
            .then(res => setUser(res.data))
            .then(setLaodingUser(false))
            .catch(() => setUser(null))
    }, [])

    const checkMe = async() => {
        setLaodingUser(true)
        const res = await api.get('auth/me')
        setUser(res.data)
        setLaodingUser(false)
    }

    const login = async (email, password) => {
        setLoginguser(true)
        await api.post('/auth/login', {email,password})
        checkMe()
        setLoginguser(false)
    }
    
    const logout = async () =>{
        setLaodingUser(true)
        await api.post('auth/logout')
        setUser(null);
        setLaodingUser(false)
    }
    const value = {
        user,
        login,
        logout,
        checkMe,
        loadingUser,
        logingUser,
        isAdmin: user?.role === 'admin'
    }
    return(
        <AuthContext.Provider value={{user, login, logout, checkMe}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);