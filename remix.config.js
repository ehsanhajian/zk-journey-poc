/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      events: true,
      string_decoder: true,
      stream: true,
      assert: true,
      url: true,
      http: true,
      https: true,
      zlib: true,
      util: true
    }
  }
};
