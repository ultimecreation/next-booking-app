'use client'

import deleteRoomById from "@/app/actions/deleteRoom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const DeleteRoomBtn = ({ roomId }) => {

    const handleClick = async () => {
        const confirmed = window.confirm("You want to delete thois room?")
        if (confirmed) {
            try {
                await deleteRoomById(roomId)
                toast.success("Room deleted")
            } catch (error) {
                console.log("Failed to delete room", error)
                toast.error("Failed to delete room")
            }
        }
    }
    return (

        <button
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
            onClick={handleClick}
        >
            <FaTrash className="inline mr-1" /> Delete
        </button>

    );
}

export default DeleteRoomBtn;