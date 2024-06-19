"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import login from "@/lib/actions/login";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/LoadingAnimation";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formInitStatus = {
  success: false,
  error: false,
};

export default function LoginForm() {
  const [formState, setFormState] = useState(formInitStatus);
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: "Enter a valid email address",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm = async (formData) => {
    startTransition(async () => {
      const callBackUrl = searchParams?.get("callbackURL");
      const url = callBackUrl ? `${callBackUrl}` : "/dashboard"; //redirect to callback or to dashboard

      const response = await login(formData, url);
      // if no reponse, login is valid, response is error
      if (response) {
        setFormState((state) => ({
          ...state,
          error: response,
        }));
      }
    });
  };

  return (
    <div className="mt-10 text-left">
      {formState.error ? (
        <Alert
          className="mb-5 bg-destructive text-red-50"
          variant="destructive"
        >
          <ExclamationCircleIcon className="h-4 w-4 fill-red-50" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{formState.error}</AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Email Address"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setShowPassword((state) => !state)}
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-70 hover:bg-transparent hover:opacity-100"
                  >
                    {!showPassword ? (
                      <EyeIcon className="h-6 w-6 stroke-foreground" />
                    ) : (
                      <EyeSlashIcon className="h-6 w-6 stroke-foreground" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="relative w-full">
            <span
              className={cn("opacity-100", {
                "opacity-0": isPending,
              })}
            >
              Sign in
            </span>
            <LoadingAnimation
              className={cn(
                `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0`,
                {
                  "opacity-100": isPending,
                },
              )}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
