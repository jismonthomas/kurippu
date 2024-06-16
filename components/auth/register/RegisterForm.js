"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import registerUser from "@/lib/actions/registerUser";

import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import LoadingAnimation from "@/components/LoadingAnimation";
import {
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
);

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name",
    }),
    email: z.string().email({
      message: "Enter a valid email address",
    }),
    password: z
      .string()
      .min(4, {
        message: "Password must be at least 4 characters.",
      })
      .regex(passwordValidation, {
        message: "Your password is not valid",
      }),
    confirmPassword: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Please read and accept the terms and conditions",
    }),
  })
  .refine((formValues) => formValues.password === formValues.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const formInitStatus = {
  success: false,
  error: false,
};

export default function RegisterForm({ className }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState({
    ...formInitStatus,
  });

  const defaultFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultFormValues,
    },
  });

  const submitForm = async (formData) => {
    startTransition(async () => {
      const response = await registerUser(formData);

      if (response?.error) {
        setFormStatus(() => ({
          ...formInitStatus,
          error: response.error,
        }));
      } else {
        setFormStatus((status) => ({
          ...formInitStatus,
          success: true,
        }));
        form.reset({ ...defaultFormValues });
      }
    });
  };

  return (
    <div className={className}>
      <div className="rounded-lg border px-7 py-5 shadow-sm lg:px-14 lg:py-10">
        <div className="text-center">
          <div className="inline-block rounded-lg bg-gray-950 p-3 text-gray-100">
            <DocumentTextIcon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-balance text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
          <p className="text-balance text-center text-gray-500">
            Welcome! Please fill in the details to get started
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AnimatePresence>
            {formStatus.error && !isPending ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert className="mb-5 border-red-600 bg-red-700 text-red-50">
                  <XCircleIcon className="h-4 w-4 fill-red-50" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription className="text-xs text-red-200">
                    {formStatus.error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : null}

            {formStatus.success && !isPending ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert className="mb-5 border-green-600 bg-green-700 text-green-50">
                  <CheckCircleIcon className="h-4 w-4 fill-green-50" />
                  <AlertTitle>Registration Complete</AlertTitle>
                  <AlertDescription className="text-xs text-green-200">
                    You are successfully registered, please login to access your
                    account!
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Name"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-start gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="inline-flex items-center gap-x-1">
                        <FormLabel>Password</FormLabel>
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger>
                              <Info className="h-4" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                              <p>
                                Minimum eight characters, at least one upper
                                case letter, one lower case letter, one number
                                and one special character
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="relative">
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="new-password"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 lg:items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to{" "}
                        <Link href={`/`} className="break-words">
                          Terms and Conditions
                        </Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="relative mt-5 w-full bg-gray-950"
                >
                  <span
                    className={cn("opacity-100", {
                      "opacity-0": isPending,
                    })}
                  >
                    Create Account
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

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full border border-gray-950 bg-transparent text-gray-950"
                  asChild
                >
                  <Link href={`/login`}>I have an account</Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
