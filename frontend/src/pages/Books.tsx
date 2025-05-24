import BookCard from "../Components/BookCard";
import { useRouteLoaderData } from "react-router-dom";
import { Book } from "../models/BookModel";

const Books: React.FC = () => {
  const books = (useRouteLoaderData('books') as Book[]) || [];
  console.log('Books loaded:', books);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books?.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          name={book.name}
          author={book.author}
          imageUrl={book.imageUrl}
          price={book.price}
          discount={book.discount}
          description={book.description}
        />
      ))}
    </div>
  );
}

export default Books;