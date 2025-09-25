// utils/auth.js
export function getToken() {
  return localStorage.getItem("token");
}

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    const expiry = payload.exp * 1000; // JWT exp is in seconds
    return Date.now() > expiry;
  } catch (err) {
    return true; // if invalid token
  }
}

export function isAuthenticated() {
  const token = getToken();
  return token && !isTokenExpired(token);
}
