import { redirect, useActionData, useNavigate } from "react-router-dom"
import { AuthForm } from "../Components/AuthForm"
import { useAppDispatch } from "../store/hooks"
import { userActions } from "../store/user-slice"
import { User } from "../models/UserModel"
import { useEffect } from "react"

const Authentication: React.FC = () => {
  const actionData = useActionData() as User | undefined;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && actionData.id) {
      dispatch(userActions.setUserLogin(actionData));
      navigate('/');
    }
  }, [actionData, dispatch]);

  return (
    <>
      <AuthForm />
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

  const response = await fetch('http://localhost:3000/' + mode, {
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
  const user: User = {
    id: responseData.user.id,
    email: responseData.user.email,
    role: responseData.user.role,
    status: responseData.user.status,
  }

  const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
  localCart.userId = user.id;
  localCart.userEmail = user.email;
  localStorage.setItem('cart', JSON.stringify(localCart));

  if (mode === 'signup') {
    return redirect('/auth?mode=login');
  } else if (mode === 'login') {
    return user;
  }
}