'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const changeTodoStatus = async (todo) => {
    try {
        const supabase = createClient();

        const response = await supabase
            .from('todos')
            .update({
                completed: todo.completed,
            })
            .eq('todo_id', todo.todo_id);

        revalidatePath('/dashboard');

        if (response.error) {
            throw new Error(
                'Sorry, we could not complete your action at the moment.'
            );
        }
        return;
    } catch (error) {
        return {
            error: error.message,
        };
    }
};

export default changeTodoStatus;
