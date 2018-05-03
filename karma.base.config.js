var webpack_config = require('./webpack.config.js');

webpack_config.output = undefined;
webpack_config.entry = undefined;
webpack_config.cache = true;

webpack_config.module.rules.push({
   enforce: 'post',
   test: /\.tsx?$/,
   include: /(source)/,
   exclude: /(node_modules|source\/tests)/,
   use: { loader: 'istanbul-instrumenter-loader' }
});

module.exports = {

   basePath: '',
   browsers: [
       'Chrome'/*PhantomJS*/
   ],
   browserNoActivityTimeout: 30000,
   files: [
       'source/tests/**/*.test.ts',
       'node_modules/es6-shim/es6-shim.js'
   ],
   mime: {
       'text/x-typescript': ['ts', 'tsx']
   },
   frameworks: ['jasmine'],

   webpack: webpack_config,
   webpackMiddleware: { quiet: true, stats: { colors: true } },

   preprocessors: {
       'source/**/*.ts': ['webpack', 'sourcemap', 'coverage'],
       'source/tests/*.ts': ['webpack', 'sourcemap']
   },

   reporters: ['coverage', 'progress', 'htmlDetailed', 'junit'],
   junitReporter: { outputDir: 'dist/test-results/' },
   coverageReporter: {
       // specify a common output directory
       dir: 'dist/test-results/',
       reporters: [
           // reporters not supporting the `file` property
           /* { type: 'html', subdir: 'coverage' }, // bug https://github.com/webpack-contrib/istanbul-instrumenter-loader/issues/34 */
           { type: 'cobertura', subdir: '.', file: 'coverage.xml' },
           { type: 'text', subdir: '.', file: 'coverage.txt' },
           { type: 'text-summary' }, /** this outputs to console (no file given) */
           { type: 'text-summary', subdir: '.', file: 'coverage-summary.txt' }
       ]
   },

   colors: true,
   noResolve: false
};
