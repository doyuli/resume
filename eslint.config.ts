import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    files: ['service/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
)
