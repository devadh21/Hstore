'use client';

import { User, Package, PlusCircle, Settings, LayoutDashboard } from 'lucide-react';

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isAdmin: boolean;
}

export default function ProfileTabs({ activeTab, setActiveTab, isAdmin }: ProfileTabsProps) {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'account', label: 'Account', icon: Settings },
    ];

    if (isAdmin) {
        tabs.splice(2, 0, { id: 'add-product', label: 'Inventory', icon: PlusCircle });
    }

    return (
        <div className="flex flex-wrap gap-2 mb-8 p-1 glass rounded-xl border border-white/5 mx-auto max-w-2xl">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-primary text-black font-bold shadow-[0_0_15px_var(--primary-glow)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
