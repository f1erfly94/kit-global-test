import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './providers';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog | A modern single-page blog',
  description: 'A blog built with Next.js, Redux Toolkit, TypeScript, and Firebase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <h1 className="text-2xl font-bold text-gray-900">My blog</h1>
                  <nav className="flex space-x-4">
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Main Page
                    </Link>
                    <Link
                      href="/create"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Create post
                    </Link>
                  </nav>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
              {children}
            </main>

            <footer className="bg-gray-800 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <p>&copy; 2025 My Blog. All rights reserved.</p>
                  <p className="text-gray-400 mt-2">
                    Built with Next.js, Redux Toolkit, and Firebase
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
