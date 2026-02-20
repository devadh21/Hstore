'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';


export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };



    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="glass rounded-2xl overflow-hidden group relative"
            style={{ border: '1px solid var(--card-border)' }}
        >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden product-img-bg" style={{ background: 'var(--surface-2)' }}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
                    <button
                        onClick={handleAddToCart}
                        className="btn-primary px-5 py-2.5 text-sm"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold category-badge"
                    style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--primary)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {product.category}
                </div>
            </div>

            {/* Info */}
            <div className="p-5">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-black shimmer-text">
                        ${product.price.toFixed(2)}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

