'use server'

import { createAdminClient } from '@/config/appwrite'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function getAllRooms() {
    try {
        const { databases } = await createAdminClient()
        const { documents: rooms } = await databases.listDocuments('BookingAppDb', 'rooms')
        revalidatePath('/', 'layout')
        return rooms
    } catch (error) {
        console.log('Failed to fetch rooms', error)
        redirect('/error')
    }
}