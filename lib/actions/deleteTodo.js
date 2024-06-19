"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const deleteTodo = async (todoID) => {
  try {
    if (!todoID) {
      throw new Error("Sorry, something went wrong.");
    }

    const supabase = createClient();

    const response = await supabase
      .from("todos")
      .delete()
      .eq("todo_id", todoID);

    if (response?.error) {
      throw new Error("Sorry, we could not delete your todo at the moment.");
    }

    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default deleteTodo;
