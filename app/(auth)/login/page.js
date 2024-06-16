'use server';

import LoginForm from '@/components/auth/login/LoginForm';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';

const LoginPage = () => {
    return (
        <div className=" flex justify-center items-center w-full">
            <div className="mx-10 w-full max-w-lg">
                <div className="border p-10 rounded-lg shadow-sm">
                    <div className=" text-center">
                        <div className=" bg-gray-950 inline-block text-gray-100 rounded-lg p-3">
                            <DocumentTextIcon className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
                        <h2 className="text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900 text-balance">
                            Sign in to your account
                        </h2>
                        <p className="text-center text-gray-500 text-balance">
                            Enter your details to continue
                        </p>
                    </div>
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </div>
                <div className="text-center text-slate-500 mt-5">
                    Don&apos;t have an account?{' '}
                    <Link className="text-slate-900" href={'/register'}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
