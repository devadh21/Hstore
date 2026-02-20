'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

// New Components
import ProfileTabs from '@/components/ProfileTabs';
import ProfileDashboard from '@/components/ProfileDashboard';
import OrderHistory from '@/components/OrderHistory';
import AddProductForm from '@/components/AddProductForm';
import AccountDetails from '@/components/AccountDetails';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
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

    if (!session) return null;


    const isAdmin = (session.user as any).role === 'admin';

    return (
        <div className="min-h-screen py-12 px-6 max-w-5xl mx-auto">

            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-2xl border border-primary/20 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"></div>

                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-black/40 flex items-center justify-center border-2 border-primary overflow-hidden shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                        {session.user?.image ? (
                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-16 h-16 text-primary" />
                        )}
                    </div>
                </div>

                <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">{session.user?.name}</h1>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-center md:self-auto ${isAdmin ? 'bg-primary text-black' : 'bg-white/5 text-gray-400'
                            }`}>
                            {isAdmin ? 'ADMIN ACCESS' : 'MEMBER'}
                        </span>
                    </div>
                    <p className="text-gray-500 font-mono text-sm mb-4">{session.user?.email}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="flex items-center gap-2 text-primary">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs font-mono">BIOMETRIC VERIFIED</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    title="Terminate Session"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </motion.div>

            {/* Navigation Tabs */}
            <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isAdmin={isAdmin}
            />

            {/* Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                        <ProfileDashboard key="dashboard" orders={orders} user={session.user} />
                    )}

                    {activeTab === 'orders' && (
                        <OrderHistory key="orders" orders={orders} isLoading={isLoadingOrders} />
                    )}

                    {activeTab === 'add-product' && isAdmin && (
                        <AddProductForm key="add-product" />
                    )}

                    {activeTab === 'account' && (
                        <AccountDetails key="account" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
