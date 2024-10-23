'use server'

import { createSessionClient } from '@/config/appwrite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Query } from 'node-appwrite'
import checkAuth from './checkAuth'

export default async function getMyBookings() {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return redirect('/login')

    try {
        const { databases } = await createSessionClient(sessionCookie.value)

        const { user } = await checkAuth()
        if (!user) return { error: "You must be logged to view your bookings" }

        const { documents: bookings } = await databases.listDocuments(
            'BookingAppDb',
            'bookings',
            [Query.equal('user_id', user.id)]
        )
        return bookings
    } catch (error) {
        console.log('Failed to fetch bookings', error)
        return { error: "Failed to get bookings" }
    }
}