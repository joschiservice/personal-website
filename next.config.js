/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Fix for react-spring not working properly
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'banners-my.flightradar24.com',
                pathname: '/joschi_service.png'
            }
        ]
    }
}

module.exports = nextConfig
