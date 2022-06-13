// import preactCliSwPrecachePlugin from 'preact-cli-sw-precache';
import asyncPlugin from 'preact-cli-plugin-fast-async';
import envVars from 'preact-cli-plugin-env-vars';
// const workboxBuild = require('workbox-build');

export default (config, env, helpers) => {
	  // const precacheConfig = {
    // staticFileGlobs: [
    //   // 'public/assets',
    //   'public/index.html',
    //   'public/manifest.json'
    // ],
    // runtimeCaching: [{
    //   urlPattern: /api\//,
    //   handler: 'networkFirst'
    // },{
    //   urlPattern: /api\/auth\/local\//,
    //   handler: 'networkOnly'
    // }],
	  //   stripPrefix: 'public/',
	  //   minify: true,
	  //   navigateFallback: 'index.html',
	  //   clientsClaim: true,
	  //   skipWaiting: true,
	  //   filename: 'sw.js'
	  // };
	  // let { index } = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0] || 0;
	  // // console.log(plugin.options);
	  // if (index) {
	  //   config.plugins.splice(index, 1);
	  //   // config.plugins.push(new ButternutWebpackPlugin());
	  // }
  envVars(config, env, helpers);
  // preactCliSwPrecachePlugin(config, precacheConfig);
  asyncPlugin(config);
	// return workboxBuild.injectManifest({
  //   swSrc: 'src/service-worker.js',
  //   swDest: 'build/service-worker.js',
  //   globDirectory: 'build',
  //   globPatterns: [
  //     'src/style/**/*.*',
  //     'public/index.html',
  //     'js/idb-promised.js',
  //     'js/main.js',
  //     'public/assets/**/*.*',
  //     'public/manifest.json'
  //   ]
  // }).then(resources => {
  //   console.log(`Injected ${resources.count} resources for precaching, ` +
  //       `totaling ${resources.size} bytes.`);
  // }).catch(err => {
  //   console.log('Uh oh', err);
  // });
};
