'use server'

import { createSessionClient } from '@/config/appwrite'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Query } from 'node-appwrite'

export default async function deleteRoomById(roomId) {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return redirect('/login')

    try {
        const { account, databases } = await createSessionClient(sessionCookie.value)

        const user = await account.get()
        const userId = user.$id

        const { documents: rooms } = await databases.listDocuments(
            'BookingAppDb',
            'rooms',
            [Query.equal('user_id', userId)]
        )

        const roomToDelete = rooms.find(room => room.$id === roomId)
        if (!roomToDelete) return { error: "Room not found" }
        await databases.deleteDocument('BookingAppDb',
            'rooms',
            roomToDelete.$id)
        revalidatePath('/rooms/my', 'layout')
        revalidatePath('/', 'layout')

        return { success: true }

    } catch (error) {
        console.log('Failed to delete room', error)
        return { error: "Failed to delete room" }
    }
}