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
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '6';

  const response = await fetch(`http://localhost:3000/books?genre=${genre}&page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Response('Failed to fetch books', { status: response.status });
  }

  const data = await response.json();

  return {
    books: data.books,
    total: +data.totalBooks,
    totalPages: +data.totalPages,
    currentPage: +data.currentPage,
  };
}