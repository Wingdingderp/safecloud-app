// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "cdn.tristancamejo.com" },
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
    ],
  },
  redirects: async () => [
    {
      source: "/discord",
      destination: "https://discord.gg/Cys82j4zvV",
      permanent: true,
    },
    {
      source: "/join",
      destination: "/blog/join",
      permanent: true,
    },
    {
      source: "/map",
      destination: "http://132.145.128.206:8100",
      permanent: false,
    },
  ],
};
export default withNextra(config);
