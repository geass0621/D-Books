import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import PageContent from '../Components/PageContent';

function ErrorPage() {
  const error = useRouteError();
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
        <button
          className="btn"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
        <button
          className="btn ml-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default ErrorPage;