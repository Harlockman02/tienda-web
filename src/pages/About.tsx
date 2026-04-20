import { useRef, useEffect } from 'react';

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
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
      style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const blocks = [
    {
      title: 'Quienes somos',
      text: 'Paragon nacio de una vision simple pero poderosa: crear espacios que inspiren. Desde nuestra fundacion en 2015, nos hemos dedicado a curar la mejor seleccion de muebles y decoracion de diseno, trabajando directamente con artesanos y disenadores de todo el mundo. Cada pieza en nuestra coleccion ha sido seleccionada por su calidad, estetica y capacidad para transformar un espacio ordinario en algo extraordinario.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      reverse: false,
    },
    {
      title: 'Nuestra Mision',
      text: 'Nuestra mision es democratizar el diseno de calidad. Creemos que todos merecen vivir en espacios hermosos y funcionales, sin importar el presupuesto. Por eso trabajamos incansablemente para ofrecer productos excepcionales a precios justos, sin comprometer la calidad ni la sostenibilidad. Cada decision que tomamos esta guiada por nuestro compromiso con la excelencia y la satisfaccion del cliente.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      reverse: true,
    },
    {
      title: 'Nuestros Valores',
      text: 'La sostenibilidad esta en el corazon de todo lo que hacemos. Trabajamos con materiales ecologicos y procesos responsables. La artesania es nuestra prioridad: valoramos el trabajo hecho a mano y las tecnicas tradicionales. La excelencia nos impulsa a buscar continuamente la mejora, y la innovacion nos mantiene a la vanguardia del diseno.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      reverse: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
          alt="Oficina elegante"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-white">Nuestra Historia</h1>
          <p className="mt-4 text-xl text-white/80">Mas de una decada de excelencia en diseno</p>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-32">
        <div className="space-y-24 md:space-y-32">
          {blocks.map((block, i) => (
            <ScrollReveal key={i}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${block.reverse ? 'lg:flex-row-reverse' : ''}`}>
                <div className={block.reverse ? 'lg:order-2' : ''}>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium">{block.title}</h2>
                  <p className="mt-6 text-lg text-[#595959] leading-relaxed">{block.text}</p>
                </div>
                <div className={block.reverse ? 'lg:order-1' : ''}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={block.image}
                      alt={block.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
