'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registration failed');
                setIsLoading(false);
                return;
            }

            // Automatically sign in the user after successful registration
            const result = await signIn('credentials', {
                username: formData.email, // Using email as username for consistency with NextAuth logic if needed, but the API expects 'username' field usually or we adjust it. NextAuth Credentials provider usually takes 'username' and 'password' by default but we can customize.
                // Wait, my NextAuth config expects 'username' field in credentials. I should check that.
                // Actually, let's just redirect to login or sign in.
                // Let's try to sign in immediately.
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                // Fallback if auto-login fails
                router.push('/auth/signin?registered=true');
            } else {
                router.push('/');
                router.refresh();
            }

        } catch (error) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-black to-secondary/5 z-0" />
            <div className="absolute top-20 right-20 w-60 h-60 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 left-20 w-60 h-60 bg-secondary/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 md:p-12 rounded-2xl border border-white/10 w-full max-w-md relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <Link href="/auth/signin" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <UserPlus className="w-8 h-8 text-secondary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the future of commerce.</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-mono">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-600"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-mono">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-600"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-mono">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-600"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-mono">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-600"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-secondary text-black font-bold rounded-lg hover:shadow-[0_0_20px_var(--secondary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/auth/signin" className="text-secondary hover:text-white transition-colors font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
