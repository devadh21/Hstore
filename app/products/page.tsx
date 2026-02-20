import { getAllProducts } from '@/serverAction/getAllProducts';
import ProductsCollection from '@/components/ProductsCollection';
import * as motion from 'framer-motion/client';

export default async function ProductsPage() {
    const products = await getAllProducts();

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="text-white">OUR</span> <span className="neon-text text-primary">COLLECTION</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore our curated selection of futuristic gear. From neural interfaces to high-energy cells, everything you need for the digital frontier.
                </p>
            </div>

            <ProductsCollection initialProducts={products} />
        </div>
    );
}
