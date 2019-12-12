const path = require("path");
const yargs = require("yargs").argv;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scssLoaderRules = (loaderType = "string") => {
  return {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      loaderType === "string"
        ? require.resolve("css-loader")
        : {
            // to generate types for .scss files for typescript
            loader: require.resolve("css-loader"),
            // - options has an unknown property 'getLocalIdent'. These properties are valid:
            // object { url?, import?, modules?, sourceMap?, importLoaders?, localsConvention?, onlyLocals? }v
            options: {
              importLoaders: 2,
              sourceMap: true,
              localsConvention: "camelCase",
              onlyLocals: true,
              modules: {
                mode: "local",
                context: path.resolve(__dirname, "./src")
              }
            }
          },

      {
        loader: require.resolve("postcss-loader"),
        options: {
          config: {
            path: require.resolve("./postcss.config.js")
          },
          sourceMap: true
        }
      },
      {
        loader: require.resolve("sass-loader"),
        options: {
          sourceMap: true
        }
      }
    ]
  };
};

module.exports = {
  name: "mini-css",
  mode: "development",
  entry: { main: "./src/index.js" },
  output: {
    publicPath: "https://localhost/",
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    futureEmitAssets: true
  },
  resolve: { extensions: [".js", ".json"] },
  module: {
    strictExportPresence: true,
    rules: [scssLoaderRules(yargs.loaderType)]
  },
  externals: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
      ignoreOrder: false
    })
  ],
  devtool: "source-map",
  bail: true
};
