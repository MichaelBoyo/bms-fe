import UserLayout from '@/components/layouts/UserLayout'
import { useBookServiceMutation, useGetServicesQuery } from '@/services/services';
import { BookServiceRequest } from '@/types/services/service';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';

const Services = () => {
    const [loading, setLoading] = useState(false)

    const { data: services } = useGetServicesQuery({
        page: 0,
        size: 9
    });

    const router = useRouter();
    const { id } = router.query as { id: string };

    const service = id ? services?.content.find((service) => service.serviceId === id) : undefined;

    const [bookService] = useBookServiceMutation();

    const handleBookService = async () => {

        if (!service?.serviceId) {
            return null;
        }

        const body: BookServiceRequest = {
            serviceId: service?.serviceId,
        };

        try {
            setLoading(true)
            const response = await bookService(body);
            // console.log(response);
            toast.success("Service booked successfully");

        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Something went wrong, please try again");
        }

        setLoading(false)
    };

    return (
        <UserLayout>
            <button className="btn btn-outline flex items-center space-x-1 text-lg mb-10" onClick={() => router.back()}>
                <BsArrowLeft />
                <p>Back</p>
            </button>
            <div
                className="hero h-[70vh] rounded-lg"
                style={{ backgroundImage: `url(${service?.imageUrl})` }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">{service?.name}</h1>
                        <p className="mb-5 w-md truncate">
                            {service?.description}
                        </p>
                        <button className="btn btn-primary w-full" onClick={handleBookService} disabled={loading}>
                            {loading ? 'Loading...' : 'Book Now!'}
                        </button>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default Services