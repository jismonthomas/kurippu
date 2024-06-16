"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import EditTodoForm from "../forms/EditTodoForm";
import TodoFormSkeleton from "@/components/ui/TodoFormSkeleton";

import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const initTodoStatus = { data: "", error: null, loading: false };

const TodoDetails = ({ todoID, hideTodoDetailsHandler, tags, saveTag }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoDetails, setTodoDetails] = useState(initTodoStatus);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // fetch todo details
    if (todoID) {
      setModalIsOpen(true);
      setTodoDetails({ ...initTodoStatus, loading: true });

      const getTodoDetails = async () => {
        const response = await fetch("/api/todos/", {
          method: "POST",
          body: JSON.stringify({ todoID }),
        });

        if (response?.ok) {
          const { data } = await response.json();

          if (data) {
            setTodoDetails({
              data: data,
              error: null,
              loading: false,
            });
          } else {
            setTodoDetails({
              data: "",
              error: "Sorry, we could not find your todo details",
              loading: false,
            });
          }
        }
      };
      getTodoDetails();
    }
    // close modal if no todo ID available
    else {
      setModalIsOpen(false);
    }
  }, [todoID]);

  const toggleModalStatus = (modalStatus) => {
    // modal status is TRUE/FALSE
    if (!modalStatus) {
      // if modal status is false, remove todoID from URL
      hideTodoDetailsHandler();
    }
    // change todo modal status
    setModalIsOpen(modalStatus);
  };

  // show modal if screensize is above 768px, drawer on small screens
  if (isDesktop) {
    return (
      <Dialog open={modalIsOpen} onOpenChange={toggleModalStatus}>
        <DialogContent className="sm:w-full sm:max-w-[min(50vw,800px)]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div>
            {todoDetails.data && !todoDetails.error ? (
              <EditTodoForm
                todo={todoDetails.data}
                tags={tags}
                saveTag={saveTag}
              />
            ) : null}

            {todoDetails.loading ? <TodoFormSkeleton /> : null}
            {todoDetails.error ? (
              <Alert
                className="bg-destructive text-red-50"
                variant="destructive"
              >
                <ExclamationCircleIcon className="h-4 w-4 fill-red-50" />
                <AlertTitle>Something Went Wrong</AlertTitle>
                <AlertDescription>{todoDetails?.error}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={modalIsOpen} onOpenChange={toggleModalStatus}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>
        <div>
          {todoDetails.data && !todoDetails.error ? (
            <EditTodoForm
              todo={todoDetails.data}
              tags={tags}
              saveTag={saveTag}
            />
          ) : null}

          {todoDetails.loading ? <TodoFormSkeleton /> : null}
          {todoDetails.error ? (
            <Alert className="bg-destructive text-red-50" variant="destructive">
              <ExclamationCircleIcon className="h-4 w-4 fill-red-50" />
              <AlertTitle>Something Went Wrong</AlertTitle>
              <AlertDescription>{todoDetails?.error}</AlertDescription>
            </Alert>
          ) : null}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TodoDetails;
