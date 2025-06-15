import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io", "66ifvzl9hi.ufs.sh"],
  },
  allowedDevOrigins: ["checkout.stripe.com"],

};

export default withNextIntl(nextConfig);
