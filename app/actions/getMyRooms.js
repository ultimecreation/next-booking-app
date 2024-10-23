'use server'

import { createAdminClient, createSessionClient } from '@/config/appwrite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Query } from 'node-appwrite'

export default async function getMyRooms() {
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
        return rooms
    } catch (error) {
        console.log('Failed to fetch rooms', error)
        redirect('/error')
    }
}