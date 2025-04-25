# App Directory Structure

This app uses a route-based authentication system with the following structure:

## Route Groups

- `(public)` - Routes accessible without authentication
  - `onboarding` - Single page for first-time users
  - `sign-in` - Login page
  - `sign-up` - Multi-step registration process
    - Step 1: Email and password
    - Step 2: Phone number
    - Step 3: Password confirmation
    - Step 4: Email verification

- `(private)` - Routes requiring authentication
  - Tab-based navigation for main app features:
    - `posts` - User posts
    - `store` - Store section
    - `feed` - News feed
    - `settings` - User settings
    - `statistics` - User statistics

## Authentication

Authentication is handled through the `services/auth.ts` file which provides:
- Login
- Registration
- Email availability check
- 2FA for registration
- Token management

## Services

The `services` directory contains modular service files for different features:
- `auth.ts` - Authentication related services
- Future services will be added for:
  - User management
  - Posts
  - Products
  - etc.

## Validations

The `validations` directory contains all form validation logic:
- `auth.ts` - Authentication form validations
- `user.ts` - User profile validations
- etc.

## Styling

This project uses NativeWind for styling:
- All styles are written using Tailwind CSS classes
- Custom styles can be added in `tailwind.config.js`
- Components use className prop for styling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
```bash
npm run android # for Android
npm run ios # for iOS
``` 