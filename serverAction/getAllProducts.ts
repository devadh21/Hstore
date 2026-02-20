import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product';
import { Product } from '@/lib/types';

export async function getAllProducts(): Promise<Product[]> {
    try {
        await dbConnect();
        const result = await ProductModel.find().sort({ createdAt: -1 }).lean();

        const cleanedProducts: Product[] = result.map((product: any) => ({
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            specs: product.specs instanceof Map ? Object.fromEntries(product.specs) : (product.specs || {}),
        }));

        return cleanedProducts;
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}
