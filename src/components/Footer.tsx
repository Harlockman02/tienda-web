import { Link } from 'react-router-dom';

interface FooterProps {
  storeName: string;
}

export default function Footer({ storeName }: FooterProps) {
  return (
    <footer className="bg-[#303030] text-white">
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Navegación</h4>
            <ul className="space-y-3">
              {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Soporte</h4>
            <ul className="space-y-3">
              {['FAQ', 'Envíos', 'Devoluciones', 'Términos y condiciones'].map((item) => (
                <li key={item}>
                  <span className="text-white/60 text-sm cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Contacto</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>info@{storeName.toLowerCase()}.com</li>
              <li>+52 55 1234 5678</li>
              <li>Ciudad de México, México</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Síguenos</h4>
            <div className="flex gap-4">
              {['Instagram', 'X', 'Facebook'].map((social) => (
                <span
                  key={social}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer text-xs"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2025 {storeName}. Todos los derechos reservados.
          </p>
          <span className="font-serif text-lg font-medium tracking-wide text-white/60">
            {storeName}
          </span>
        </div>
      </div>
    </footer>
  );
}
