const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// otra forma de usar sass npm install -D mini-css-extract-plugin css-loader style-loader sass sass-loader
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// para minimizar todo para subirlo npm install -D css-minimizer-webpack-plugin terser-webpack-plugin

module.exports = {
  // performance: {
  //   hints: false,
  // },
  // optimization: {
  //   splitChunks: {
  //     minSize: 10000,
  //     maxSize: 250000,
  //   },
  // },
  performance: { hints: false },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },

      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      // con esto no sera necesario crear el script js en el html pues el lo hara por si mismo
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3005,
    historyApiFallback: true,
  },
};
