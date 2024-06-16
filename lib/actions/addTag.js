'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const addTag = async (name) => {
    try {
        const supabase = createClient();

        const userData = await supabase.auth.getUser();
        const { user } = userData.data;

        const response = await supabase
            .from('tags')
            .insert({
                tag_name: name,
                user_id: user.id,
            })
            .select('tag_id, tag_name');

        revalidatePath('/dashboard');

        if (response.error) {
            throw new Error('Sorry, we could not save your tag at the moment.');
        }
        return;
    } catch (error) {
        return {
            error: error.message,
        };
    }
};

export default addTag;
