import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useStore } from '@/hooks/useStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  const store = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleAddToCart = useCallback((productId: string) => {
    store.addToCart(productId);
    toast.success('Producto anadido al carrito', {
      description: 'Ve al carrito para finalizar tu compra',
      duration: 3000,
    });
  }, [store]);

  const handleCheckout = useCallback(() => {
    store.clearCart();
    setCartOpen(false);
    toast.success('Pedido enviado por WhatsApp', {
      description: 'Te contactaremos pronto',
      duration: 4000,
    });
  }, [store]);

  const categoryNames = store.categories.map((c) => c.name);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 24px',
          },
        }}
      />

      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <AdminLogin isAuthenticated={store.isAuthenticated} onLogin={store.login} />
        } />
        <Route path="/admin" element={
          <AdminLayout
            storeName={store.storeConfig.name}
            isAuthenticated={store.isAuthenticated}
            onLogout={store.logout}
          />
        }>
          <Route index element={
            <AdminDashboard
              products={store.products}
              orders={store.orders}
              storeName={store.storeConfig.name}
            />
          } />
          <Route path="products" element={
            <AdminProducts
              products={store.products}
              categories={categoryNames}
              onAddProduct={store.addProduct}
              onUpdateProduct={store.updateProduct}
              onDeleteProduct={store.deleteProduct}
              onToggleFeatured={store.toggleFeatured}
            />
          } />
          <Route path="orders" element={
            <AdminOrders
              orders={store.orders}
              onUpdateOrderStatus={store.updateOrderStatus}
            />
          } />
          <Route path="settings" element={
            <AdminSettings
              storeConfig={store.storeConfig}
              onUpdateStoreConfig={store.updateStoreConfig}
              onChangePassword={store.changePassword}
            />
          } />
        </Route>

        {/* Public Routes */}
        <Route path="*" element={
          <>
            <Header
              storeName={store.storeConfig.name}
              cartCount={store.cartItemsCount}
              onCartClick={() => setCartOpen(true)}
              onSearchClick={() => setSearchOpen(true)}
            />
            <CartDrawer
              open={cartOpen}
              onOpenChange={setCartOpen}
              cart={store.cart}
              products={store.products}
              onUpdateQuantity={store.updateCartQuantity}
              onRemove={store.removeFromCart}
              onCheckout={handleCheckout}
              generateWhatsAppLink={store.generateWhatsAppLink}
              storeName={store.storeConfig.name}
            />
            <SearchOverlay
              open={searchOpen}
              onOpenChange={setSearchOpen}
              products={store.products}
            />
            <Routes>
              <Route path="/" element={
                <Home
                  products={store.products}
                  categories={store.categories}
                  storeName={store.storeConfig.name}
                  onAddToCart={handleAddToCart}
                  generateWhatsAppLink={store.generateWhatsAppLink}
                />
              } />
              <Route path="/productos" element={
                <Catalog
                  products={store.products}
                  categories={store.categories}
                  onAddToCart={handleAddToCart}
                />
              } />
              <Route path="/producto/:id" element={
                <ProductDetail
                  products={store.products}
                  onAddToCart={handleAddToCart}
                  generateWhatsAppLink={store.generateWhatsAppLink}
                />
              } />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
            <Footer storeName={store.storeConfig.name} />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
