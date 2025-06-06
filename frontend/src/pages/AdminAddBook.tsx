import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/user-slice";

const AdminAddBook: React.FC = () => {
  const navigate = useNavigate();
  const actionData = useActionData() as { message?: string; success?: boolean; errors?: string[] } | undefined;
  const successMessage = actionData?.message;
  const success = actionData?.success;
  const errors = actionData?.errors;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      toast.success(successMessage || 'Book added successfully');
      navigate('/admin');
    }

  }, [success, navigate])

  useEffect(() => {
    if (actionData?.message === 'Unauthorized') {
      toast.error('You are not authorized to perform this action.');
      dispatch(userActions.setUserLogout());
      navigate('/login');
    }
  }, [actionData, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
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
      <Form method="POST" action="/admin/add-book" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">Book Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="textarea w-full h-32"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            step=".01"
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            step=".01"
            className="input w-full"
            defaultValue="0"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Add Book'}
        </button>
      </Form>
    </div>
  );
}

export default AdminAddBook;

export const adminAddBookAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const author = formData.get('author') as string;
  const genre = formData.get('genre') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const discount = parseFloat(formData.get('discount') as string) || 0;

  const book = {
    name,
    author,
    genre,
    imageUrl,
    description,
    price,
    discount
  };

  try {
    const response = await fetch(`http://localhost:3000/admin/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book),
      credentials: 'include'
    });

    if (response.status === 422) {
      return response
    };

    if (response.status === 401) {
      return { message: 'Unauthorized', success: false };
    }

    if (!response.ok) {
      throw new Error('Failed to add book');
    };

    return {
      message: 'Book added successfully',
      success: true,
      errors: []
    };
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Response(JSON.stringify({ message: 'Failed to add book' }), {
      status: 500
    });
  }
}