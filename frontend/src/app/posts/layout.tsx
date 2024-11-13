import type { Metadata } from 'next';
import React from 'react';
import { Container } from '@radix-ui/themes';

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
    <Container size={'4'} style={{
      padding: '0 20px',
      scrollBehavior: 'smooth',
    }}>
      {children}
    </Container>
  );
}
