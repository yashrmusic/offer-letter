/** @type {import('next').NextConfig} */
const nextConfig = {
    // Force Vercel to include template files in the serverless function bundle
    outputFileTracingIncludes: {
        '/api/generate-docx': ['./templates/**/*'],
    },
};

export default nextConfig;
