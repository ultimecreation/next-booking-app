'use server'

import { createSessionClient } from '@/config/appwrite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import checkAuth from './checkAuth'
import { revalidatePath } from 'next/cache'

export default async function cancelBooking(bookingId) {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return redirect('/login')

    try {
        const { databases } = await createSessionClient(sessionCookie.value)

        const user = await checkAuth()
        if (!user) return { error: "You must be logged in" }

        const booking = await databases.getDocument(
            'BookingAppDb',
            'bookings',
            bookingId
        )

        if (booking.user_id.$id !== user.id) return { error: "You're not authorized to delete this booking" }

        await databases.deleteDocument(
            'BookingAppDb',
            'bookings',
            bookingId
        )
        revalidatePath('/bookings', 'layout')
        return { success: true }
    } catch (error) {
        console.log('Failed to delete the booking', error)
        return { error: "Failed to delete the booking" }
    }
}