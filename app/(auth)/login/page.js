"use server";

import Link from "next/link";
import { Suspense } from "react";

import LoginForm from "@/components/auth/login/LoginForm";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-10 w-full max-w-lg">
        <div className="rounded-lg border p-10 shadow-sm">
          <div className="text-center">
            <div className="inline-block rounded-lg bg-gray-950 p-3 text-gray-100">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-balance text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-balance text-center text-gray-500">
              Enter your details to continue
            </p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <div className="mt-5 text-center text-slate-500">
          Don&apos;t have an account?{" "}
          <Link className="text-slate-900" href={"/register"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
