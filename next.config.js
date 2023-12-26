/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      process.env.HOSTNAME.match(/(http(?:s)?:\/\/)(.*)/)[2], // Valid WP Image domain.
      "2.gravatar.com",
      "0.gravatar.com",
      "secure.gravatar.com",
  ],
  },
 
}

module.exports = nextConfig
