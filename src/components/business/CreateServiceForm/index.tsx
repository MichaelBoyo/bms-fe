// Import necessary modules and components
import { useCreateServiceMutation } from '@/services/services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';
import { CreateServiceRequest } from '@/types/services/service';
import Image from 'next/image';
import { AiOutlineCloudUpload } from 'react-icons/ai';

// Define the props interface for CreateServiceForm component
interface CreateServiceFormProps {
    closeModal: () => void; // Define the type of closeModal prop as a function that takes no arguments and returns void
}

// Define the CreateServiceForm component
const CreateServiceForm: React.FC<CreateServiceFormProps> = ({ closeModal }) => {
    const [imageURL, setImageURL] = useState<string | null>(null);

    // Set up form handling using react-hook-form library
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<CreateServiceRequest>();

    // Function to handle the image upload and update the form value and imageURL state
    const handleUpload = (result: any) => {
        setValue('imageUrl', result.info.secure_url, {
            shouldValidate: true
        });
        setImageURL(result.info.secure_url);
    }

    // Perform the createService mutation using the custom hook useCreateServiceMutation
    const [createService, { isLoading }] = useCreateServiceMutation();

    // Define the form submission handler
    const onSubmit: SubmitHandler<CreateServiceRequest> = async (payload) => {
        try {
            // Prepare the payload for service creation
            const body = {
                imageUrl: payload.imageUrl!,
                name: payload.name,
                description: payload.description,
            };

            // Call the createService mutation and handle success
            const result = await createService(body)
            closeModal(); // Close the modal after service creation
            toast.success("Service created successfully"); // Show success toast
        } catch (err: any) {
            // Handle errors and show error toast
            toast.error(err.data.message);
            console.log(err);
        }
    };

    // Render the service creation form
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Name input field */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-400">Service Name</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered"
                    {...register('name', { required: true })}
                />
                {errors.name && <span className='text-xs text-red-500 mt-2'>This field is required</span>}
            </div>

            {/* Service Description textarea */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-400">Service Description</span>
                </label>
                <textarea className="textarea textarea-bordered h-24"
                    {...register('description', { required: true })}
                ></textarea>
                {errors.description && <span className='text-xs text-red-500 mt-2'>This field is required</span>}
            </div>

            <div className="">
                <label className="label">
                    <span className="label-text text-gray-400">Image</span>
                </label>
                {/* Image upload field */}
                <div className="border border-dashed border-gray-400 rounded-lg p-5 flex items-center justify-center">
                {/* Display selected image */}
                    {imageURL ? (
                        <div className="rounded-lg w-full relative h-64">
                            <Image src={imageURL} alt="Selected Image" fill />
                        </div>
                    ) : (
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="wfkpe9zf"
                        >

                            <div className="text-gray-400 hover:text-white">
                                <div className="flex items-center justify-center">
                                    <AiOutlineCloudUpload className='w-8 h-8' />
                                </div>
                                <p className='text-sm'>Select image</p>
                            </div>
                        </CldUploadButton>
                    )}
                </div>
            </div>

            {/* Submit button */}
            <div className="form-control mt-6">
                <button
                    className="btn btn-success btn-outline"
                    type="submit"
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
    )
}

export default CreateServiceForm;
