'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

export default function ProductsCollection({ initialProducts }: { initialProducts: Product[] }) {
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(initialProducts.map(p => p.category))];

    const filteredProducts = filter === 'All'
        ? initialProducts
        : initialProducts.filter(p => p.category === filter);

    return (
        <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 ${filter === category
                            ? 'bg-primary text-black border-primary shadow-[0_0_15px_var(--primary)]'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-primary/50 hover:text-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    No artifacts found in this sector.
                </div>
            )}
        </>
    );
}
