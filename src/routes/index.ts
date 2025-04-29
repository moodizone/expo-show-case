export const ROUTES = {
  login: "/login",
  register: "/register",
  onboarding: "/onboarding",
} as const;

export const publicRoutes = [ROUTES.login, ROUTES.register, ROUTES.onboarding];

// forbidden means user can not see them if has a auth session
export const forbiddenPublics = [ROUTES.login, ROUTES.register];
