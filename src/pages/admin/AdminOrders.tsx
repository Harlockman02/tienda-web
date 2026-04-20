import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Order } from '@/types';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

export default function AdminOrders({ orders, onUpdateOrderStatus }: AdminOrdersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !searchQuery ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="font-serif text-3xl font-medium">Pedidos</h1>
        <p className="text-sm text-[#595959] mt-1">{orders.length} pedidos en total</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797979]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pedidos..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E2E2] rounded-xl text-sm outline-none focus:border-black transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-[#E2E2E2] rounded-xl text-sm outline-none focus:border-black transition-all"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="processing">Procesando</option>
          <option value="completed">Completado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#F1F1F1] overflow-hidden">
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
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#F1F1F1] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-[#595959] max-w-[200px] truncate">
                    {order.items.map((i) => i.productName).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#595959]">
                    {new Date(order.date).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-medium">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#595959]" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-[#595959]">
                    No hay pedidos que coincidan con los filtros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Customer Info */}
              <div className="bg-[#FAFAFA] rounded-xl p-4">
                <h4 className="text-xs text-[#797979] uppercase tracking-wider font-medium mb-3">Informacion del Cliente</h4>
                <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                <p className="text-sm text-[#595959] mt-1">{selectedOrder.customerPhone}</p>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-xs text-[#797979] uppercase tracking-wider font-medium mb-3">Productos</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#F1F1F1] last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.productName}</p>
                        <p className="text-xs text-[#595959]">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-mono">${(item.unitPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-black">
                  <p className="font-medium">Total</p>
                  <p className="font-mono text-lg font-medium">${selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-xs text-[#797979] uppercase tracking-wider font-medium mb-3">Estado</h4>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'completed', 'cancelled'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        onUpdateOrderStatus(selectedOrder.id, status);
                        setSelectedOrder({ ...selectedOrder, status });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        selectedOrder.status === status
                          ? statusColors[status]
                          : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E2E2E2]'
                      }`}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp Message */}
              <div className="bg-[#FAFAFA] rounded-xl p-4">
                <h4 className="text-xs text-[#797979] uppercase tracking-wider font-medium mb-2">Mensaje de WhatsApp</h4>
                <p className="text-sm text-[#595959] italic">"{selectedOrder.whatsappMessage}"</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
