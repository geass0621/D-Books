import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

export const AuthForm: React.FC = () => {
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
      {actionData && actionData.errors && actionData.errors.length > 0 && (
        <div className="alert alert-error mb-4">
          <ul>
            {actionData.errors.map((error: string, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <Form method="POST" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="input w-full"
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              autoComplete="new-password"
              className="input w-full"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn ${isSubmitting ? 'btn-disabled' : 'btn-primary'} w-full`}
        >
          {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </Form>
      <p className="mt-4">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} onClick={() => setSearchParams({ mode: isLogin ? 'signup' : 'login' })} className="text-blue-500 ml-1">
          {isLogin ? 'Sign Up' : 'Login'}
        </Link>
      </p>
    </div>
  )
}