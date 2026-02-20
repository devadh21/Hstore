'use client';

import { motion } from 'framer-motion';
import { CreditCard, Package, TrendingUp, Zap } from 'lucide-react';

interface ProfileDashboardProps {
    orders: any[];
    user: any;
}

export default function ProfileDashboard({ orders, user }: ProfileDashboardProps) {
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = orders.length > 0 ? totalSpent / orders.length : 0;

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-400' },
        { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: CreditCard, color: 'text-primary' },
        { label: 'Avg Order', value: `$${avgOrderValue.toFixed(2)}`, icon: TrendingUp, color: 'text-green-400' },
        { label: 'System Purity', value: '99.9%', icon: Zap, color: 'text-yellow-400' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-6 rounded-xl border border-white/5 flex items-center gap-6"
                >
                    <div className={`p-4 rounded-lg bg-white/5 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold font-mono">{stat.value}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
