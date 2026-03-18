import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'DevOps Quest',
  description: 'Learn DevOps like a game',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
