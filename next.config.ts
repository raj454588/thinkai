import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // This is to prevent the restart loop caused by genkit's file watcher
    // We ignore the .genkit directory from being watched by webpack.
    config.watchOptions.ignored = [
        ...config.watchOptions.ignored,
        '**/.genkit/**',
    ];
    return config;
  },
};

export default nextConfig;
