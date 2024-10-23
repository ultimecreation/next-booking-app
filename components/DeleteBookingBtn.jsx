'use client'


import cancelBooking from "@/app/actions/cancelBooking";
import { toast } from "react-toastify";

const DeleteBookingBtn = ({ bookingId }) => {
    console.log("TEST", bookingId)
    const handleClick = async () => {
        const confirmed = window.confirm("You want to delete this booking ?")
        if (confirmed) {
            try {
                await cancelBooking(bookingId)
                toast.success("Booking deleted")

            } catch (error) {
                console.log("Failed to delete booking", error)
                toast.error("Failed to delete booking")
            }
        }
    }
    return (

        <button
            onClick={handleClick}
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
        >
            Cancel Booking
        </button>

    );
}

export default DeleteBookingBtn;