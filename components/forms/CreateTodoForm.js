"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { format, isBefore } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingAnimation from "@/components/LoadingAnimation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDown, Tags, XCircleIcon, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";

const CreateTodoForm = ({ show = true, saveTodo, tags, saveTag }) => {
  const params = useParams();
  const [_, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(show);

  const formSchema = z.object({
    heading: z.string().min(1),
    description: z.string().trim(),
    tags: z.array(z.string()),
    dueDate: z.date().or(z.literal("")),
  });

  const defaultTagID = params?.id?.split("--")?.slice(-1)[0];

  const defaultFormValues = {
    heading: "",
    description: "",
    tags: defaultTagID ? [defaultTagID] : [],
    dueDate: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultFormValues,
    },
  });

  const submitForm = async (formData) => {
    form.reset({
      ...defaultFormValues,
    });
    startTransition(async () => {
      await saveTodo(formData);
    });
  };

  const newTagRef = useRef();

  const saveNewTag = async (value) => {
    const newTag = value.trim();
    if (!newTag) {
      return;
    }
    newTagRef.current.value = "";
    startTransition(async () => {
      await saveTag(newTag);
    });
  };

  const selectedTagsIDs = form.watch("tags");

  const selectedTags = tags.filter((tag) => {
    if (selectedTagsIDs.includes(tag.tag_id)) {
      return tag;
    }
  });

  useEffect(() => {
    setShowForm(show);
  }, [show]);

  return !showForm ? (
    <Button
      variant="ghost"
      className="group mt-2 px-0 hover:bg-transparent"
      onClick={() => setShowForm((status) => !status)}
    >
      <PlusCircleIcon className="mr-2 h-5 w-5 transition-all group-hover:fill-slate-900 group-hover:stroke-white" />
      <span>Add Todo</span>
    </Button>
  ) : (
    <Card className="mt-2 shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="">
          <CardHeader className="p-0">
            {/* todo heading */}
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-auto border-0 text-base font-semibold placeholder:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Task Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardHeader>

          <CardContent className="p-0">
            <div className="pb-2">
              {/* todo description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-auto min-h-10 border-0 py-0 text-sm text-slate-800 placeholder:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 px-3 pb-1">
              {/* todo due date */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-8 space-x-1 px-1.5 py-2 pl-3 text-left font-medium",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              <span>{format(field.value, "PPP")}</span>
                            ) : (
                              <span>Due Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const calenderDate = date.toLocaleDateString();
                            const today = new Date().toLocaleDateString();
                            return isBefore(calenderDate, today);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* show selected tags */}
              {selectedTags.length > 0 ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={selectedTags.length === 0}
                      variant="outline"
                      className="h-8 space-x-1 px-1.5"
                    >
                      <Tags className="h-4 w-4 origin-center rotate-90" />
                      <span>
                        {/* first tag */}
                        {selectedTags.length > 0
                          ? selectedTags[0]?.tag_name
                          : "No Tags"}
                      </span>

                      {/* number of selected tahs */}
                      {selectedTags?.length > 1 ? (
                        <span className="text-slate-600">{`(+${
                          selectedTags?.length - 1
                        })`}</span>
                      ) : (
                        ""
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-wrap gap-2">
                      {/* selected tags & button to remove them */}
                      {selectedTags?.map((tag) => {
                        return (
                          <div
                            key={tag.tag_id}
                            className="flex h-8 items-center space-x-1 rounded-md border px-1.5 py-1.5"
                          >
                            <span className="font-medium text-slate-700">
                              {tag.tag_name}
                            </span>
                            <Button
                              className="group h-auto w-auto p-0"
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                const newTags = selectedTags.filter(
                                  (currentTag) =>
                                    currentTag.tag_id !== tag.tag_id,
                                );

                                const newTagIDs = newTags.map(
                                  (tag) => tag.tag_id,
                                );
                                form.setValue("tags", newTagIDs);
                              }}
                            >
                              <XCircleIcon
                                strokeWidth={3}
                                className="h-4 w-4 stroke-slate-700 group-hover:fill-destructive/50 group-hover:stroke-red-800"
                              />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : null}
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t p-3">
            {/* dropdown to select/create tags */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 border px-3 text-slate-800"
                >
                  Tags
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-1">
                {/* all tags */}
                <ScrollArea className="h-[200px]">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem className="space-y-0">
                        {tags.map((tag) => (
                          <FormField
                            key={tag.tag_id}
                            control={form.control}
                            name="tags"
                            className="space-y-0"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={tag.tag_id}
                                  className="flex w-full flex-row items-center space-x-3 space-y-0 bg-foreground/0 px-3 hover:bg-foreground/5"
                                >
                                  <FormControl>
                                    <Checkbox
                                      disabled={tag?.isPending}
                                      checked={field.value?.includes(
                                        tag.tag_id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              tag.tag_id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== tag.tag_id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="flex w-full cursor-pointer items-center py-2 font-medium text-slate-500 hover:text-slate-800">
                                    #{tag.tag_name}
                                    {tag.isPending ? (
                                      <LoadingAnimation
                                        className={`text-slate-700 [&>svg]:h-3`}
                                      />
                                    ) : null}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ScrollArea>
                <Separator />
                {/* create new tag */}
                <div className="flex gap-1 pb-1 pt-2">
                  <Input
                    type="text"
                    placeholder="Create New"
                    className="h-8 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    ref={newTagRef}
                  />
                  <Button
                    type="button"
                    variant=""
                    className="h-8 rounded-l-none focus-visible:ring-offset-0"
                    onClick={() => {
                      saveNewTag(newTagRef.current.value);
                    }}
                  >
                    + Add Tag
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* form buttons */}
            <div className="space-x-2">
              {form.formState.isDirty ? (
                <Button
                  type="button"
                  className="relative h-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() => {
                    form.reset({
                      heading: "",
                      description: "",
                      tags: [],
                    });
                  }}
                >
                  <span>Cancel</span>
                </Button>
              ) : null}

              <Button
                disabled={!form.formState.isDirty}
                type="submit"
                className="relative h-8"
              >
                <span>Add Todo</span>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateTodoForm;
