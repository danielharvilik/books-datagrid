const BASE_URL = "https://658ed2272871a9866e79e32f.mockapi.io/";

import { z } from "zod";

export const bookSchema = z.object({
  title: z.string({}).min(1).max(20),
  description: z.string().min(1).max(250),
  price: z.coerce.number().gte(1),
  category: z.string().min(1).max(20),
});

export type Book = CreateBookEntry & { id: string };

export type CreateBookEntry = z.infer<typeof bookSchema>;

export type UpdateBookBody = Partial<CreateBookEntry>;

export const postBook = (createBookBody: CreateBookEntry) =>
  fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createBookBody),
  });

export const putBook = (id: string, updateBookBody: UpdateBookBody) =>
  fetch(`${BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateBookBody),
  });

export const getAllBooks = () =>
  fetch(`${BASE_URL}/books`, { method: "GET" }).then((res) => res.json());

export const getBookById = (id: string) =>
  fetch(`${BASE_URL}/books/${id}`, { method: "GET" }).then((res) => res.json());

export const deleteBook = (id: string) =>
  fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
