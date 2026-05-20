const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nextPlugin = require('eslint-config-next');

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextPlugin,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
