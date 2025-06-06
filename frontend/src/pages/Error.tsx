import { useRouteError, isRouteErrorResponse, useNavigate, Link } from 'react-router-dom';
import PageContent from '../Components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.data.message;
    }
    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
      <div className="text-center mt-4">
        <Link to="/" className="btn">Go Home</Link>
        <button
          className="btn ml-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default ErrorPage;