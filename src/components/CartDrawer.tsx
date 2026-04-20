import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { Product, CartItem } from '@/types';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  generateWhatsAppLink: (message: string) => string;
  storeName: string;
}

export default function CartDrawer({
  open,
  onOpenChange,
  cart,
  products,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  generateWhatsAppLink,
}: CartDrawerProps) {
  const cartProducts = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  })).filter((item) => item.product);

  const total = cartProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartProducts.length === 0) return;
    const message = `Hola, quiero realizar el siguiente pedido:\n\n${cartProducts
      .map((item) => `- ${item.product?.name} x${item.quantity} - $${((item.product?.price || 0) * item.quantity).toLocaleString()}`)
      .join('\n')}\n\nTotal: $${total.toLocaleString()}`;
    const link = generateWhatsAppLink(message);
    if (link !== '#') {
      window.open(link, '_blank');
      onCheckout();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[480px] bg-white border-l border-black/10 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-black/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-2xl font-medium">Carrito</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-[#595959]">{cart.length} producto(s)</p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-[#E2E2E2] mb-4" />
              <p className="font-serif text-lg text-[#595959]">Tu carrito está vacío</p>
              <p className="text-sm text-[#797979] mt-2">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartProducts.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-4 bg-[#FAFAFA] rounded-xl"
                >
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-medium truncate">
                        {item.product?.name}
                      </h4>
                      <button
                        onClick={() => onRemove(item.productId)}
                        className="p-1 hover:bg-black/5 rounded transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-[#595959]" />
                      </button>
                    </div>
                    <p className="text-xs text-[#5E5E5E] mt-1 font-mono">
                      ${item.product?.price.toLocaleString()} MXN
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[#E2E2E2] rounded-lg hover:bg-[#F6F6F6] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border border-[#E2E2E2] rounded-lg text-sm font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[#E2E2E2] rounded-lg hover:bg-[#F6F6F6] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartProducts.length > 0 && (
          <div className="p-6 border-t border-black/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#595959]">Subtotal</span>
              <span className="font-mono text-lg font-medium">${total.toLocaleString()} MXN</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full h-14 bg-black text-white hover:bg-black/90 rounded-xl text-base font-medium transition-transform hover:scale-[1.02]"
            >
              Finalizar compra por WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-12 border-black text-black hover:bg-black hover:text-white rounded-xl text-base transition-all duration-500"
            >
              Seguir comprando
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
