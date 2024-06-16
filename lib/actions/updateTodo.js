'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const updateTodo = async (todoID, formData) => {
    console.log('addTodo', formData);

    const supabase = createClient();

    const userData = await supabase.auth.getUser();
    const { user } = userData.data;

    console.log('update formData', formData);

    const response = await supabase
        .from('todos')
        .update({
            heading: formData.heading,
            text: formData.description,
            user_id: user.id,
            due_date: formData.dueDate === '' ? null : formData.dueDate,
        })
        .eq('todo_id', todoID);

    console.log('update data', response.data);

    if (!response.error) {
        const response = await supabase
            .from('tag_todo_relationship')
            .delete()
            .eq('todo_id', todoID);

        console.log('delete all tags', response.data);

        if (formData.tags.length > 0) {
            const newRelations = formData.tags?.map((id) => ({
                todo_id: todoID,
                tag_id: id,
            }));

            console.log('newRelations', newRelations);

            const relation_response = await supabase
                .from('tag_todo_relationship')
                .insert(newRelations);

            console.log(
                'tag_todo_relationship insert data',
                relation_response.data
            );
        }
        revalidatePath('/', 'layout');
    }
};

export default updateTodo;
