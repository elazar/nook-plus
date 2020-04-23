const path = require("path");
const postcssPurgecss = require("@fullhuman/postcss-purgecss");

const purgecss = postcssPurgecss({
  content: ["./build/**/*.html", "./build/**/*.js"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build/js"),
    publicPath: "./js/",
    filename: "app.js",
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      use: {
        loader: "babel-loader"
      }
    },{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1
          }
        },
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [
              require("tailwindcss"),
              require("autoprefixer"),
              ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
            ],
          }
        }
      ]
    }]
  }
};
