import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
// import { getAllProducts } from '@/lib/data';
import { getProducts } from '@/serverAction/getProducts';




export default async function Home() {
  // Use first 4 products from centralized data
  // const products = getAllProducts().slice(0, 4);

  const products = await getProducts();


  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              <span className="text-white">FEATURED</span> <span className="text-gray-500">DROPS</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
          <a href="/products" className="hidden md:block text-primary hover:text-white transition-colors">
            View All Collection →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="/products" className="text-primary hover:text-white transition-colors">
            View All Collection →
          </a>
        </div>
      </section>
    </div>
  );
}
