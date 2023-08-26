import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useGetServicesOfBusinessQuery } from "@/services/services";

// Custom Components
import BusinessLayout from "@/components/layouts/BusinessLayout";
import CreateServiceForm from "@/components/business/CreateServiceForm";
import Modal from "@/components/global/Modal";

import { useSession } from "next-auth/react";

const BusinessHome = () => {
  const session = useSession();
  // State for controlling the modal visibility and current page
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  // Fetching services using a custom GraphQL query hook
  const { data } = useGetServicesOfBusinessQuery({
    userId: session?.data?.user.userId!,
    page,
    size: 7, // Show 5 services per page
  });

  useEffect(() => {
    console.log("services", data);
  }, [data]);

  // Function to handle moving to the next page
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to handle moving to the previous page
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <BusinessLayout>
      <div className="mb-20">
        {/* Services Header */}
        <div className="flex items-center justify-between mb-10">
          <p className="text-2xl font-semibold text-gray-500 uppercase">
            Explore Our Services
          </p>
          {/* Button to open the modal for adding a new service */}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlus />
            Add Service
          </button>
        </div>

        {/* Grid displaying services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {data?.content.map((service) => (
            <div
              className="card bg-base-200 shadow-xl transition-transform transform hover:scale-105 duration-200"
              key={service.serviceId}
            >
              <figure>
                <img
                  src={service.imageUrl}
                  className="w-full h-64 object-cover"
                  alt="Service"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p className="break-words">{service.description}</p>
                <div className="flex justify-end mt-4">
                  {/* Button to view bookings for a service */}
                  <Link
                    href={`/business/users/${service.serviceId}`}
                    className="btn btn-outline border-neutral hover:text-white transition duration-150 hover:bg-neutral"
                  >
                    View Bookings
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end space-x-3">
          {page > 0 && (
            <button
              className="btn btn-primary bg-neutral mr-4"
              onClick={handlePrevPage}
            >
              Back
            </button>
          )}
          {(data?.totalPages ?? 0) > page + 1 && (
            <button className="btn btn-primary" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
      </div>

      {/* Modal for adding a new service */}
      <Modal
        show={showModal}
        allowClose={true}
        onRequestClose={() => setShowModal(false)}
      >
        <CreateServiceForm closeModal={() => setShowModal(false)} />
      </Modal>
    </BusinessLayout>
  );
};

export default BusinessHome;
