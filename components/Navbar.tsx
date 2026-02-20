'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, LogOut, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

function CartCount() {
    const { cartCount } = useCart();
    if (cartCount === 0) return null;
    return (
        <AnimatePresence>
            <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
            >
                {cartCount}
            </motion.span>
        </AnimatePresence>
    );
}

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-3"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-black tracking-tight shimmer-text">
                    HSTORE
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/products', label: 'Products' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname === href
                                ? 'text-white'
                                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                                }`}
                            style={pathname === href ? {
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            } : undefined}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: 'var(--surface-2)', color: 'var(--foreground-muted)' }}
                    >
                        {theme === 'dark'
                            ? <Sun className="w-4 h-4" />
                            : <Moon className="w-4 h-4" />
                        }
                    </button>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: 'var(--surface-2)', color: 'var(--foreground-muted)' }}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <CartCount />
                    </Link>

                    {/* Auth */}
                    {session ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/profile"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{ background: 'var(--surface-2)', color: 'var(--foreground-muted)' }}
                            >
                                <User className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{ background: 'var(--surface-2)', color: 'var(--foreground-muted)' }}
                                title="Sign Out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/api/auth/signin" className="btn-primary text-sm px-5 py-2">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}

