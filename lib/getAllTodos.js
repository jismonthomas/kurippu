"use server";

import { createClient } from "@/utils/supabase/server";

const getAllTodos = async (tagID) => {
  const supabase = createClient();
  try {
    if (tagID) {
      const response = await supabase
        .from("todos")
        .select("*, tags!inner(tag_id, tag_name)")
        .eq("tags.tag_id", tagID)
        .is("parent_todo_id", null);

      if (!response.error) {
        return response.data;
      }
    }

    const response = await supabase
      .from("todos")
      .select("*, tags(tag_id, tag_name)")
      .is("parent_todo_id", null);

    if (!response.error) {
      return response.data;
    }

    throw new Error(
      "Sorry, we could not find your todos at the moment, please try again later!",
    );
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default getAllTodos;
