import UserLayout from '@/components/layouts/UserLayout'
import { useGetBookedServicesQuery } from '@/services/services';
import { GetBookedServicesResponse } from '@/types/services/service';
import { useSession } from 'next-auth/react';

const Bookings = () => {
    const session = useSession()
    const userEmail = session.data?.user.email

    const { data: bookedServices } = useGetBookedServicesQuery({
        page: 0,
        size: 20,
        userEmail: userEmail!
    });

    console.log(bookedServices)

    const formatDate = (bookingDate: number[]) => {
        if (!bookingDate || typeof bookingDate !== 'number') {
            // Handle the case when bookingDate is not available or is not a number
            return <div>Invalid date</div>;
        }

        // Create a new Date object using the Unix timestamp (in milliseconds)
        const date = new Date(bookingDate);

        // Format the date to a human-readable string
        const formattedDate = date.toLocaleString();

        return <div>{formattedDate}</div>;
    };

    return (
        <UserLayout>
            <div className="mb-20">
                <p className="pb-6 text-2xl font-semibold text-gray-500 uppercase">Bookings</p>
                <div className="overflow-x-auto">
                    <table className="table table-lg">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Booking Status</th>
                                <th>Booking Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Check if service data is available */}
                            {bookedServices ? (
                                // If there are no users who have booked the service, display a message
                                bookedServices?.content?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4}>No booking avaliable.</td>
                                    </tr>
                                ) : (
                                    // If there are booked users, display their data
                                    bookedServices?.content?.map((booking, index) => (
                                        <tr key={booking.bookingId} className="hover">
                                            <td>{index + 1}</td>
                                            <td>{booking.bookingStatus}</td>
                                            <td>{booking.bookingDate}</td>
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
            </div>
        </UserLayout>
    )
}

export default Bookings