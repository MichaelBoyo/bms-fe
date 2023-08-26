import { useState } from 'react';
import { Layout } from '@/components/Layout';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { LoginRequest } from '@/types/services/auth';
import Link from 'next/link';
import Input from '@/components/global/Input';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {
        formState: { errors, isValid },
        handleSubmit,
    } = methods

    const { data: session } = useSession()

    /* Handle submit */
    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false, // Prevent automatic redirection
                ...data,
            });

            if (result?.error) {
                console.log('Login failed:', result.error);
                toast.error("Something went wrong, please check your credentials and try again");
            } else {
                if (session?.user?.role === 'USER') {
                    router.push('/user/services');
                } else if (session?.user?.role === 'BUSINESS') {
                    router.push('/business/services');
                }
                toast.success('Login Successful');
            }

        } catch (err) {
            console.log('Login error:', err);
            toast.error('Login failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
                <meta name="description" content="Login to your booksy account" />
            </Head>
            <Layout>
                <div className="h-screen flex items-center justify-center">
                    <div className="">
                        <div className="text-center text-gray-500">
                            <h1 className="text-5xl font-bold">Login</h1>
                            <p className="py-6 text-lg">Login to your account</p>
                        </div>
                        <div className="w-full lg:min-w-[30rem] p-10 shadow-2xl rounded-lg bg-base-100">
                            <FormProvider {...methods}>
                                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                                    <Input
                                        name='email'
                                        label='Email address'
                                        rules={["email", "required"]}
                                        type='email'
                                    />
                                    <Input
                                        name='password'
                                        label='Password'
                                        rules={["required"]}
                                        type='password'
                                    />
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                                            {loading ? 'Loading...' : 'Login'}
                                        </button>
                                    </div>
                                    <p className="my-3 text-sm text-center">
                                        No account?
                                        <Link href="/SignUp" className='ml-1 link link-hover text-primary'>Create one</Link>
                                    </p>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Login;
