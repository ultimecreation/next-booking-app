'use server'

import { createAdminClient } from '@/config/appwrite'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function getSingleRoom(id) {
    try {
        const { databases } = await createAdminClient()
        const room = await databases.getDocument('BookingAppDb', 'rooms', id)
        revalidatePath('/', 'layout')
        return room
    } catch (error) {
        console.log('Failed to fetch room', error)
        redirect('/error')
    }
}