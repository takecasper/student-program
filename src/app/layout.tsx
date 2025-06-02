import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import QueryProvider from '@/providers/QueryProvider';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Acuity Learning Portal',
  description: 'A learning management system for students and educators',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
