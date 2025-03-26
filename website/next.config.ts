import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },
};

export default nextConfig;
