/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: {
    "Permissions-Policy": "ch-ua-form-factor=(*)",
  },
}

module.exports = nextConfig
