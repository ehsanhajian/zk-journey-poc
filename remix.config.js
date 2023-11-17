import { config } from "@netlify/remix-adapter";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...(process.env.NODE_ENV === "production" ? config : undefined),
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
      util: true,
    },
  },
};
