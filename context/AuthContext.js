import checkAuth from "@/app/actions/checkAuth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState()
    const [currentUser, setCurrentUser] = useState(false)

    useEffect(() => {
        const checkAuthentication = async () => {
            const { isAuthenticated, user } = await checkAuth()
            setIsAuthenticated(isAuthenticated)
            setCurrentUser(user)
        }
        checkAuthentication()

    }, [])
    return <AuthContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser
    }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an auth provider')
    return context
}