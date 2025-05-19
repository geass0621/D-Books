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
  const token = localStorage.getItem('token');
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

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null
}