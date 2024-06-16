"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Trash2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AlertDescription } from "@/components/ui/alert";
import LoadingAnimation from "@/components/LoadingAnimation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteTodo = ({ todo, className }) => {
  const form = useForm();
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false);

  const submitForm = async () => {
    const response = await fetch("/api/todos/", {
      method: "DELETE",
      body: JSON.stringify({ todoID: todo.todo_id }),
    });

    if (response.ok) {
      router.refresh();
      setAlertOpen(false);
    }
  };

  if (!todo) {
    return;
  }

  return (
    <AlertDialog onOpenChange={setAlertOpen} open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={todo.isPending}
          className={cn("opacity-70 hover:opacity-100", className)}
        >
          <Trash2 className="h-4" />{" "}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Delete Todo?
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* selected todo heading */}
        <div className="flex items-center justify-center gap-2 overflow-hidden text-destructive">
          <Trash2 className="shrink-0" size={20} />
          <div className="truncate">{todo.heading}</div>
        </div>

        <AlertDescription className="text-balance text-center">
          This action cannot be undone, are you sure you want to delete this
          todo?
        </AlertDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <AlertDialogFooter className={`sm:justify-center`}>
              <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                type="submit"
                className="relative w-full"
              >
                <span
                  className={cn("opacity-100", {
                    "opacity-0": form.formState.isSubmitting,
                  })}
                >
                  Delete
                </span>
                {form.formState.isSubmitting ? (
                  <LoadingAnimation
                    className={cn(
                      `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-100`,
                    )}
                  />
                ) : null}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodo;
