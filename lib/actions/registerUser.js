'use server';

import { headers } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

const registerUser = async (formData) => {
    try {
        const supabase = createClient();

        const origin = headers().get('origin');
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                },
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            throw new Error(error.code);
        }

        return {
            message: 'success',
        };
    } catch (error) {
        console.log('register user error', error.message);
        switch (error.message) {
            case 'user_already_exists':
                return {
                    error: 'You already have an account with this email address, please login to your account or reset password',
                };
            default:
                return {
                    error: 'Sorry, something went wrong, please try again later!',
                };
        }
    }
};

export default registerUser;
