module.exports = function(api) {
  api.cache(true)
  return {
    presets: [["@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "node": "current",
          "browsers": ["last 2 versions", "ie >= 11"]
        }
      }
    ], "@babel/preset-react"],
    plugins: [
      '@babel/plugin-transform-runtime',
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-export-default-from",
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "@babel/plugin-transform-async-to-generator",
      "babel-plugin-lodash",
      'babel-plugin-styled-components',
    ],
    env: {
      test: {
        presets: [["@babel/preset-env", {
          "modules": false,
          targets: {node: "current"}
        }], "@babel/preset-react"],
        plugins: [
          '@babel/plugin-transform-runtime',
          "@babel/plugin-transform-modules-commonjs",
          "@babel/plugin-proposal-function-bind",
          "@babel/plugin-proposal-export-default-from",
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose": true }],
          "@babel/plugin-transform-async-to-generator", "babel-plugin-lodash",
          'babel-plugin-styled-components',
        ]
      }
    }
  }
}
