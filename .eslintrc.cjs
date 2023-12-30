module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.cjs', '.tsx', '.d.ts'],
      },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs,ts,tsx}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { vars: 'all' }],
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-no-target-blank': 'warn',
    'react/require-default-props': 'off', // Cho phép không cần truyền default cho props
    'react/button-has-type': 0, // Cho phép thẻ button có thể không cần thuộc tính type
    'import/prefer-default-export': 0, // Cho phép file có thể không cần export default
    '@typescript-eslint/no-explicit-any': 0, // Cho phép sử dụng "any" type
    'import/no-unresolved': 0,
    'import/extensions': 0, // Hỗ trợ import dễ nhìn hơn là ../../
    'react/jsx-no-useless-fragment': 0, // Cho phép sử dụng thẻ Fragment
    'jsx-a11y/label-has-associated-control': 0, // Tắt bắt lỗi: Thẻ label và input cùng trỏ đến ID nhưng vẫn báo lỗi
    '@typescript-eslint/no-var-requires': 0, // Cho phép import require
    'react/jsx-props-no-spreading': 0, // Cho phép sử dụng toán tử spread
    'react/no-unescaped-entities': 0, // Cho phép sử dụng HTML escape (', ", >, }) bên trong JSX Element
    // 'react/no-unstable-nested-components': 0, // Có thể khai báo Nested Component (Tức là tạo 1 components JSX bên trong component)
    'jsx-a11y/no-static-element-interactions': 0, // Bỏ qua việc yêu cầu phím hỗ trợ cho các event của element tag
    'jsx-a11y/click-events-have-key-events': 0, // Bỏ qua việc yêu cầu phím hỗ trợ cho các event của element tag
    'comma-dangle': [2, 'always-multiline'],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    // 'import/no-unresolved': 'error',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: true,
        trailingComma: 'all',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 80,
        jsxSingleQuote: true,
        bracketSpacing: true,
      },
    ],
  },
};
