'use server'

import { createAdminClient } from "@/config/appwrite"
import { cookies } from "next/headers"

export default async function createSession(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
        return { error: 'Fill all fields' }

    }

    const { account } = await createAdminClient()

    try {
        const session = await account.createEmailPasswordSession(email, password)
        cookies().set("appwrite-session", session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/'
        })
        return { success: true }
    } catch (error) {
        console.log("Auth error : " + error)
        return { error: "Invalid credentials" }
    }

}

