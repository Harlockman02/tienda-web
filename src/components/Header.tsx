import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  storeName: string;
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/productos' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Contacto', path: '/contacto' },
];

export default function Header({ storeName, cartCount, onCartClick, onSearchClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-black/5 rounded-lg transition-colors" aria-label="Menu">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] bg-white/95 backdrop-blur-xl border-r border-black/10 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-black/10">
                    <span className="font-serif text-xl font-medium">{storeName}</span>
                    <span className="block text-[10px] font-sans font-medium tracking-[0.1em] text-[#D6AE7B] mt-1">TIENDA ONLINE</span>
                  </div>
                  <nav className="flex-1 py-6">
                    {navLinks.map((link, i) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center px-6 py-4 font-serif text-2xl font-medium text-black/70 hover:text-[#D6AE7B] transition-colors duration-300"
                        style={{ animationDelay: `${i * 50}ms` }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/admin"
                      className="flex items-center px-6 py-4 font-serif text-2xl font-medium text-black/70 hover:text-[#D6AE7B] transition-colors duration-300"
                    >
                      Admin
                    </Link>
                  </nav>
                  <div className="p-6 border-t border-black/10">
                    <p className="text-sm text-[#595959]">Contáctanos</p>
                    <div className="flex gap-4 mt-3">
                      <span className="w-5 h-5 text-[#595959] hover:text-black cursor-pointer transition-colors">IG</span>
                      <span className="w-5 h-5 text-[#595959] hover:text-black cursor-pointer transition-colors">X</span>
                      <span className="w-5 h-5 text-[#595959] hover:text-black cursor-pointer transition-colors">FB</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <button
              onClick={onSearchClick}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors hidden md:block"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-xl md:text-2xl font-medium tracking-wide">{storeName}</span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              aria-label="Admin"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors relative"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
