

'use server'

import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"


export default async function checkAuth() {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return { isAuthenticated: false }

    try {
        const { account } = await createSessionClient(sessionCookie.value)
        const user = account.get()
        return {
            isAuthenticated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email
            }
        }
    } catch (error) {
        return {
            isAuthenticated: false
        }
    }
}