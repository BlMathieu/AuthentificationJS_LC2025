export interface AuthResponse {
  status: boolean,
  message: string,
  token?: string,
}

export function getError(message: string): AuthResponse {
  return {
    status: false,
    message: message,
  };
}
export function getSuccess(message: string, token?: string): AuthResponse {
  return {
    status: true,
    message: message,
    token: token,
  };
}
