
import { Book, getAllBooks } from "@/booksService";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";

export default  function BookTable() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: getAllBooks,
  });


  if (isLoading || !books) {
    return <>Loading...</>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={books} />
    </div>
  );
}
