'use client';

import { useState } from 'react';
import { updateProfile } from '@/serverAction/updateProfile';
import { motion } from 'framer-motion';
import { User, Loader2, CheckCircle, Mail, Camera } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AccountDetails() {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        image: session?.user?.image || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        const result = await updateProfile(formData);

        if (result.success) {
            setSuccess(true);
            await update({ name: formData.name }); // Update NextAuth session
        } else {
            setError(result.error || 'Failed to update account');
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-8 rounded-2xl border border-white/10"
        >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <User className="text-primary" />
                Neural Connection Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
                            <img
                                src={formData.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Registered Identity</label>
                            <input
                                type="text"
                                className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Comm Channel (Email)</label>
                            <div className="w-full glass bg-white/5 border border-white/5 rounded-lg p-3 text-gray-500 cursor-not-allowed flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {session?.user?.email}
                            </div>
                            <p className="text-[10px] text-gray-600 mt-2 italic font-mono uppercase">Primary comm channel cannot be altered after initialization.</p>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Visual Data Link (Avatar URL)</label>
                            <input
                                type="url"
                                className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors text-xs font-mono"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">{error}</p>}
                {success && (
                    <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Identity sync complete.
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full md:w-auto px-12 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SAVE CHANGES'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
