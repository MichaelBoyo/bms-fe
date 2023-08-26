// Import necessary modules and components
import Input from '@/components/global/Input';
import { useSignupMutation } from '@/services/auth';
import { SignupRequest } from '@/types/services/auth';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// Define the UserSignUpForm component
const UserSignUpForm = () => {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    const router = useRouter();

    // Perform the sign-up mutation using the custom hook useSignupMutation
    const [signUp, { isLoading }] = useSignupMutation();

    // Define the form submission handler
    const onSubmit: SubmitHandler<SignupRequest> = async (payload) => {
        try {
            // Prepare the payload for sign-up
            const body = {
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                password: payload.password,
                confirmPassword: payload.confirmPassword,
                phoneNumber: payload.phoneNumber,
            };
            // Call the sign-up mutation and handle success
            const result = await signUp(body);
            // Redirect to the login page and show success toast
            router.push("/Login");
            toast.success("Account created successfully");
        } catch (err) {
            // Handle errors by logging them
            console.log(err);
        }
    };

    // Render the sign-up form
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name and Last Name input fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        focused
                        name='firstName'
                        label='First name'
                        rules={["required"]}
                        className='w-full'
                    />
                    <Input
                        focused
                        name='lastName'
                        label='Last name'
                        rules={["required"]}
                        className='w-full'
                    />
                </div>

                {/* Email input field */}
                <Input
                    name='email'
                    label='Email address'
                    rules={["email", "required"]}
                    type='email'
                />

                {/* Phone Number input field */}
                <Input
                    focused
                    name='phoneNumber'
                    label='Phone number'
                    rules={["required"]}
                    className='w-full'
                />

                {/* Password and Confirm Password input fields */}
                <Input
                    name='password'
                    label='Password'
                    rules={["password", "required"]}
                    type='password'
                />
                <Input
                    name='confirmPassword'
                    label='Confirm password'
                    rules={["confirmPassword", "required"]}
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

export default UserSignUpForm;
