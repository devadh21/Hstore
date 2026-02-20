'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added any artifacts yet.</p>
                <Link href="/products" className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:shadow-[0_0_20px_var(--primary)] transition-all">
                    Browse Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
                <span className="text-white">CART</span>
                <span className="h-px flex-1 bg-white/10"></span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="glass p-4 rounded-xl flex gap-4 md:gap-6 items-center group border border-white/5 hover:border-primary/30 transition-colors"
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <Link href={`/products/${item.id}`} className="font-bold text-lg hover:text-primary transition-colors">
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-gray-400">{item.category}</p>
                                </div>

                                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:text-primary transition-colors"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-mono">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:text-primary transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            onClick={clearCart}
                            className="text-gray-400 hover:text-white text-sm"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="glass p-8 rounded-xl border border-primary/20 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white font-mono">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-primary font-mono">FREE</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax</span>
                                <span className="text-white font-mono">$0.00</span>
                            </div>
                            <div className="h-px bg-white/10 my-4"></div>
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary font-mono">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_var(--primary)]"
                        >
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            Secured by Quantum Encryption Standard 256-bit
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
