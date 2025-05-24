import { Outlet } from "react-router-dom";
import BooksNavigation from "../Components/BooksNavigation";

const BooksLayout = () => {
  return (
    <>
      <BooksNavigation />
      <Outlet />
    </>
  );
}

export default BooksLayout;

export const booksLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const genre = searchParams.get('genre') || 'all';

  const response = await fetch(`http://localhost:3000/books?genre=${genre}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Response('Failed to fetch books', { status: response.status });
  }
  console.log('Books fetched successfully');
  const data = await response.json();
  console.log(data.books);
  return data.books || [];
}