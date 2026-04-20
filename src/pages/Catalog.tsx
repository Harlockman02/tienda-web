import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// @ts-ignore
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import type { Product, Category } from '@/types';

interface CatalogProps {
  products: Product[];
  categories: Category[];
  onAddToCart: (productId: string) => void;
}

export default function Catalog({ products, categories, onAddToCart }: CatalogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState(searchParams.get('category') || 'Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategoryState(cat);
  }, [searchParams]);

  const setSelectedCategory = (cat: string) => {
    setSelectedCategoryState(cat);
    if (cat === 'Todos') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const allCategories = ['Todos', ...categories.map((c) => c.name)];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-[#797979] mb-4">
            <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span>Productos</span>
          </nav>
          <h1 className="font-serif text-5xl md:text-7xl font-medium">Nuestros Productos</h1>
          <p className="mt-4 text-lg text-[#595959] max-w-xl">
            Descubre nuestra coleccion curada de productos de diseno.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 pb-6 border-b border-[#E2E2E2]">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797979]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-[#E2E2E2] rounded-xl text-sm hover:bg-[#FAFAFA] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>

            <div className="flex items-center border border-[#E2E2E2] rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-[#FAFAFA]'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-[#FAFAFA]'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            <span className="text-sm text-[#595959] ml-auto md:ml-0">
              {filteredProducts.length} productos
            </span>
          </div>
        </div>

        {/* Category filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E2E2E2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductListItem key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-[#595959]">No se encontraron productos</p>
            <p className="text-[#797979] mt-2">Intenta con otra busqueda o categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (id: string) => void }) {
  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-[#F1F1F1] hover:shadow-xl transition-all duration-500">
      <Link to={`/producto/${product.id}`} className="block">
        <div className="aspect-[4/5] bg-[#FAFAFA] p-6 relative overflow-hidden">
          {product.badge && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-medium px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product.id);
            }}
            className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-lg text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            Anadir al carrito
          </button>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs text-[#797979] uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-serif text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-[#5E5E5E] font-mono mt-1">${product.price.toLocaleString()} MXN</p>
      </div>
    </div>
  );
}

function ProductListItem({ product, onAddToCart }: { product: Product; onAddToCart: (id: string) => void }) {
  return (
    <div className="group flex gap-6 bg-white rounded-2xl border border-[#F1F1F1] p-4 hover:shadow-lg transition-all duration-300">
      <Link to={`/producto/${product.id}`} className="block flex-shrink-0">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-[#FAFAFA] rounded-xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <p className="text-xs text-[#797979] uppercase tracking-wider">{product.category}</p>
          <Link to={`/producto/${product.id}`}>
            <h3 className="font-serif text-xl font-medium mt-1 group-hover:text-[#D6AE7B] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-[#595959] mt-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-mono font-medium">${product.price.toLocaleString()} MXN</p>
          <button
            onClick={() => onAddToCart(product.id)}
            className="px-6 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/90 transition-colors"
          >
            Anadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
