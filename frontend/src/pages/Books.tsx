import BookCard from "../Components/BookCard";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import { Book } from "../models/BookModel";

const Books: React.FC = () => {
  const loaderData = useRouteLoaderData('books');
  const { books, currentPage, totalPages } = loaderData as {
    books: Book[];
    currentPage: number;
    totalPages: number;
  };
  const navigate = useNavigate();
  const location = useLocation();

  const goToPage = (newPage: number) => {
    console.log('Navigating to page:', currentPage);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage.toString());
    navigate(`/books?${searchParams.toString()}`);
  }

  return (
    <div className="flex-col mb-8">
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
      <div className="flex justify-center items-center mt-4">
        <button className="btn" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Books;