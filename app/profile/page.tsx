'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Clock, Shield, Loader2 } from 'lucide-react';

interface OrderItem {
    name: string;
    quantity: number;
}

interface Order {
    _id: string;
    createdAt: string;
    total: number;
    status: string;
    items: OrderItem[];
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/api/auth/signin');
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user?.email) {
            const fetchOrders = async () => {
                try {
                    const res = await fetch('/api/orders');
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                } finally {
                    setIsLoadingOrders(false);
                }
            };
            fetchOrders();
        }
    }, [session]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen py-12 px-6 max-w-4xl mx-auto">

            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-2xl border border-primary/20 mb-12 flex flex-col md:flex-row items-center gap-8"
            >
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center border-2 border-primary overflow-hidden">
                        {session.user?.image ? (
                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-16 h-16 text-primary" />
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-black"></div>
                </div>

                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold mb-2">{session.user?.name}</h1>
                    <p className="text-gray-400 font-mono mb-4">{session.user?.email}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs rounded-full flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            Elite Member
                        </span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-full flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Joined 2053
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Order History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Package className="text-primary" />
                    Order History
                </h2>

                {isLoadingOrders ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12 glass rounded-xl border border-white/5">
                        <p className="text-gray-400">No orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <p className="text-lg font-bold font-mono text-white">#{order._id.slice(-6).toUpperCase()}</p>
                                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-sm text-gray-400">Items: {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
