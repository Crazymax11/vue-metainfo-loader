module.exports = {
  resolveLoader: {
    modules: ['node_modules', 'src'],
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
      {
        test: /\.vue$/,
        loaders: ['loader'],
        enforce: 'pre',
      },
    ],
  },
};
