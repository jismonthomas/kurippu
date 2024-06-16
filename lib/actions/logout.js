'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
        redirect('/login');
    }
};

export default logout;
