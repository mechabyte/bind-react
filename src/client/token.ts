const ACCESS_TOKEN_KEY = 'core/accessToken';

export function getToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setToken(token: string) {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
