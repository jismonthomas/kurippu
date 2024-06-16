'use server';

import RegisterForm from '@/components/auth/register/RegisterForm';
import Image from 'next/image';

import loginImage from '@/public/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg';

const LoginPage = () => {
    return (
        <div className=" flex justify-center w-full">
            <RegisterForm
                className={`lg:w-2/4 flex items-center justify-center mx-10 `}
            />
            <div className="relative w-2/4 overflow-hidden hidden lg:block">
                <div className=" absolute top-0 left-0 bottom-0 h-full w-full object-cover max-w-[calc(100%-80px)]">
                    <Image
                        priority={true}
                        src={loginImage}
                        alt="white abstract image"
                        className="h-full rounded-md object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
