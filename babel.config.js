module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          alias: {
            '@components': './app/components',
            '@screens': './app/screens',
            '@utils': './app/utils',
            '@hooks': './app/hooks',
            '@reducer': './app/store/reducer',
            '@thunk': './app/store/thunk',
            '@store': './app/store',
            '@app': './app',
            '@nav': './app/navigators',
            '@assets': './assets',
          },
        },
      ], 
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],

      'react-native-reanimated/plugin',
    ], 
  }; 
}; 