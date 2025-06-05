import { Book } from "../models/BookModel";
import { useLoaderData } from "react-router-dom";
import Carousel from "../Components/Carousel";

const Home: React.FC = () => {
  const loaderData = useLoaderData() as {
    discountBooks: Book[];
    newestBooks: Book[];
  };
  const { discountBooks, newestBooks } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center m-auto px-2 sm:px-4 md:px-8 max-w-screen-lg w-full">
      <div className="mb-6 mt-4 w-full">
        <p className="text-2xl sm:text-3xl font-bold text-center">Welcome to D-Books</p>
        <p className="text-lg sm:text-xl text-center text-gray-600">Discover the best books at unbeatable prices!</p>
      </div>
      <div className="mb-6 mt-4 w-full">
        <p className="text-2xl sm:text-3xl font-bold text-center">Most Discounted</p>
      </div>
      <Carousel books={discountBooks} />
      <div className="my-8 w-full flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-400">•</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="mb-6 w-full">
        <p className="text-2xl sm:text-3xl font-bold text-center">Newest</p>
      </div>
      <Carousel books={newestBooks} />
    </div>
  );
};

export default Home;


export const homeLoader = async () => {
  // fetching 10 most discounted books
  const discountBooksResponse = await fetch('http://localhost:3000/books?sort=discount&sortOrder=desc&limit=10');

  if (!discountBooksResponse.ok) {
    throw new Response('Failed to fetch discounted books', { status: discountBooksResponse.status });
  }
  const discountBooksData = await discountBooksResponse.json();

  //fetching 10 newest books
  const newestBooksResponse = await fetch('http://localhost:3000/books?sort=createdAt&sortOrder=desc&limit=10');

  if (!newestBooksResponse.ok) {
    throw new Response('Failed to fetch newest books', { status: newestBooksResponse.status });
  }
  const newestBooksData = await newestBooksResponse.json();

  return {
    discountBooks: discountBooksData.books,
    newestBooks: newestBooksData.books,
  };
}