export interface EmailFormData {
  email: string;
}

export interface VerificationFormData {
  code: string;
}

export interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export type ForgotPasswordStep =
  | "email"
  | "verification"
  | "newPassword"
  | "success";
