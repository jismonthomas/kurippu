'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    AtSymbolIcon,
    KeyIcon,
    ArrowRightIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import {
    ExclamationCircleIcon,
    EyeDropperIcon,
} from '@heroicons/react/24/solid';

import login from '@/lib/actions/login';
import {
    useRouter,
    usePathname,
    useSearchParams,
    redirect,
} from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cn } from '@/lib/utils';
import LoadingAnimation from '@/components/LoadingAnimation';

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
            message: 'Enter a valid email address',
        }),
        password: z.string().min(4, {
            message: 'Password must be at least 4 characters.',
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const submitForm = async (formData) => {
        startTransition(async () => {
            const response = await login(formData);
            // if no reponse, login is valid
            if (!response) {
                setFormState((state) => ({
                    ...state,
                    success: true,
                }));
                const callBackUrl = searchParams?.get('callbackURL');
                const allSearchParams = Array.from(searchParams.entries());
                const newSearchParams = new URLSearchParams(
                    allSearchParams.slice(1)
                ); //all search params except the first one, ie, callback url
                const search = newSearchParams.toString();
                const query = search ? `?${search}` : '';

                const url = callBackUrl
                    ? `${callBackUrl}${query}`
                    : '/dashboard'; //redirect to callback with all the search params received or to dashboard
                console.log(' url to redirect', url);
                router.push(url);
            } else {
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
                    variant="destructive">
                    <ExclamationCircleIcon className="h-4 w-4 fill-red-50" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{formState.error}</AlertDescription>
                </Alert>
            ) : null}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
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
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((state) => !state)
                                        }
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 hover:bg-transparent">
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

                    <Button type="submit" className="w-full relative">
                        <span
                            className={cn('opacity-100', {
                                'opacity-0': isPending,
                            })}>
                            Sign in
                        </span>
                        <LoadingAnimation
                            className={cn(
                                `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0`,
                                {
                                    'opacity-100': isPending,
                                }
                            )}
                        />
                    </Button>
                </form>
            </Form>
        </div>
    );
}
