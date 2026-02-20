import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product';
import { Product } from '@/lib/types';
import mongoose from 'mongoose';

export async function getProductById(id: string): Promise<Product | null> {
    try {
        await dbConnect();

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error(`Invalid product ID: ${id}`);
            return null;
        }

        const result = await ProductModel.findById(id).lean();

        if (!result) {
            return null;
        }

        const product: Product = {
            id: result._id.toString(),
            name: result.name,
            description: result.description,
            price: result.price,
            image: result.image,
            category: result.category,
            specs: result.specs instanceof Map ? Object.fromEntries(result.specs) : (result.specs || {}),
        };

        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
}
