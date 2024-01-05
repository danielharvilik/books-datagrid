"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Book,
  CreateBookEntry,
  UpdateBookBody,
  putBook,
  postBook,
  bookSchema,
  getBookById,
} from "@/booksService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";

type BookFormProps = {
  initialBook?: Book;
  id?: string;
};

function BookDataEntryForm({ initialBook }: BookFormProps) {
  const queryClient = useQueryClient();

  useQuery({
    queryKey: [`book_${initialBook?.id}`],
    queryFn: () => getBookById(initialBook?.id || ""),
  });

  const form = useForm<z.infer<typeof bookSchema>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(bookSchema),
    defaultValues: initialBook,
  });

  const createOrUpdateBookMutation = useMutation({
    mutationFn: initialBook
      ? (book: UpdateBookBody) => putBook(initialBook.id, book)
      : postBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      form.reset({ title: "", description: "", price: 0, category: "" });
    },
  });

  const onSubmit: SubmitHandler<CreateBookEntry> = (createBookEntry) => {
    createOrUpdateBookMutation.mutate(createBookEntry);
  };


  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {initialBook ? "Edit book data entry" : "Create new book data entry"}
        </DialogTitle>
        <DialogDescription>
          Fill out information about the book.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-4 space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="category" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                form.reset({
                  title: "",
                  description: "",
                  price: 0,
                  category: "",
                })
              }
            >
              Reset
            </Button>
            <DialogClose asChild>
              <Button type="submit" disabled={!form.formState.isValid}>
                {initialBook ? "Edit" : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default BookDataEntryForm;
