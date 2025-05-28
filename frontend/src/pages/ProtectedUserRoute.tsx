import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user-slice';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute: React.FC = () => {
  const user = useAppSelector(selectUser);
  if (user.loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  console.log('ProtectedUserRoute', user);

  return user && user.id ? <Outlet /> : <Navigate to="/auth?mode=login" replace />;
}

export default ProtectedUserRoute;