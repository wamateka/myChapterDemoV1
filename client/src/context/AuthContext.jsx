import { createContext, useState, useEffect, useContext } from 'react'
import api from '../api'
import { Children } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser]= useState(false);
    const [logingUser, setLoginguser] = useState(false);

    useEffect(() => {
        setLoadingUser(true)
        api.get('/auth/me', {withCredentials: true})
            .then(res => setUser(res.data))
            .then(setLoadingUser(false))
            .catch(() => setUser(null))
    }, [])

    const checkMe = async() => {
        setLoadingUser(true)
        const res = await api.get('auth/me', {withCredentials: true})
        setUser(res.data)
        setLoadingUser(false)
    }

    const login = async (email, password) => {
        setLoginguser(true)
        try{
        const res = await api.post('/auth/login', {email,password})
        setUser(res.data.user);
        // checkMe()
        toast.success('logged in succesfully');
        }catch(err){
            console.log('error logging user: ', err);
            toast.error(err.response.data.message)
        }finally{
            setLoginguser(false)
        }
    }
    
    const logout = async () =>{
        setLoadingUser(true)
        await api.post('auth/logout')
        setUser(null);
        setLoadingUser(false)
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
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);