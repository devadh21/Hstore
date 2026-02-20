'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Share2, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function ProductDetail({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Product Image Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
            >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass border-2 border-primary/20 p-2">
                    <div className="absolute inset-0 bg-primary/5 z-0"></div>
                    {/* Holographic scanning effect */}
                    <div className="absolute h-1 w-full bg-primary/30 blur-sm animate-[scan_3s_ease-in-out_infinite] z-20 top-0"></div>

                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-xl z-10 hover:scale-105 transition-transform duration-500"
                    />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border border-secondary/30 rounded-full animate-spin-slow"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-primary/20 rounded-full dashed-border animate-spin-reverse-slow"></div>
            </motion.div>

            {/* Product Info Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono rounded">
                        {product.category}
                    </span>
                    <span className="text-green-400 text-xs font-mono flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        SYSTEM ONLINE
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-white/5 rounded-xl border border-white/5">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                        <div key={key}>
                            <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">{key}</span>
                            <span className="text-white font-mono">{String(value)}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <div className="text-3xl font-bold text-white">
                        ${product.price.toFixed(2)}
                    </div>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-primary text-black font-bold py-4 px-8 rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_var(--primary)] group"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Add to Cart
                    </button>
                    <button className="p-4 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 hover:text-primary transition-colors">
                        <Heart className="w-6 h-6" />
                    </button>
                    <button className="p-4 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 hover:text-primary transition-colors">
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Verified Authenticity • Quantum Encrypted Transaction</span>
                </div>

            </motion.div>
        </div>
    );
}
