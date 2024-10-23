'use server'

import { createSessionClient } from '@/config/appwrite'
import { DateTime } from 'luxon'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Query } from 'node-appwrite'


function toUtcDatetime(dateString) {
    return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}
function checkForOverlap(checkInA, checkOutA, checkInB, checkOutB) {
    return checkInA < checkOutB && checkOutA > checkInB;
}
export default async function checkRoomAvailablity(roomId, checkIn, checkOut) {
    const sessionCookie = cookies().get('appwrite-session')
    if (!sessionCookie) return redirect('/login')

    try {
        const { databases } = await createSessionClient(sessionCookie.value)
        const { documents: bookings } = await databases.listDocuments(
            'BookingAppDb',
            'bookings',
            [Query.equal('room_id', roomId)]
        )

        const checkInDatetime = toUtcDatetime(checkIn)
        const checkOutDatetime = toUtcDatetime(checkOut)

        for (const booking of bookings) {
            const bookingCheckInDatetime = toUtcDatetime(booking.check_in)
            const bookingCheckOutDatetime = toUtcDatetime(booking.check_out)

            if (checkForOverlap(checkInDatetime, checkOutDatetime, bookingCheckInDatetime, bookingCheckOutDatetime)) return false
        }

        // no overlap
        return true

    } catch (error) {
        console.log('Failed to check availability', error)
        return { error: 'Failed to check availability' }
    }
}