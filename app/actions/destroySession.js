'use server'

import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"

export default async function destroySession(prevState, formData) {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return { error: "No cookie found" }
    try {
        const { account } = await createSessionClient(sessionCookie.value)
        await account.deleteSession('current')
        cookies().delete('appwrite-session')
        return { success: true }

    } catch (error) {

        return { error: "Error deleting the session" }
    }

}

