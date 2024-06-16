"use server";

import getAllTags from "@/lib/getAllTags";
import getAllTodos from "@/lib/getAllTodos";
import Todos from "@/components/dashboard/Todos";

export async function generateMetadata({ params }) {
  const tagName = params.id.split("--")[0];

  return {
    title: `#${tagName}`,
  };
}

const page = async ({ params }) => {
  const tagID = params.id.split("--").slice(-1)[0];
  const [todos, tags] = await Promise.all([getAllTodos(tagID), getAllTags()]);

  return (
    <div className="mx-auto max-w-[800px] p-5">
      <Todos todos={todos} tags={tags} />
    </div>
  );
};

export default page;
