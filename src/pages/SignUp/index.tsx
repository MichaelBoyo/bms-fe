import { Layout } from '@/components/Layout';
import BusinessSignUpForm from '@/components/auth/BusinessSignupForm';
import UserSignUpForm from '@/components/auth/UserSignupForm';

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';


const SignUp = () => {
    const [activeForm, setActiveForm] = useState('user');

    const setTab = (tab: string) => {
        setActiveForm(tab);
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign Up | Booking system</title>
                <meta name="description" content="Sign up for booksy" />
            </Head>
            <Layout>
                <div className="min-h-screen w-full flex items-center justify-center py-10">
                    <div className="">
                        <p className="py-6 text-center text-xl text-gray-500 font-semibold uppercase">Sign up as</p>
                        <div className="tabs tabs-boxed mb-10 flex items-center justify-center">
                            <a
                                className={`tab tab-lg text-gray-500 ${activeForm === 'user' ? 'tab-active' : ''}`}
                                onClick={() => setTab('user')}
                            >
                                User
                            </a>
                            <a
                                className={`tab tab-lg text-gray-500 ${activeForm === 'businessOwner' ? 'tab-active' : ''}`}
                                onClick={() => setTab('businessOwner')}
                            >
                                Business Owner
                            </a>
                        </div>
                        <div className="min-w-[30rem] p-10 shadow-lg rounded-lg bg-base-100">
                            {activeForm === "user" && (
                                <UserSignUpForm />
                            )}
                            {activeForm === "businessOwner" && (
                                <BusinessSignUpForm />
                            )}
                            <p className="mt-7 text-sm text-center">
                                Already have an account?
                                <Link href="/Login" className='ml-1 link link-hover text-primary'>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SignUp;
