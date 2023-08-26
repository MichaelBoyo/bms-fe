import UserLayout from '@/components/layouts/UserLayout'
import { useGetServicesQuery } from '@/services/services';
import Link from 'next/link';
import React, { useState } from 'react';

const Services = () => {

  const [page, setPage] = useState<number>(0);

  const { data: services } = useGetServicesQuery({
    page,
    size: 5, // Show 5 services per page
  });

  console.log(services)

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <UserLayout>
      <div className="mb-20">
        <p className="pb-6 text-2xl font-semibold text-gray-500 uppercase">Services</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {services?.content.map((service) => (
            <div className="card bg-base-200 shadow-xl transition-transform transform hover:scale-105 duration-200" key={service.name}>
              <figure><img src={service.imageUrl} className='w-full h-64 object-cover' alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p className='break-words'>{service.description}</p>
                <div className="flex justify-end mt-4">
                  <Link href={`/user/services/serviceDetails/${service.serviceId}`} className="btn btn-outline btn-md px-10">View More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          {page > 0 && (
            <button className="btn btn-primary mr-4" onClick={handlePrevPage}>
              Back
            </button>
          )}
          {(services?.totalPages ?? 0) > page + 1 && (
            <button className="btn btn-primary" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </UserLayout>
  )
}

export default Services