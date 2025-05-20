import { redirect } from "react-router-dom";

export const logoutAction = () => {
  localStorage.removeItem('DbooksToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('tokenExpiration');

  return redirect('/');
}