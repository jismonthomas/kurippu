'use server';

import { createClient } from '@/utils/supabase/server';

const login = async (formData) => {
    const supabase = createClient();
    const data = {
        email: formData.email,
        password: formData.password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log('login error name', error.name);
        console.log('login error message', error.message);

        return error.name === 'AuthApiError'
            ? error.message
            : 'Sorry, something went wrong, please try again later';
    }

    return;
};

export default login;
