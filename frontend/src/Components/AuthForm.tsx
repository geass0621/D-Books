import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

export const AuthForm: React.FC = () => {
  const data = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className="max-w-2xl m-8">
      <h1 className="mb-2 font-bold text-2xl">{isLogin ? 'Log in' : 'Create a new user'}</h1>
      {data && data.errors && <ul>{
        Object.values(data.errors as Record<string, string>).map(err => <li key={err}>{err}</li>)
      }</ul>}
      <p className="w-full block">
        <label className="w-full block" htmlFor="email">Email</label>
        <input className="w-full block bg-base-300" type="email" name="email" required />
      </p>
      <p className="w-full block">
        <label className="w-full block" htmlFor="password">Password</label>
        <input className="w-full block bg-base-300" type="password" name="password" required autoComplete="on" />
      </p>
      {!isLogin && <p className="w-full block">
        <label className="w-full block" htmlFor="confirmPassword">Confirm Password</label>
        <input className="w-full block bg-base-300" type="password" name="confirmPassword" required autoComplete="on" />
      </p>}
      <div className="flex gap-4 content-end justify-center">
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Create new user' : 'Login'}
        </Link>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  )
}