// Import necessary modules and components
import Input from '@/components/global/Input';
import { useBusinessSignupMutation } from '@/services/auth';
import { BusinessSignUpRequest } from '@/types/services/auth';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// Define the BusinessSignUpForm component
const BusinessSignUpForm = () => {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            name: "",
            email: "",
            description: "",
            password: "",
            industry: "empty"
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    const router = useRouter();

    // Perform the sign-up mutation using the custom hook useBusinessSignupMutation
    const [signUp, { isLoading }] = useBusinessSignupMutation();

    // Define the form submission handler
    const onSubmit: SubmitHandler<BusinessSignUpRequest> = async (payload) => {
        // Prepare the payload for sign-up
        const body = {
            email: payload.email,
            firstName: payload.firstName,
            name: payload.name,
            password: payload.password,
            description: payload.description,
            industry: payload.industry,
        };

        try {
            // Call the sign-up mutation and handle success
            const result = await signUp(body);
            toast.success("Account created successfully"); // Show success toast
            router.push("/Login"); // Redirect to the login page
        } catch (err) {
            // Handle errors and show error toast
            console.log(err);
            toast.error("Something went wrong, please try again");
        }
    };

    // Render the sign-up form
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Name input field */}
                <Input
                    focused
                    name='name'
                    label='Business name'
                    rules={["required"]}
                    className='w-full'
                />

                {/* Business Description textarea */}
                <Input
                    focused
                    name='description'
                    tag='textarea'
                    label='Business description'
                    rules={["required"]}
                    className='w-full p-3'
                />

                {/* Business Email and Business Owner's Name input fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name='email'
                        label='Email address'
                        rules={["email", "required"]}
                        type='email'
                    />
                    <Input
                        name='firstName'
                        label='Full Name'
                        rules={["required"]}
                        className='w-full'
                    />
                </div>

                {/* Password input field */}
                <Input
                    name='password'
                    label='Password'
                    rules={["password", "required"]}
                    type='password'
                />

                {/* Submit button */}
                <div className="form-control mt-6">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default BusinessSignUpForm;
