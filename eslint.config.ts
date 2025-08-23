import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: [
      'templates',
      'src/themes/*.css',
      'README.md',
    ],
  },
  {
    files: ['service/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
)
