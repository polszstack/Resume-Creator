import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// @ts-ignore: global CSS import without module declaration
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Resume Builder - Create Professional Resumes',
  description: 'Build professional resumes with AI-powered assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

 