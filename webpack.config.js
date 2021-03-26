const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = (env, options) => {
  return {
    devtool: options.mode == 'development' ? 'inline-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            }
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'eslint-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"]
    },
    plugins: [
      new HTMLPlugin({
        template: path.join(__dirname, "src/index.html"),
      }),
      new WorkerPlugin()
    ],
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'dist'),
      watchOptions: {
        poll: 1000,
        ignored: [
          'node_modules'
        ]
      }
    }
  }
};
