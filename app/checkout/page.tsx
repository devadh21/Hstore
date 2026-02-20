'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [shipping, setShipping] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Protect Route
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin?callbackUrl=/checkout');
        }
    }, [status, router]);

    // Pre-fill email
    useEffect(() => {
        if (session?.user?.email) {
            setShipping(prev => ({ ...prev, email: session.user?.email || '' }));
        }
        if (session?.user?.name) {
            setShipping(prev => ({ ...prev, name: session.user?.name || '' }));
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value });
        // Clear error as user types
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        const errors: Record<string, string> = {};
        if (!shipping.name.trim()) errors.name = 'Full name is required';
        if (!shipping.email.trim()) errors.email = 'Email address is required';
        if (!shipping.address.trim()) errors.address = 'Address is required';
        if (!shipping.city.trim()) errors.city = 'City is required';
        if (!shipping.zip.trim()) errors.zip = 'Zip / Postal code is required';

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsProcessing(true);

        try {
            // Create Order
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image
                    })),
                    total: cartTotal,
                    shipping
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Order API Error:', errorData);
                throw new Error(errorData.message || 'Order failed');
            }

            // Simulate payment processing delay for UX
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        } catch (error) {
            console.error('Checkout Submit Error:', error);
            setIsProcessing(false);
            alert(`Failed to place order: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-12 rounded-2xl max-w-md w-full text-center border border-primary/20"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                    <p className="text-gray-400 mb-8">
                        Your artifacts are being prepared for quantum transmission. Check your neural feed for tracking updates.
                    </p>
                    <Link href="/profile" className="block w-full py-3 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_var(--primary)] transition-all">
                        View Order History
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <span className="text-primary text-4xl">01</span>
                <span>CHECKOUT</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Shipping Info */}
                        <div className="glass p-6 rounded-xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6">Neural Link Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Full Name</label>
                                    <input
                                        type="text" name="name" value={shipping.name} onChange={handleInputChange}
                                        className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${fieldErrors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {fieldErrors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.name}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Email Address</label>
                                    <input
                                        type="email" name="email" value={shipping.email} onChange={handleInputChange}
                                        className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                            }`}
                                        placeholder="john@example.com"
                                    />
                                    {fieldErrors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.email}</p>}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Address</label>
                                    <input
                                        type="text" name="address" value={shipping.address} onChange={handleInputChange}
                                        className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${fieldErrors.address ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                            }`}
                                        placeholder="Sector 7, Block B"
                                    />
                                    {fieldErrors.address && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.address}</p>}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">City</label>
                                    <input
                                        type="text" name="city" value={shipping.city} onChange={handleInputChange}
                                        className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${fieldErrors.city ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                            }`}
                                        placeholder="Neo Tokyo"
                                    />
                                    {fieldErrors.city && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.city}</p>}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Zip / Postal Code</label>
                                    <input
                                        type="text" name="zip" value={shipping.zip} onChange={handleInputChange}
                                        className={`w-full bg-black/40 border rounded-lg px-4 py-3 focus:outline-none transition-colors ${fieldErrors.zip ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                                            }`}
                                        placeholder="10101"
                                    />
                                    {fieldErrors.zip && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.zip}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="glass p-6 rounded-xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <div className="col-span-2">
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Card Number</label>
                                    <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">Expiry Date</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">CVC</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary in Form (Mobile) */}
                        <div className="md:hidden glass p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Total</span>
                                <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isProcessing || cartTotal === 0}
                                className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_var(--primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Pay Now'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar (Desktop) */}
                <div className="hidden md:block">
                    <div className="glass p-6 rounded-xl border border-white/5 sticky top-24">
                        <h2 className="text-lg font-bold mb-4">Total Due</h2>
                        <div className="text-4xl font-bold font-mono text-primary mb-6">
                            ${cartTotal.toFixed(2)}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isProcessing || cartTotal === 0}
                            className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_var(--primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Pay Now'
                            )}
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Secure Connection Established
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
