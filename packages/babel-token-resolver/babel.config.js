const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      process.env.NODE_ENV !== 'production'
        ? [
            'module-resolver',
            {
              alias: {
                // For development, we want to alias the library to the source
                ['dank-style']: path.join(__dirname, '../styled/src'),
              },
            },
          ]
        : ['transform-remove-console'],
    ],
  };
};
