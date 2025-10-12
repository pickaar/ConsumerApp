module.exports = {
  // Specify the environment where your code runs
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true, // Enable React Native environment
  },
  // Extend recommended configurations and Prettier settings
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Integrates Prettier
    'prettier', // Turns off rules that conflict with Prettier
  ],
  // Specify parser options
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // Add plugins for React and React Native
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    'prettier',
  ],
  // Custom rules for your project
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Optional: turn off prop-types checking (if using TypeScript or not enforcing prop-types)
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': ['error', {
      skip: ['CustomText'], // Example: skip text component wrappers
    }],
    // Add other custom rules here...
  },
  // Settings for plugins
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};