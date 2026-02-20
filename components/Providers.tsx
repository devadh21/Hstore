'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';

interface ProvidersProps {
    children: ReactNode;
    session?: any;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <ThemeProvider>
            <SessionProvider session={session}>
                <CartProvider>
                    {children}
                </CartProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
