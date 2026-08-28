import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

//good to know
//https://webpack.js.org/concepts/
//https://webpack.js.org/guides/asset-management/
//These are all npm installed with "npm install --save-dev"
//webpack webpack-cli html-webpack-plugin style-loader css-loader html-loader webpack-dev-server webpack-merge
//Webpack server command "npx webpack serve"

export default {
  mode: "development",
  entry: "./src/index.js",
  output: { //output from running webpack
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true, //clean the dist directory every time we create a new output
  },
  devtool: "eval-source-map", //any error messages reference files and lines from development code
  devServer: {
    watchFiles: ["./src/index.html"], //tell Webpack to watch for changes in the html file as html files are not automatically included in being watched for changes
  },
  plugins: [
    new HtmlWebpackPlugin({ //enable us to include html files in webpack
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      { //enable us to use css files
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], //the loader order matters. Chain is executed right to left
      },
      { //enable us to use image files we reference in our html template  e.g. as src of an <img>
        test: /\.html$/i,
        use: ["html-loader"],
      },
      { //enable us to use images in our JavaScript where we will need to import the files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};