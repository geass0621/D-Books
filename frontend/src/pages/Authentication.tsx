import { redirect } from "react-router-dom"
import { AuthForm } from "../Components/AuthForm"
import { emailValidation, matchPassword, passwordValidation } from "../utils/validators"

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

  const authData = {
    email: data.get('email')?.toString().trim() || '',
    password: data.get('password')?.toString().trim() || '',
    confirmPassword: data.get('confirmPassword')?.toString().trim() || ''
  };

  const response = await fetch('http://localhost:3000/' + mode, {
    method: mode === "signup" ? "PUT" : "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  console.log(response);

  if (response.status === 422 || response.status === 401) {
    return response
  };

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not authenticate user!' }), {
      status: 500,
    });
  };

  return redirect('/');
}