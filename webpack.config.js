var path = require('path');
var webpack = require('webpack');

module.exports =
   {
       context: __dirname + '/source',
       cache: false,
       entry: {
           main: ['./require.ts', './index.ts']
       },

       output: {
           path: __dirname + '/dist/js',
           filename: 'overlord.js',
           library: 'Overlord',
       },

       resolve: {
           modules: ['node_modules', 'source'],
           extensions: ['.ts', '.js']
       },

       module: {
           rules: [
               {
                   test: /\.tsx?$/,
                   include: /(source)/,
                   exclude: /(node_modules|source\/tests)/,
                   use: { loader: 'ts-loader' }
               }]
       },
       plugins: [],
       devtool: 'sourcemap',
   };
