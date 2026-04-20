import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, MessageCircle } from 'lucide-react';
import type { Product } from '@/types';

interface ProductDetailProps {
  products: Product[];
  onAddToCart: (productId: string, quantity?: number) => void;
  generateWhatsAppLink: (message: string) => string;
}

export default function ProductDetail({ products, onAddToCart, generateWhatsAppLink }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveImage(0);
  }, [id]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '1';
      sectionRef.current.style.transform = 'translateY(0)';
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-medium">Producto no encontrado</h2>
          <Link to="/productos" className="mt-4 inline-block text-[#D6AE7B] hover:underline">
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyWhatsApp = () => {
    const message = `Hola, estoy interesado en comprar el siguiente producto:\n\n${product.name}\nCantidad: ${quantity}\nPrecio unitario: $${product.price.toLocaleString()} MXN\nTotal: $${(product.price * quantity).toLocaleString()} MXN`;
    const link = generateWhatsAppLink(message);
    if (link !== '#') {
      window.open(link, '_blank');
    } else {
      alert('El numero de WhatsApp no esta configurado. Contacta al administrador.');
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product.id);
    }
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div
        ref={sectionRef}
        className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12 py-12 transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        {/* Breadcrumb */}
        <nav className="text-sm text-[#797979] mb-8">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/productos" className="hover:text-black transition-colors">Productos</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            <div className="aspect-square bg-[#FAFAFA] rounded-2xl overflow-hidden relative">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded">
                  {product.badge}
                </span>
              )}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-black' : 'border-transparent hover:border-[#E2E2E2]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-8">
            <p className="text-sm text-[#797979] uppercase tracking-wider">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mt-2">{product.name}</h1>
            <p className="text-2xl font-mono font-medium mt-4">${product.price.toLocaleString()} MXN</p>

            <p className="text-[#595959] mt-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium">Cantidad</label>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center border border-[#E2E2E2] rounded-xl hover:bg-[#F6F6F6] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center border border-[#E2E2E2] rounded-xl font-mono text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center border border-[#E2E2E2] rounded-xl hover:bg-[#F6F6F6] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleBuyWhatsApp}
                className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-medium flex items-center justify-center gap-3 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Comprar por WhatsApp
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-black/90 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Anadir al carrito
              </button>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="mt-10 pt-8 border-t border-[#E2E2E2]">
                <h3 className="font-serif text-xl font-medium mb-4">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-[#FAFAFA] rounded-xl p-4">
                      <p className="text-xs text-[#797979] uppercase tracking-wider">{key}</p>
                      <p className="font-medium mt-1 capitalize">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E2E2E2]">
            <h2 className="font-serif text-3xl font-medium mb-8">Tambien te puede interesar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => navigate(`/producto/${rp.id}`)}
                  className="group text-left"
                >
                  <div className="aspect-[4/5] bg-[#FAFAFA] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={rp.images[0]}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-medium group-hover:text-[#D6AE7B] transition-colors">
                    {rp.name}
                  </h4>
                  <p className="text-xs text-[#5E5E5E] font-mono mt-1">${rp.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
