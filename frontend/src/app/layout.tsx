import type { Metadata } from 'next';
import '@/styles/global.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import styles from '@/styles/Main.module.scss';
import { ThemeProvider } from './theme-provider';
import NavBar from '@/components/NavBar';
import { LazyMotion, domAnimation } from 'framer-motion';
import * as m from 'framer-motion/m';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Theme>
            <NavBar />
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className={styles.mainContainer}>
                  {children}
                </div>
              </m.div>
            </LazyMotion>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
