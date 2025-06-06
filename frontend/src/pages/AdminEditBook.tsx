import { useLoaderData, LoaderFunctionArgs, Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { Book } from "../models/BookModel";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AdminEditBook: React.FC = () => {
  const actionData = useActionData() as { errors?: string[]; message?: string; success?: boolean } | undefined;
  const errors = actionData?.errors;
  const successMessage = actionData?.message;
  const success = actionData?.success;
  const book = useLoaderData().book as Book;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';


  useEffect(() => {
    if (success) {
      toast.success(successMessage || 'Book updated successfully');
      navigate('/books');
    } else {
      toast.error('Failed to update book');
    }
  }, [success, navigate, successMessage]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      {errors && errors.length > 0 && (
        <div className="alert alert-error mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {success && successMessage && (
        <div className="alert alert-success mb-4">
          <p>{successMessage}</p>
        </div>
      )}
      <Form method="POST" action={`/admin/edit-book/${book.id}`}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Book Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={book.name}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={book.author}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            defaultValue={book.genre}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            defaultValue={book.imageUrl}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={book.description}
            className="textarea w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={book.price}
            step="0.01"
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="discount">Discount</label>
          <input
            type="number"
            id="discount"
            name="discount"
            defaultValue={(book.discount)} // Assuming discount is stored as a fraction
            step="0.01"
            className="input w-full"
          />
        </div>
        <input type="hidden" name="id" value={book.id} />
        <div className="mb-4">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{
            isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Update Book'
          }</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminEditBook;

export const adminEditBookLoader = async ({ params }: LoaderFunctionArgs) => {
  const { bookId } = params;
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
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw new Response(JSON.stringify({ message: 'Failed to fetch book details' }), {
      status: 500
    });
  }
};

export const adminEditBookAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const author = formData.get('author') as string;
  const genre = formData.get('genre') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const discount = parseFloat(formData.get('discount') as string) || 0;

  const book: Book = {
    id,
    name,
    author,
    genre,
    imageUrl,
    description,
    price,
    discount
  };

  try {
    const response = await fetch(`http://localhost:3000/admin/book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
      credentials: 'include',
    });

    if (response.status === 422) {
      return response
    }

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Failed to update book' }));
    }

    return { success: true, message: 'Book updated successfully', errors: [] };
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Response(JSON.stringify({ message: 'Failed to update book' }), {
      status: 500
    });
  }
}