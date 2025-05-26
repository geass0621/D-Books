import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Book } from "../models/BookModel";

const BookDetail = () => {
  const loaderBook = useLoaderData() as Book;
  const bookPrice = loaderBook.price.toFixed(2);
  const discount = (loaderBook.discount * 100).toFixed(0);
  const discountedPrice = (loaderBook.price * (1 - loaderBook.discount)).toFixed(2);

  return (
    <div className="flex flex-row items-center justify-center p-4">
      <figure className="relative w-6xl h-auto">
        <img
          src={loaderBook.imageUrl}
          className="h-auto w-full object-fill"
          loading="lazy"
          alt={loaderBook.name} />
        <div className="badge badge-neutral border-0 absolute top-2 right-2 bg-accent-content bg-opacity-80 font-bold">
          {discount}% OFF
        </div>
      </figure>
      <div className="ml-4 flex flex-col justify-between">
        <div className="my-4">
          <h2 className="card-title">
            {loaderBook.name} <span className="text-sm text-gray-500">by {loaderBook.author}</span>
            <div className="badge badge-neutral line-through font-bold">${bookPrice}</div>
            <div className="badge badge-primary font-bold">${discountedPrice}</div>
          </h2>
        </div>
        <p>{loaderBook.description}</p>
        <div className="card-actions justify-end mt-4">
          <div className="btn btn-accent">Add to Cart</div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

export const bookDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { bookId } = params;
  if (!bookId) {
    throw new Response('Book ID is required', { status: 400 });
  };

  const response = await fetch(`http://localhost:3000/books/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Response('Failed to fetch book details', { status: response.status });
  }

  const data = await response.json();

  return data.book;
}