import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Think AI',
  description: 'A conversational AI platform powered by Google Genkit.',
};

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "font-body antialiased bg-background text-foreground",
        fontBody.variable,
        fontHeadline.variable,
        fontCode.variable
      )}>
        <AuthProvider>
          {children}
           <footer className="py-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Think AI. All rights reserved.</p>
          </footer>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
