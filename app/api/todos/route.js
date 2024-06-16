import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const { todoID } = await request.json();

  if (!todoID) {
    return;
  }
  const supabase = createClient();

  const response = await supabase
    .from("todos")
    .select("*, tags(tag_id, tag_name)")
    .eq("todo_id", todoID)
    .maybeSingle();

  return Response.json(response);
}

export async function DELETE(request) {
  const { todoID } = await request.json();

  if (!todoID) {
    return;
  }
  const supabase = createClient();
  const response = await supabase.from("todos").delete().eq("todo_id", todoID);

  revalidatePath("/");
  return Response.json({ response });
}
