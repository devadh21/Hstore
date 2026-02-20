'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function addProduct(productData: any) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return { error: 'Unauthorized' };
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });

        if (!user || user.role !== 'admin') {
            return { error: 'Permission denied. Admin role required.' };
        }

        // Clean up specs if they are empty
        if (productData.specs) {
            Object.keys(productData.specs).forEach(key => {
                if (!productData.specs[key]) delete productData.specs[key];
            });
        }

        const product = await Product.create(productData);

        revalidatePath('/products');
        revalidatePath('/');

        return { success: true, productId: product._id.toString() };
    } catch (error) {
        console.error('Add Product Error:', error);
        return { error: 'Failed to add product' };
    }
}
