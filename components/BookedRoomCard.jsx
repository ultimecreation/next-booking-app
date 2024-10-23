
import Link from "next/link";
import DeleteBookingBtn from "./DeleteBookingBtn";

const BookedRoomCard = ({ booking }) => {
    const checkInDateTime = new Date(booking.check_in)
    const checkOutDateTime = new Date(booking.check_out)
    return (
        <div
            className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
            <div>
                <h4 className="text-lg font-semibold">{booking.room_id.name} </h4>
                <p className="text-sm text-gray-600">
                    <strong>Check In: </strong>{checkInDateTime.toLocaleDateString(
                        'fr-FR',
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: "numeric"
                        }
                    )}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Check Out: </strong>{checkOutDateTime.toLocaleDateString(
                        'fr-FR',
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: "numeric"
                        }
                    )}
                </p>
            </div>
            <div
                className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
            >
                <Link
                    href={`/rooms/${booking.room_id.$id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
                >
                    View Room
                </Link>
                <DeleteBookingBtn bookingId={booking.$id} />
            </div>
        </div>
    );
}

export default BookedRoomCard;