import BusinessLayout from "@/components/layouts/BusinessLayout";
import {
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useGetBookingsforAServiceQuery,
  useGetServiceOfferingByIdQuery,
} from "@/services/services";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { BookingActionRequest } from "@/types/services/service";
import { useSession } from "next-auth/react";

const BookedUsers = () => {
  // Fetching data using useGetServicesQuery hook
  //   const { data: services } = useGetServicesQuery({
  //     page: 0,
  //     size: 9,
  //   });

  const session = useSession();

  const [cancelBooking] = useCancelBookingMutation();
  const [confirmBooking] = useConfirmBookingMutation();

  // Get the "id" from the router query
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: bookings } = useGetBookingsforAServiceQuery({
    id,
    page: 0,
    size: 7,
  });
  console.log("bookings", bookings);

  const { data: service } = useGetServiceOfferingByIdQuery(id);
  // Find the service based on the "id" from the fetched data

  console.log(service);

  // Function to handle the actions (accept or cancel booking)
  const handleConfirmBooking = async (userEmail: string) => {
    const body: BookingActionRequest = {
      serviceId: service?.serviceId!,
      userEmail,
    };

    try {
      const response = await confirmBooking(body);
      toast.success("Booking confirmed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleCancelBooking = async (userEmail: string) => {
    const body: BookingActionRequest = {
      serviceId: service?.serviceId!,
      userEmail,
    };

    try {
      const response = await cancelBooking(body);
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  // Function to format the date using date-fns
  const formatBookingDate = (dateArray: number[]) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 7) {
      return "Invalid date"; // Return an error message if the dateArray is not valid
    }

    const [year, month, day, hours, minutes, seconds, milliseconds] = dateArray;
    const date = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );
    return format(date, "dd/MM/yyyy, hh:mm:ss a"); // Format the date to a human-readable string
  };

  return (
    <BusinessLayout>
      {/* Back Button */}
      <button
        className="btn btn-outline flex items-center space-x-3 text-lg mb-5"
        onClick={() => router.back()}
      >
        <BsFillArrowLeftCircleFill />
        <p>Back</p>
      </button>
      {/* Display service name in a heading */}
      <p className="py-6 text-2xl font-semibold text-gray-500 uppercase">{`Users who booked ${service?.name}`}</p>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr>
              <th>S/N</th>
              <th>User Email</th>
              <th>Booking Status</th>
              <th>Booking Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if service data is available */}
            {bookings ? (
              // If there are no users who have booked the service, display a message
              bookings.length === 0 ? (
                <tr>
                  <td colSpan={4}>No users have booked this service yet.</td>
                </tr>
              ) : (
                // If there are booked users, display their data
                //@ts-ignore
                bookings?.content.map((user, index) => (
                  <tr key={user.bookingId} className="hover">
                    <td>{index + 1}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.bookingStatus}</td>
                    <td>{user.bookingDate}</td>{" "}
                    {/* Format the date using date-fns here */}
                    <td>
                      {/* Buttons for accepting and canceling bookings */}
                      {user.bookingStatus === "PENDING" ? (
                        <div className="flex items-center space-x-3">
                          <button
                            className="btn btn-outline btn-success btn-sm"
                            onClick={() => handleConfirmBooking(user.userEmail)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-outline btn-error btn-sm"
                            onClick={() => handleCancelBooking(user.userEmail)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        "N/A" // Show "N/A" if the booking status is not "PENDING"
                      )}
                    </td>
                  </tr>
                ))
              )
            ) : (
              // If no service data is available, show "Service not found." message
              <tr>
                <td colSpan={4}>Service not found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </BusinessLayout>
  );
};

export default BookedUsers;
