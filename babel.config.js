module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'], // The base directory for all modules
          alias: {
            // Define your aliases here:
            '@components': './app/components',
            '@screens': './app/screens',
            '@utils': './app/utils',
            '@hooks': './app/hooks',
            '@reducer': './app/store/reducer',
            '@thunk': './app/store/thunk',
            '@store': './app/store',
            '@app': './app',
            '@nav': './app/navigators',
            '@assets': './assets', // Can point outside the root if needed
          },
        },
       'react-native-reanimated/plugin',
      ],
    ],
  };
};