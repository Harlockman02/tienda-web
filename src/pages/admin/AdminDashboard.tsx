import { Package, ShoppingCart, DollarSign, Users, TrendingUp, TrendingDown } from 'lucide-react';
import type { Product, Order } from '@/types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  storeName: string;
}

export default function AdminDashboard({ products, orders, storeName }: AdminDashboardProps) {
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.date).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  }).length;
  const monthlyRevenue = orders
    .filter((o) => {
      const orderDate = new Date(o.date);
      const now = new Date();
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      title: 'Productos Totales',
      value: totalProducts,
      icon: Package,
      accent: '#D6AE7B',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Pedidos Hoy',
      value: todayOrders,
      icon: ShoppingCart,
      accent: '#059669',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Ingresos del Mes',
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      accent: '#000000',
      trend: '-2%',
      trendUp: false,
    },
    {
      title: 'Total Pedidos',
      value: totalOrders,
      icon: Users,
      accent: '#595959',
      trend: '+8%',
      trendUp: true,
    },
  ];

  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    completed: 'Completado',
    cancelled: 'Cancelado',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="font-serif text-3xl font-medium">Dashboard</h1>
        <p className="text-sm text-[#595959] mt-1">Bienvenido al panel de {storeName}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#F1F1F1] hover:shadow-md transition-shadow"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.accent}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.accent }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="font-mono text-3xl font-medium mt-4">{stat.value}</p>
            <p className="text-sm text-[#595959] mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#F1F1F1] overflow-hidden">
        <div className="p-6 border-b border-[#F1F1F1] flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium">Pedidos Recientes</h2>
          <span className="text-sm text-[#595959]">{orders.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F1F1]">
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">ID</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Cliente</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Producto</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Fecha</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Total</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#F1F1F1] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-[#595959]">{order.items[0]?.productName || '-'}</td>
                  <td className="px-6 py-4 text-sm text-[#595959]">
                    {new Date(order.date).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-medium">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#595959]">
                    No hay pedidos aun
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F1F1F1]">
          <h3 className="font-serif text-lg font-medium mb-2">Gestionar Productos</h3>
          <p className="text-sm text-[#595959] mb-4">Anade, edita o elimina productos de tu tienda.</p>
          <a href="/admin/products" className="text-sm font-medium text-[#D6AE7B] hover:underline">
            Ir a Productos →
          </a>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F1F1F1]">
          <h3 className="font-serif text-lg font-medium mb-2">Configurar Tienda</h3>
          <p className="text-sm text-[#595959] mb-4">Cambia el nombre, WhatsApp y otros ajustes.</p>
          <a href="/admin/settings" className="text-sm font-medium text-[#D6AE7B] hover:underline">
            Ir a Configuracion →
          </a>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F1F1F1]">
          <h3 className="font-serif text-lg font-medium mb-2">Ver Pedidos</h3>
          <p className="text-sm text-[#595959] mb-4">Revisa los pedidos recibidos por WhatsApp.</p>
          <a href="/admin/orders" className="text-sm font-medium text-[#D6AE7B] hover:underline">
            Ir a Pedidos →
          </a>
        </div>
      </div>
    </div>
  );
}
