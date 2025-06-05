import { Form, LoaderFunctionArgs, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Book } from "../models/BookModel";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AdminDeleteBook: React.FC = () => {
  const navigate = useNavigate();
  const book = useLoaderData().book as Book | undefined;
  const actionData = useActionData() as { message?: string; success?: boolean } | undefined;
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message || 'Book deleted successfully');
        navigate('/books');
      } else {
        toast.error(actionData.message || 'Failed to delete book');
      }
    }
  }, [actionData]);

  return (
    <div className="container mx-auto p-6">
      {book ? <>
        <h1 className="text-3xl font-bold mb-6">Delete Book</h1>
        <p className="text-2xl text-red-600">Are you sure you want to delete this book?</p>
        <div className="mt-4">
          <p className="text-lg font-semibold">Book Details:</p>
          <ul className="list-disc pl-5">
            <li><strong>ID:</strong> {book?.id}</li>
            <li><strong>Name:</strong> {book?.name}</li>
            <li><strong>Author:</strong> {book?.author}</li>
            <li><strong>Genre:</strong> {book?.genre}</li>
            <li><strong>Price:</strong> ${book?.price}</li>
          </ul>
        </div>
        <Form method="POST" action={`/admin/delete-book/${book?.id}`} className="mt-6">
          <input type="hidden" name="bookId" value={book?.id} />
          <button type="submit" className="btn btn-warning">Delete Book</button>
        </Form>
      </> :
        <>
          <h1 className="text-3xl font-bold mb-6">Book Not Found</h1>
          <p className="text-lg text-red-600">The book you are trying to delete does not exist.</p>
        </>}
    </div>
  );
}

export default AdminDeleteBook;


export const AdminDeleteBookLoader = async ({ params }: LoaderFunctionArgs) => {
  const { bookId } = params;
  console.log("Loading book with ID:", bookId);
  if (!bookId) {
    throw new Response(JSON.stringify({ message: 'Book ID is required' }), {
      status: 400
    });
  }

  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status === 404) {
      return { book: null }; // Book not found
    }
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch book details' }), {
      status: 500
    });
  }
};

export const AdminDeleteBookAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const bookId = formData.get('bookId') as string;

  if (!bookId) {
    throw new Response(JSON.stringify({ message: 'Book ID is required' }), {
      status: 400
    });
  }

  try {
    const response = await fetch(`http://localhost:3000/admin/book/${bookId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }

    return { message: 'Book deleted successfully', success: true };
  } catch (error) {
    throw new Response(JSON.stringify({ message: 'Failed to delete book' }), {
      status: 500
    });
  }
}