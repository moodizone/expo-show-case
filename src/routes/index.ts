export const ROUTES = {
  home: "/",
  hi: "/hi",
  login: "/login",
  register: {
    root: "/register",
    phone: "/register/phone",
    password: "/register/password",
    faceId: "/register/faceId",
  },
  onboarding: "/onboarding",
} as const;

export const publicRoutes = [
  ROUTES.login,
  ROUTES.register.root,
  ROUTES.register.phone,
  ROUTES.register.password,
  ROUTES.register.faceId,
  ROUTES.onboarding,
  ROUTES.hi,
];

// forbidden means user can not see them if has a auth session
export const forbiddenPublics = [
  ROUTES.login,
  ROUTES.register.root,
  ROUTES.register.phone,
  ROUTES.register.password,
  ROUTES.register.faceId,
  ROUTES.hi,
];
