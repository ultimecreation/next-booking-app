'use server'

import { createAdminClient } from "@/config/appwrite"
import checkAuth from "./checkAuth"
import { ID } from "node-appwrite"
import { revalidatePath } from "next/cache"

export default async function createRoom(prevState, formData) {

    const { databases, storage } = await createAdminClient()

    try {
        const { user } = await checkAuth()
        if (!user) return { error: "Auth required to create a room" }


        let imgId;
        const image = formData.get('image')
        if (image && image.size > 0 && image.name !== 'undefined') {
            try {
                const response = await storage.createFile('rooms', ID.unique(), image)
                imgId = response.$id
            } catch (error) {
                console.log("Error while uploading img")
                return { error: "Upload failed" }
            }
        }

        const newRoom = await databases.createDocument('BookingAppDb', 'rooms', ID.unique(), {
            user_id: user.id,
            name: formData.get('name'),
            description: formData.get('description'),
            sqft: formData.get('sqft'),
            capacity: formData.get('capacity'),
            price_per_hour: formData.get('price_per_hour'),
            address: formData.get('address'),
            location: formData.get('location'),
            availability: formData.get('availability'),
            amenities: formData.get('amenities'),
            image: imgId,

        })
        revalidatePath('/', 'layout')
        console.log("Room", newRoom)
        return { success: true }
    } catch (error) {
        console.log("Error", error)
        const errorMsg = error.response.message ?? "An unexpected error occured"
        return { error: errorMsg }
    }
}