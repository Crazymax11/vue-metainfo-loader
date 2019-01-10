module.exports = {
  resolveLoader: {
    modules: ['node_modules', 'loader'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        loaders: ['pug-plain-loader'],
      },
    ],
  },
};
