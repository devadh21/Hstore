'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">

            {/* ── Dark mode background ── */}
            <div className="hero-dark-overlay absolute inset-0 z-0" style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(236,72,153,0.15) 0%, transparent 60%)'
            }} />
            <div
                className="hero-dark-overlay absolute inset-0 opacity-[0.04] z-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />

            {/* ── Light mode background ── */}
            <div className="hero-light-bg absolute inset-0 z-0 hidden" style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(236,72,153,0.08) 0%, transparent 60%)'
            }} />

            {/* ── Floating orbs ── */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float z-0"
                style={{ background: 'var(--primary)', animationDelay: '0s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl animate-float z-0"
                style={{ background: 'var(--secondary)', animationDelay: '3s' }} />

            {/* ── Content ── */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8"
                >
                    <span className="badge">✦ Next Gen E-Commerce</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none"
                >
                    <span className="dark-only-text text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">FUTURE</span>
                    <span className="light-only-text hidden text-foreground">FUTURE</span>
                    <br />
                    <span className="shimmer-text">STORE</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl mb-12 max-w-xl mx-auto hero-subtitle"
                    style={{ color: 'var(--foreground-muted)' }}
                >
                    Discover cutting-edge products curated for the digital age. Experience shopping like never before.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/products" className="btn-primary text-lg px-10 py-4">
                        Start Exploring →
                    </Link>
                    <Link href="/products" className="btn-outline text-lg px-10 py-4">
                        View Collection
                    </Link>
                </motion.div>

                {/* Social proof */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-10 text-sm"
                    style={{ color: 'var(--foreground-muted)' }}
                >
                    ★★★★★ &nbsp;Trusted by <strong>10,000+</strong> customers worldwide
                </motion.p>
            </div>
        </section>
    );
}

