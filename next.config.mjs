/** @type {import('next').NextConfig} */
import 'dotenv/config';
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        PASSWORD_KEY: process.env.PASSWORD_KEY,
        JWT_KEY: process.env.JWT_KEY
    }
};

export default nextConfig;
