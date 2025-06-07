import { useActionData, useLocation, useNavigate } from "react-router-dom"
import { AuthForm } from "../Components/AuthForm"
import { useAppDispatch } from "../store/hooks"
import { userActions } from "../store/user-slice"
import { User } from "../models/UserModel"
import { useEffect } from "react"
import { cartActions } from "../store/cart-slice"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Authentication: React.FC = () => {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode') || 'login';
  const actionData = useActionData();
  const user = actionData?.user as User | undefined;
  const createUser = actionData?.createdUser;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id && !createUser) {
      dispatch(userActions.setUserLogin(user));
      const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
      localCart.userId = user.id;
      localCart.userEmail = user.email;
      localStorage.setItem('cart', JSON.stringify(localCart));
      dispatch(cartActions.setCart(localCart));
      toast.success(`Welcome, to D-books!`);
      navigate('/');
    }
  }, [user, dispatch, createUser]);

  useEffect(() => {
    if (createUser) {
      toast.success(`Account created successfully!`);
      navigate('/auth?mode=login', {
        replace: true
      });
    }
  }, [createUser]);

  return (
    <>
      <AuthForm key={mode} />
    </>
  )
}
export default Authentication

export const action = async ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({ message: 'Unsupported mode' }), {
      status: 422
    })
  }

  const data = await request.formData();
  const email = data.get('email')?.toString().trim() || '';
  const password = data.get('password')?.toString().trim() || '';
  const confirmPassword = data.get('confirmPassword')?.toString().trim() || '';

  let authData;
  if (mode === 'signup') {
    authData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
  }
  if (mode === 'login') {
    authData = {
      email: email,
      password: password,
    };
  }

  const response = await fetch(`${API_URL}/` + mode, {
    method: mode === "signup" ? "PUT" : "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    return response
  };

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not authenticate user!' }), {
      status: 500,
    });
  };

  const responseData = await response.json();

  return responseData;
}