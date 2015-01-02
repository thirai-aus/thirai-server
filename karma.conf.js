module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/components/angular/angular.js',
      'src/components/angular-mocks/angular-mocks.js',
      'src/components/jquery/dist/jquery.min.js',
      'src/js/test/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
