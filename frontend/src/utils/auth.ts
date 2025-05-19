import { redirect } from "react-router-dom";

export const getTokenDuration = (): number => {
  const storedExpirationDate = localStorage.getItem('tokenExpiration');
  if (!storedExpirationDate) {
    return -1;
  }
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration
}

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('DbooksToken');
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null
  }

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token;
}

export const tokenLoader = (): string | null => {
  return getAuthToken();
}

export const getUser = async (id: string) => {
  const response = await fetch('http://localhost:3000/user/' + id);
  if (!response.ok) {
    return null;
  }

  const responseData = await response.json();
  if (!responseData.user) {
    return null;
  }

  return responseData.user;
}
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null
}