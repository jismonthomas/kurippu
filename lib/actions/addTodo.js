'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const addTodo = async (formData) => {
    try {
        const supabase = createClient();

        const userData = await supabase.auth.getUser();
        const { user } = userData.data;

        const response = await supabase
            .from('todos')
            .insert({
                heading: formData.heading,
                text: formData.description,
                user_id: user.id,
                due_date: formData.dueDate === '' ? null : formData.dueDate,
            })
            .select('todo_id');

        // revalidate before throwing error if there are no tags
        if (formData.tags.length === 0) {
            revalidatePath('/dashboard');
        }

        if (response.error) {
            throw new Error(
                'Sorry, we could not save your todo at the moment.'
            );
        }

        const newTodoID = response.data[0]?.todo_id;

        // if no error in adding todo, add tags
        if (formData.tags.length > 0 && newTodoID) {
            const todoTagRelation = formData.tags?.map((id) => ({
                todo_id: newTodoID,
                tag_id: id,
            }));

            const realtionResponse = await supabase
                .from('tag_todo_relationship')
                .insert(todoTagRelation);

            revalidatePath('/dashboard');

            if (realtionResponse.error) {
                throw new Error(
                    'Sorry, we could not link your tag at the moment.'
                );
            }
        }

        return;
    } catch (error) {
        return {
            error: error.message,
        };
    }
};

export default addTodo;
