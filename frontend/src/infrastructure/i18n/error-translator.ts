/**
 * Translates backend error messages to translation keys
 */
export function translateErrorMessage(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    "Email already exists": "errors.emailAlreadyExists",
    "Invalid credentials": "errors.invalidCredentials",
    "Login failed": "errors.loginFailed",
    "Registration failed": "errors.registrationFailed",
    "User not found": "errors.userNotFound",
    "Invalid email": "errors.invalidEmail",
    "Invalid password": "errors.invalidPassword",
  };

  return errorMap[errorMessage] || errorMessage;
}
