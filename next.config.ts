/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // هذا هو السطر اللي يحول مشروعك لملفات ثابتة خفيفة
  images: {
    unoptimized: true, // ضروري عشان الصور تشتغل في الـ Static Export
  },
};

module.exports = nextConfig;