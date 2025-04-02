import AuthInterface from "../types/AuthInterface";

export function authError(message: string): AuthInterface {
  return {
    status: false,
    message: message,
  };
}
export function authSuccess(message: string, token?: string): AuthInterface {
  return {
    status: true,
    message: message,
    token: token,
  };
}
