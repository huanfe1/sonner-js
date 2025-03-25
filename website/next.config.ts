import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                hostname: 'github.com',
            },
        ],
    },
};

export default nextConfig;
