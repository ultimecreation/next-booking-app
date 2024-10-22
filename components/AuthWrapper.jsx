'use client'

import { AuthContextProvider } from "@/context/AuthContext";

const AuthWrapper = ({ children }) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
}

export default AuthWrapper;