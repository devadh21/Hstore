'use client';

import { useState } from 'react';
import { addProduct } from '@/serverAction/addProduct';
import { motion } from 'framer-motion';
import { Plus, X, Loader2, CheckCircle } from 'lucide-react';

export default function AddProductForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'Electronics',
        specs: [{ key: '', value: '' }]
    });

    const categories = ['Electronics', 'Wearables', 'Components', 'Energy', 'Apparel'];

    const handleAddSpec = () => {
        setFormData({ ...formData, specs: [...formData.specs, { key: '', value: '' }] });
    };

    const handleRemoveSpec = (index: number) => {
        const newSpecs = [...formData.specs];
        newSpecs.splice(index, 1);
        setFormData({ ...formData, specs: newSpecs });
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
        const newSpecs = [...formData.specs];
        newSpecs[index][field] = val;
        setFormData({ ...formData, specs: newSpecs });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        const specsObject = formData.specs.reduce((acc: any, spec) => {
            if (spec.key && spec.value) {
                acc[spec.key] = spec.value;
            }
            return acc;
        }, {});

        const result = await addProduct({
            ...formData,
            price: parseFloat(formData.price),
            specs: specsObject
        });

        if (result.success) {
            setSuccess(true);
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: 'Electronics',
                specs: [{ key: '', value: '' }]
            });
        } else {
            setError(result.error || 'Failed to add product');
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-8 rounded-2xl border border-white/10"
        >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Plus className="text-primary" />
                Initialize New Artifact
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Category</label>
                        <select
                            className="w-full glass bg-[#1a1a1a] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors text-white"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Description</label>
                    <textarea
                        required
                        className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors min-h-[100px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono uppercase">Image URL</label>
                        <input
                            type="url"
                            required
                            placeholder="https://..."
                            className="w-full glass bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm text-gray-400 font-mono uppercase">Technical Specifications</label>
                        <button
                            type="button"
                            onClick={handleAddSpec}
                            className="text-primary text-sm flex items-center gap-1 hover:underline"
                        >
                            <Plus className="w-4 h-4" /> Add Spec
                        </button>
                    </div>
                    <div className="space-y-3">
                        {formData.specs.map((spec, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    placeholder="Label (e.g. Memory)"
                                    className="flex-1 glass bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                />
                                <input
                                    placeholder="Value (e.g. 64TB)"
                                    className="flex-1 glass bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpec(index)}
                                    className="p-2 text-gray-500 hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">{error}</p>}
                {success && (
                    <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Product initialized in central database.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CONSTRUCT ARTIFACT'}
                </button>
            </form>
        </motion.div>
    );
}
