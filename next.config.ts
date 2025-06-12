
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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Removed webpack function to resolve conflict with Turbopack.
  // If SVGR is still needed, Turbopack might pick up @svgr/webpack (already a dependency) automatically.
  // If not, experimental.turbo.rules for SVGR might be needed later.
  allowedDevOrigins: [
      "https://6000-firebase-studio-1746871893255.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev"
  ],
};

export default nextConfig;
