import { Product } from './types';
export type { Product };

export const products: Product[] = [
    {
        id: '1',
        name: 'Neon Cyber Deck',
        description: 'High-performance portable computing unit with holographic display and neural interface compatibility.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
        category: 'Electronics',
        specs: {
            Processor: 'Quantum Core i9',
            Memory: '64TB Neural RAM',
            Display: 'Holographic 4K',
            Battery: 'Fusion Cell (100h)'
        }
    },
    {
        id: '2',
        name: 'Holographic Visor',
        description: 'Augmented reality visor with real-time translation and tactical overlay.',
        price: 149.50,
        image: 'https://images.unsplash.com/photo-1535594059052-760123ea36cc?auto=format&fit=crop&q=80',
        category: 'Wearables',
        specs: {
            Resolution: '8K per eye',
            Connectivity: 'Neural Link 5.0',
            Weight: '150g',
            Material: 'Graphene Composite'
        }
    },
    {
        id: '3',
        name: 'Quantum Data Chip',
        description: 'Ultra-high capacity storage device utilizing quantum state entanglement.',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
        category: 'Components',
        specs: {
            Capacity: '1PB',
            TransferRate: '100TB/s',
            Encryption: 'Quantum Key Distribution',
            Interface: 'Universal Port'
        }
    },
    {
        id: '4',
        name: 'Plasma Energy Cell',
        description: 'Compact energy source capable of powering heavy machinery or vehicles.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80',
        category: 'Energy',
        specs: {
            Output: '500kW',
            Stability: '99.9%',
            Lifespan: '50 Years',
            Rechargeable: 'Yes'
        }
    },
    {
        id: '5',
        name: 'Cyberpunk Jacket',
        description: 'Smart tactical jacket with built-in climate control and LED accents.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1559563458-52c69f8d555c?auto=format&fit=crop&q=80',
        category: 'Apparel',
        specs: {
            Material: 'Nano-fiber Weave',
            Features: 'Waterproof, Bullet-resistant',
            Lighting: 'RGB Programmable',
            Connectivity: 'Smartphone Sync'
        }
    },
    {
        id: '6',
        name: 'Neural Interface Headset',
        description: 'Direct neural interface for immersive VR and drone control.',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80',
        category: 'Electronics',
        specs: {
            Latency: '<1ms',
            Sensors: 'EEG, EMG',
            Compatibility: 'Universal',
            Battery: 'Wireless Charging'
        }
    }
];

export function getAllProducts() {
    return products;
}

export function getProductById(id: string) {
    return products.find(p => p.id === id);
}
