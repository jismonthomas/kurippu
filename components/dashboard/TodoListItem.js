"use client";

import { startTransition } from "react";

import DeleteTodo from "./DeleteTodo";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const TodoListItem = ({
  todo,
  className,
  updateTodoHandler,
  showTodoDetailsHandler,
}) => {
  startTransition;

  const updateTodo = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      await updateTodoHandler({ ...todo, completed: !todo.completed });
    });
  };

  const showTodoDetails = (e) => {
    e.preventDefault();
    showTodoDetailsHandler(todo.todo_id);
  };

  if (!todo) {
    return;
  }

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer items-center gap-2",
        className,
      )}
    >
      {/* toggle todo complete/incomplete */}
      <Checkbox
        aria-label="Mark as completed"
        className="h-4 w-4 rounded-full border-slate-500 data-[state=checked]:bg-slate-500"
        onClick={updateTodo}
        disabled={todo.isPending}
        checked={todo.completed}
      />
      {/* button to open todo modal */}
      <Button
        aria-label={"Open Todo"}
        title={todo.heading}
        variant="ghost"
        disabled={todo.isPending}
        onClick={showTodoDetails}
        className={cn(
          "w-full justify-start px-0 hover:bg-transparent max-lg:max-w-[75%]",
          todo.completed
            ? "text-slate-500 line-through hover:text-slate-700"
            : "",
        )}
      >
        <span className="w-[95%] truncate text-left">{todo.heading}</span>
      </Button>

      {/* button to delete todo */}
      <div className="right-0 top-1/2 items-center justify-end from-slate-50 transition-all group-hover:flex md:absolute md:hidden md:w-32 md:-translate-y-1/2 md:bg-gradient-to-l">
        <DeleteTodo todo={todo} />
      </div>
    </div>
  );
};

export default TodoListItem;
