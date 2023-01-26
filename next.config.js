/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			`prismic-templates-website.cdn.prismic.io`,
			"images.prismic.io",
			"prismic-io.s3.amazonaws.com",
		],
		formats: ["image/avif", "image/webp"],
	},
}

module.exports = nextConfig
