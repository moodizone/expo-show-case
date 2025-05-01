export interface UserType {
  firstName?: string;
  lastName?: string;
  age?: number;
  email: string;
  phone: string;
}
export interface LoginResponse {
  user: UserType;
  token: string;
}
export type RegisterResponse = LoginResponse;
export interface VerifyResponse {
  success: boolean;
}
