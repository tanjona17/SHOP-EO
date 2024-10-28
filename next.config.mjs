/** @type {import('next').NextConfig} */
import 'dotenv/config';
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        PASSWORD_KEY: process.env.PASSWORD_KEY,
        JWT_KEY: process.env.JWT_KEY,
        s: process.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
        STRIPE_SECRET_KEY: process.STRIPE_SECRET_KEY,
    }
};

export default nextConfig;
