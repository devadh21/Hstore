
import Product from "@/models/Product";
import dbConnect from '@/lib/db';

const products = [
    {

        name: 'Neon Cyber Deck 2',
        description: 'High-performance portable computing unit with holographic display and neural interface compatibility.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
        category: 'Electronics',
        specs: {
            Processor: 'Quantum Core i9',
            Memory: '64TB Neural RAM',
            Display: 'Holographic 4K',
            Battery: 'Fusion Cell (100h)'
        }
    }
];

export default async function seedProducts() {
    await dbConnect();

    await Product.insertMany(products);
    console.log("Product added")
    return (
        <div>
            <h1>Seed Products</h1>
        </div>
    )
}