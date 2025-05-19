import { redirect } from "react-router-dom"
import { AuthForm } from "../Components/AuthForm"

const Authentication: React.FC = () => {

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
  console.log(responseData)
  const token = responseData.token;
  localStorage.setItem('DbooksToken', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('tokenExpiration', expiration.toISOString());
  localStorage.setItem('userId', responseData.user.id);

  if (mode === 'signup') {
    return redirect('/auth?mode=login');
  } else if (mode === 'login') {
    return redirect('/');
  }
}