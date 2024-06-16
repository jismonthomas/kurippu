"use client";

import { toast } from "sonner";
import { useOptimistic } from "react";
import { useSearchParams } from "next/navigation";

import addTag from "@/lib/actions/addTag";
import addTodo from "@/lib/actions/addTodo";
import changeTodoStatus from "@/lib/actions/changeTodoStatus";
import TodoListItem from "@/components/dashboard/TodoListItem";
import TodoDetails from "@/components/dashboard/TodoDetails";
import CreateTodoForm from "@/components/forms/CreateTodoForm";

const Todos = ({ todos, tags }) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos);
  const [optimisticTags, addOptimisticTag] = useOptimistic(tags);

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const saveTodo = async (formData) => {
    const newTodo = {
      heading: formData.heading,
      completed: false,
      isPending: true,
    };
    addOptimisticTodo((todos) => [...todos, newTodo]);
    const response = await addTodo(formData);

    if (response?.error) {
      toast.error(response.error);
    }
  };

  const saveTag = async (tagName) => {
    const newTag = {
      tag_name: tagName,
      tag_id: tagName,
      isPending: true,
    };

    addOptimisticTag((tags) => [...tags, newTag]);

    const response = await addTag(tagName);
    if (response?.error) {
      toast.error(response.error);
    }
  };

  const updateTodoStatus = async (updatedTodo) => {
    const updatedTodos = optimisticTodos.map((todo) => {
      if (todo.todo_id == updatedTodo.todo_id) {
        todo.completed = updatedTodo.completed;
      }
      return todo;
    });

    addOptimisticTodo([...updatedTodos]);
    const response = await changeTodoStatus(updatedTodo);
    if (response?.error) {
      toast.error(response.error);
    }

    if (!response && updatedTodo.completed) {
      toast.success("Todo Completed!  🎉");
    }
  };

  const showTodoDetails = (todoID) => {
    params.set("todoID", todoID);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const hideTodoDetails = () => {
    const todoIDExist = params.get("todoID");
    if (todoIDExist) {
      params.delete("todoID");
    }
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  // todo are sorted based on date by default
  const sortedTodos = optimisticTodos.sort((a, b) =>
    b.created_at > a.created_at ? -1 : 1,
  );
  const nonCompletedTodos = sortedTodos.filter((todo) => !todo.completed);
  const completedTodos = sortedTodos.filter((todo) => todo.completed);

  return (
    <div>
      {nonCompletedTodos.map((todo, index) => {
        return (
          <TodoListItem
            className="border-b border-slate-200 last-of-type:border-b-0"
            key={todo.todo_id ?? index}
            todo={todo}
            updateTodoHandler={updateTodoStatus}
            showTodoDetailsHandler={showTodoDetails}
          />
        );
      })}

      <CreateTodoForm
        saveTodo={saveTodo}
        tags={optimisticTags}
        saveTag={saveTag}
        show={nonCompletedTodos.length < 3}
      />

      {completedTodos.map((todo, index) => {
        return (
          <TodoListItem
            className="border-b border-slate-200 last-of-type:border-b-0"
            key={todo.todo_id ?? index}
            todo={todo}
            updateTodoHandler={updateTodoStatus}
            showTodoDetailsHandler={showTodoDetails}
          />
        );
      })}

      <TodoDetails
        todoID={searchParams.get("todoID")?.toString()}
        hideTodoDetailsHandler={hideTodoDetails}
        tags={optimisticTags}
        saveTag={saveTag}
      />
    </div>
  );
};

export default Todos;
