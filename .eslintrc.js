/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'expo',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react-hooks', '@typescript-eslint'],
  ignorePatterns: [
    '**/*.js',
    'dist/',
    'node_modules/',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
    },
  ],
};
