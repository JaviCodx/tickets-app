/** @type {import('next').NextConfig} */
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  reactStrictMode: true,
};
