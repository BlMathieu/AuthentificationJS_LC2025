export interface AuthResponse {
  status: boolean;
  message: string;
}

export function getError(message: string): AuthResponse {
  return {
    status: false,
    message: message,
  };
}
export function getSuccess(message: string): AuthResponse {
  return {
    status: true,
    message: message,
  };
}
