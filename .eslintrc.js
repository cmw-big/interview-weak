module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器,使之能识别ts
  // 定义文件继承的子规范。prettier的ts样式规范。
  // 第二个继承是，如果ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
  extends: [
    // 使用@typescript-eslint/eslint-plugin的推荐规则
    'plugin:@typescript-eslint/recommended',
    // 这会将prettier错误作为ESLint错误来展示。确保这个配置放到数组的最后。
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true // 允许解析JSX
    }
  },
  env: {
    // 指定代码的运行环境
    browser: true,
    es2022: true
  },
  settings: {
    'import/parsers': {
      // 使用 TypeScript parser
      '@typescript-eslint/parser': ['.ts', '.tsx', 'js', 'jsx', '.d.ts']
    },
    'import/resolver': {
      // use a glob pattern
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {},
  overrides: [
    {
      files: ['*.ts?(x)'], // ts或者tsx文件，不检查没有定义的变量。因为ts本身就会检查这个
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}
