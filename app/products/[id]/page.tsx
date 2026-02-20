import { getProductById } from '@/serverAction/getProductById';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            <ProductDetail product={product} />
        </div>
    );
}
