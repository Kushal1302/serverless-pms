import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Optional: Define files to ignore
    ignores: ['dist/', 'node_modules/'],
  }
);
