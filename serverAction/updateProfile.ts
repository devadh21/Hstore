'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: { name: string; image?: string }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return { error: 'Unauthorized' };
        }

        await dbConnect();
        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { name: formData.name, image: formData.image },
            { new: true }
        );

        if (!user) {
            return { error: 'User not found' };
        }

        revalidatePath('/profile');
        return { success: true, user: { name: user.name, image: user.image } };
    } catch (error) {
        console.error('Update Profile Error:', error);
        return { error: 'Failed to update profile' };
    }
}
