'use server'

import { createSessionClient } from '@/config/appwrite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import checkAuth from './checkAuth'
import { ID } from 'node-appwrite'
import { revalidatePath } from 'next/cache'
import checkRoomAvailablity from './checkRoomAvailability'

export default async function bookRoom(prevState, formData) {
    const sessionCookie = cookies().get('appwrite-session')
    const roomId = formData.get('room_id')
    if (!sessionCookie) return redirect('/login')

    try {
        const { databases } = await createSessionClient(sessionCookie.value)

        const { user } = await checkAuth()
        if (!user) return { error: "You must be logged in to book a room" }


        const checkInDate = formData.get('check_in_date')
        const checkInTime = formData.get('check_in_time')

        const checkOutDate = formData.get('check_out_date')
        const checkOutTime = formData.get('check_out_time')

        const checkInDateTime = `${checkInDate}T${checkInTime}`
        const checkOutDateTime = `${checkOutDate}T${checkOutTime}`
        //check for room availability
        const isAvailable = await checkRoomAvailablity(roomId, checkInDateTime, checkOutDateTime)
        if (!isAvailable) return { error: "Room already booked for the selected time" }

        const bookingData = {
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
            user_id: user.id,
            room_id: formData.get('room_id')
        }

        const newBooking = await databases.createDocument(
            'BookingAppDb',
            'bookings',
            ID.unique(),
            bookingData
        )
        revalidatePath('/bookings', 'layout')
        return { success: true }

    } catch (error) {
        console.log('Failed to book room', error)
        return { error: "Failed to book a room" }
    }
}