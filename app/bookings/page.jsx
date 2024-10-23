import Heading from "@/components/Heading";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";

const BookingsPage = async () => {
    const bookings = await getMyBookings()

    return (
        <>
            <Heading title="My Bookings" />
            {bookings.length === 0
                ? (
                    <p className="text-gray-600 mt-4">No bookings to display</p>
                )
                : (bookings.map(booking => <BookedRoomCard booking={booking} key={booking.$id} />)


                )}
        </>
    );
}

export default BookingsPage;