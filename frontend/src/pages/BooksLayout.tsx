import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BooksNavigation from "../Components/BooksNavigation";

const BooksLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const genreChangeHandler = (genre: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('genre', genre);
    searchParams.set('page', '1');
    navigate(`/books?${searchParams.toString()}`);
  }

  const sortChangeHandler = (sort: string, order: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', sort);
    searchParams.set('page', '1');
    searchParams.set('sortOrder', order);
    navigate(`/books?${searchParams.toString()}`);
  }

  return (
    <>
      <BooksNavigation onGenreChange={genreChangeHandler} onSortChange={sortChangeHandler} />
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
  const sort = searchParams.get('sort') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const response = await fetch(`http://localhost:3000/books?genre=${genre}&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`, {
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