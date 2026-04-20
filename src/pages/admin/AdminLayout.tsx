import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  storeName: string;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Productos', path: '/admin/products', icon: Package },
  { name: 'Pedidos', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Configuracion', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ storeName, isAuthenticated, onLogout }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const pageTitle = navItems.find((n) => n.path === location.pathname)?.name || 'Admin';

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-black z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="block">
              <span className="font-serif text-lg font-medium text-white">{storeName}</span>
            </Link>
            <span className="block text-[10px] font-sans font-medium tracking-[0.1em] text-[#D6AE7B] mt-1">
              ADMIN
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 mx-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D6AE7B]/15 text-white border-l-[3px] border-[#D6AE7B]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <button
              onClick={() => {
                onLogout();
                navigate('/admin/login');
              }}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm w-full"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesion
            </button>
            <p className="text-[11px] text-white/40 mt-6">Paragon Admin v1.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E2E2E2] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-black/5 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="text-sm text-[#595959]">
              <span className="text-[#797979]">Admin</span>
              <span className="mx-2">/</span>
              <span>{pageTitle}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:block">{storeName}</span>
            <div className="w-9 h-9 rounded-full bg-[#D6AE7B] flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
