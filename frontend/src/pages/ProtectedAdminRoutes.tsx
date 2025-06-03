import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user-slice";
import AdminNavigation from "../Components/Admin/AdminNavigation";

const ProtectedAdminRoute: React.FC = () => {
  const user = useAppSelector(selectUser);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  if (user.loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is logged in and has admin role
  return user && user.id && user.role === 'admin' && user.email === adminEmail ?
    <>
      <AdminNavigation />
      <Outlet />
    </>
    : <Navigate to="/auth?mode=login" replace />;
}

export default ProtectedAdminRoute;