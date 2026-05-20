const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nextPlugin = require('eslint-config-next');

const nextConfig = nextPlugin[0] || nextPlugin;

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
