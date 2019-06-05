module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@components': './src/components',
          '@store': './src/store',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@ui': './src/shared/ui'
        }
      }
    ]
  ]
};
