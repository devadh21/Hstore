import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const body = await req.json();
        const { items, total, shipping } = body;

        console.log('Creating order for user:', user._id);
        console.log('Order payload:', { items, total, shipping });

        const order = await Order.create({
            user: user._id,
            items,
            total,
            shipping,
            status: 'Processing',
        });

        console.log('Order created:', order._id);

        return NextResponse.json({ message: 'Order created', orderId: order._id }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return NextResponse.json({ message: 'Validation Error', errors: messages }, { status: 400 });
        }
        console.error('Order Creation Error Full:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: String(error) }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error('Order Fetch Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
