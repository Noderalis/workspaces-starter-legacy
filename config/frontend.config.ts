/* eslint-disable prettier/prettier */
import HtmlPlugin from 'html-webpack-plugin';
import CssPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import isProductionBuild from './util/env';
import paths from './util/paths';

const frontend: Configuration = {
  entry: {
    'static/js/app': paths.source.frontend.app,
    server: paths.source.frontend.server,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          isProductionBuild ? CssPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      chunks: ['static/js/app'],
      hash: true,
      meta: {
        description:
          'A starter for Yarn 2 workspaces, TypeScript, Webpack with ESLint + Prettier support',
      },
      inject: true,
      filename: 'public/index.html',
      minify: isProductionBuild
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
      scriptLoading: 'defer',
      template: paths.source.template.html,
    }),
    new CssPlugin({
      filename: `static/css/[contentHash:16].css`,
      chunkFilename: `static/css/[contentHash:16].chunk.css`,
    }),
  ],
};

export default frontend;
