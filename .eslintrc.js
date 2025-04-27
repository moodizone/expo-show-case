module.exports = {
  extends: [
    'expo',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react-hooks', '@typescript-eslint'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};