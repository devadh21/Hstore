'use client';

import { motion } from 'framer-motion';
import { Package, Loader2 } from 'lucide-react';

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

interface OrderHistoryProps {
    orders: Order[];
    isLoading: boolean;
}

export default function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Package className="text-primary" />
                    Transaction Logs
                </h2>
                <div className="text-right">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Security Protocol</span>
                    <p className="text-primary text-xs font-mono">ENCRYPTED HISTORY</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 glass rounded-2xl border border-white/5 border-dashed">
                    <p className="text-gray-500 font-mono">NO ACTIVE LOGS FOUND IN THIS SECTOR</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="glass group p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="space-y-1">
                                    <p className="text-lg font-bold font-mono text-white group-hover:text-primary transition-colors tracking-tight">
                                        ID: {order._id.slice(-8).toUpperCase()}
                                    </p>
                                    <p className="text-xs text-gray-500 font-mono">TIMESTAMP: {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center md:justify-end gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${order.status === 'Delivered' ? 'bg-green-400' : 'bg-primary'
                                            }`}></span>
                                        <span className={`text-xs font-bold font-mono ${order.status === 'Delivered' ? 'text-green-400' : 'text-primary'
                                            }`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold font-mono">${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="border-t border-white/5 pt-4">
                                <p className="text-xs text-gray-400 font-mono">
                                    <span className="text-gray-600 mr-2">MANIFEST:</span>
                                    {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
