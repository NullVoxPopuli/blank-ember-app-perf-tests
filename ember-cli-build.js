'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  if (process.env.LEGACY_BUILD) {
    console.log(`
      LEGACY_BUILD
    `);
    return app.toTree();
  }

  if (process.env.VITE) {
    console.log(`
      VITE
    `);
    return require('@embroider/compat').compatBuild(app, undefined, {
      skipBabel: [
        {
          package: 'qunit',
        },
      ],
      extraPublicTrees: [],
      staticAddonTrees: true,
      staticAddonTestSupportTrees: true,
      staticHelpers: true,
      staticModifiers: true,
      staticComponents: true,
      staticEmberSource: true,
      amdCompatibility: {
        es: [],
      },
    });
  }

  const { Webpack } = require('@embroider/webpack');
  console.log(`
      WEBPACK
    `);
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    extraPublicTrees: [],
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,
  });
};
