"use server";

import { createClient } from "@/utils/supabase/server";

const getAllTags = async () => {
  const supabase = createClient();
  try {
    const response = await supabase.from("tags").select("*");

    if (!response.error) {
      return response.data;
    }

    throw new Error(
      "Sorry, we could not find your tags at the moment, please try again later!",
    );
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default getAllTags;
