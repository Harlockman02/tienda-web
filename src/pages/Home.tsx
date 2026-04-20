import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import Globe3D from '@/components/Globe3D';
import type { Product, Category } from '@/types';

interface HomeProps {
  products: Product[];
  categories: Category[];
  storeName: string;
  onAddToCart: (productId: string) => void;
  generateWhatsAppLink: (message: string) => string;
}

// Animated text component
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('.char');
    chars.forEach((char, i) => {
      setTimeout(() => {
        (char as HTMLElement).style.opacity = '1';
        (char as HTMLElement).style.transform = 'translateY(0)';
      }, delay + i * 30);
    });
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block opacity-0 translate-y-full transition-all duration-700"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

// Scroll reveal component
function ScrollReveal({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', ...style }}
    >
      {children}
    </div>
  );
}

export default function Home({ products, categories, storeName, onAddToCart, generateWhatsAppLink }: HomeProps) {
  const featuredProducts = products.filter((p) => p.featured);
  const testimonials = [
    { text: 'La calidad de los muebles es excepcional. El servicio de entrega fue impecable y el equipo muy profesional.', author: 'Maria Garcia', date: '15 de enero 2025' },
    { text: 'Encontre exactamente lo que buscaba para mi nueva oficina. Los precios son competitivos y la atencion al cliente excelente.', author: 'Carlos Rodriguez', date: '3 de febrero 2025' },
    { text: 'He comprado varias veces y siempre quedo satisfecho. Los productos son elegantes y duraderos.', author: 'Ana Martinez', date: '20 de febrero 2025' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen pt-16 relative overflow-hidden">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)]">
            {/* Left - Text */}
            <div className="py-12 lg:py-0 z-10">
              <AnimatedText
                text="Todo en un solo lugar"
                className="font-serif text-5xl md:text-7xl lg:text-[120px] lg:leading-[140px] font-medium"
                delay={300}
              />
              <p
                className="mt-6 text-lg md:text-2xl text-[#595959] max-w-xl opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards"
                style={{ animationDelay: '600ms' }}
              >
                Explora nuestros productos exclusivos seleccionados para ti.
              </p>
              <div
                className="mt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards"
                style={{ animationDelay: '800ms' }}
              >
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-none border border-black hover:bg-transparent hover:text-black transition-all duration-500"
                >
                  Ver productos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right - Globe */}
            <div className="relative">
              <Globe3D />
              {/* Floating product chips */}
              <div className="absolute inset-0 pointer-events-none">
                {featuredProducts.slice(0, 4).map((product, i) => {
                  const positions = [
                    'top-[10%] left-[5%]',
                    'top-[5%] right-[10%]',
                    'bottom-[15%] left-[10%]',
                    'bottom-[10%] right-[5%]',
                  ];
                  return (
                    <div
                      key={product.id}
                      className={`absolute ${positions[i]} pointer-events-auto opacity-0 animate-in fade-in zoom-in-95 duration-500 fill-mode-forwards hidden lg:block`}
                      style={{ animationDelay: `${1000 + i * 100}ms` }}
                    >
                      <div className="bg-white border border-[#E6E6E6] rounded-full px-4 py-3 shadow-lg flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#F1F1F1]"
                        />
                        <div className="pr-2">
                          <p className="font-serif text-xs font-medium whitespace-nowrap">{product.name}</p>
                          <p className="text-[10px] text-[#5E5E5E] font-mono">${product.price.toLocaleString()}</p>
                        </div>
                        <a
                          href={generateWhatsAppLink(`Hola, estoy interesado en el producto: ${product.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-white text-[10px] px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors"
                          onClick={(e) => {
                            if (generateWhatsAppLink('') === '#') {
                              e.preventDefault();
                              alert('El numero de WhatsApp no esta configurado. Contacta al administrador.');
                            }
                          }}
                        >
                          Comprar
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl font-medium">Nuestras Categorias</h2>
            <p className="mt-4 text-lg text-[#595959]">Encuentra lo que buscas</p>
          </ScrollReveal>

          <div className="space-y-0">
            {categories.map((category, i) => (
              <ScrollReveal key={category.id}>
                <Link
                  to={`/productos?category=${category.name}`}
                  className="group flex items-center gap-6 md:gap-10 py-8 border-b border-[#E2E2E2] hover:bg-[#FAFAFA] transition-colors duration-300 px-4 -mx-4 rounded-lg"
                >
                  <span className="text-sm text-[#797979] font-mono w-8">0{i + 1}</span>
                  <div className="w-24 h-32 md:w-40 md:h-48 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-4xl font-medium group-hover:text-[#D6AE7B] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#595959] mt-2 hidden md:block">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explorar</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-32 bg-[#F9F9F9]">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
          <ScrollReveal className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-4xl md:text-6xl font-medium">Productos Destacados</h2>
            <Link to="/productos" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-[#D6AE7B] transition-colors">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ScrollReveal
                key={product.id}
                style={{ transitionDelay: `${i * 100}ms` } as React.CSSProperties}
              >
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
                    <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-[#5E5E5E] font-mono mt-1">
                      ${product.price.toLocaleString()} {storeName === 'PARAGON' ? 'MXN' : ''}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/productos" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#D6AE7B] transition-colors">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-6xl font-medium">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-6 text-lg text-[#595959]">
                Miles de clientes satisfechos confian en nosotros para hacer de sus espacios algo unico.
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              {testimonials.map((t, i) => (
                <ScrollReveal key={i} style={{ transitionDelay: `${i * 150}ms` } as React.CSSProperties}>
                  <div className="pb-8 border-b border-[#E2E2E2]">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#D6AE7B] text-[#D6AE7B]" />
                      ))}
                    </div>
                    <p className="font-serif text-xl md:text-2xl font-normal leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm font-medium">{t.author}</span>
                      <span className="text-[#797979]">-</span>
                      <span className="text-sm text-[#797979]">{t.date}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-24 bg-black">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-6xl font-medium text-white">
              Subscribete para recibir novedades
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Se el primero en conocer nuestras nuevas colecciones y ofertas exclusivas.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Gracias por suscribirte!');
              }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 pb-3 outline-none focus:border-white transition-colors text-lg"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-3 font-medium hover:bg-white/90 transition-colors w-full sm:w-auto"
              >
                Subscribirse
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
