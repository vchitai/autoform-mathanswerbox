Package.describe({
  name: 'vchitai:autoform-mathanswerbox',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Fast Math Answer Box for aldeed:autoform',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/vchitai/meteor-autoform-mathanswerbox',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('ecmascript');
    api.use([
        'templating',
        'jquery',
        'aldeed:autoform',
    ], 'client');

    api.addFiles([
        'client/afMathText.html',
        'client/afMathText.js',
        'client/mathquill.css',
        'client/mathquill.js',
    ], 'client');
});