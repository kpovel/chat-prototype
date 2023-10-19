/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
        include: /app/,
      });
    }

    return config;
  },
}

module.exports = nextConfig
