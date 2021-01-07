"use strict";

var CracoLessPlugin = require('craco-less');

var CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", {
      legacy: true
    }], // antd 样式按需引入，不需要引入整个css
    ["import", {
      "libraryName": "antd",
      "style": true
    }]]
  },
  plugins: [{
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }, {
    plugin: CracoLessPlugin,
    options: {
      modifyLessRule: function modifyLessRule(lessRule, _context) {
        lessRule.test = /\.(less)$/;
        lessRule.use = [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true
          }
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }];
        lessRule.exclude = /node_modules/;
        return lessRule;
      }
    }
  }, {
    plugin: CracoAlias,
    options: {
      source: 'tsconfig',
      tsConfigPath: './tsconfig.extend.json',
      baseUrl: './src'
    }
  }]
};