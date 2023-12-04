const globImporter = require("node-sass-glob-importer");

module.exports = {
  html: true, // Leaving this as true for static deploys
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"],
    },

    hot: {
      react: true,
      reload: true,
      noInfo: false,
    },

    loaders: [
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: "react-svg",
      },
    ],

    production: {
      loaders: [
        {
          test: /\.js$/,
          loader:
            "strip-loader?strip[]=console.debug,strip[]=console.log,strip[]=console.error,strip[]=console.warn,strip[]=console.assert,strip[]=debugger",
          exclude: /node_modules/,
        },
      ],
    },

    babel: {
      presets: ["es2015", "stage-1", "react"],
      plugins: ["transform-object-assign"],
      env: {
        development: {
          presets: ["es2015", "stage-1", "react"],
          plugins: ["react-hot-loader/babel", "transform-object-assign"],
        },
      },
    },

    extensions: ["js", "json", "svg"],
  },

  stylesheets: {
    sass: {
      importer: globImporter(),
    },
  },

  browserSync: {

    server: {
      // should match `dest` in
      // path-config.json
      baseDir: "public",
    },

    files: [
      "public",
      "public/stylesheets/kogan",
    ],

    "path": "public"
  },

  production: {
    rev: true,
  },
};
