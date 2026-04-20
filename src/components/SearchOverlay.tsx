import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export default function SearchOverlay({ open, onOpenChange, products }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, products]);

  const handleProductClick = (productId: string) => {
    onOpenChange(false);
    navigate(`/producto/${productId}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-white animate-in fade-in duration-300">
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12 pt-24 pb-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <Search className="w-6 h-6 text-[#595959]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Que estas buscando?"
              className="flex-1 text-2xl md:text-4xl font-sans font-light bg-transparent border-b border-black/20 focus:border-black outline-none pb-2 transition-colors"
            />
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-3 hover:bg-black/5 rounded-xl transition-colors ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm text-[#595959] mb-4">
              {results.length} resultado(s)
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="group text-left"
                  >
                    <div className="aspect-square bg-[#FAFAFA] rounded-xl overflow-hidden mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="font-serif text-sm font-medium group-hover:text-[#D6AE7B] transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#5E5E5E] font-mono">
                      ${product.price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#595959]">No se encontraron productos</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
