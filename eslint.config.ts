import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: [
      'templates',
    ],
  },
  {
    files: ['service/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
)
