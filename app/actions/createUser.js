'use server'

import { createAdminClient } from "@/config/appwrite"
import { ID } from "node-appwrite"

export default async function createUser(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')
    if (!name || !email || !password || !confirmPassword) {
        return { error: "Fillin all fields" }
    }

    if (password !== confirmPassword) return { error: "passwords do not match" }

    const { account } = await createAdminClient()

    try {
        await account.create(ID.unique(), email, password, name)
        return { success: true }
    } catch (error) {
        console.log("Registration error : " + error)
        return { error: "Cannot register user" }
    }
}