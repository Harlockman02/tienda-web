import { useState, useEffect, useCallback } from 'react';
import type { Product, Category, StoreConfig, CartItem, Order, AdminCredentials } from '@/types';
import { initialProducts, initialCategories, initialStoreConfig, initialOrders } from '@/data/initialData';

const STORAGE_KEYS = {
  products: 'paragon_products',
  categories: 'paragon_categories',
  storeConfig: 'paragon_config',
  cart: 'paragon_cart',
  orders: 'paragon_orders',
  adminCredentials: 'paragon_admin',
  isAuthenticated: 'paragon_auth',
};

// Helper to load from localStorage with fallback
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useStore() {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(STORAGE_KEYS.products, initialProducts)
  );
  const [categories] = useState<Category[]>(() =>
    loadFromStorage(STORAGE_KEYS.categories, initialCategories)
  );
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() =>
    loadFromStorage(STORAGE_KEYS.storeConfig, initialStoreConfig)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.cart, [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage(STORAGE_KEYS.orders, initialOrders)
  );
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() =>
    loadFromStorage(STORAGE_KEYS.adminCredentials, { username: 'admin', password: 'admin' })
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    loadFromStorage(STORAGE_KEYS.isAuthenticated, false)
  );

  // Persist to localStorage on changes
  useEffect(() => saveToStorage(STORAGE_KEYS.products, products), [products]);
  useEffect(() => saveToStorage(STORAGE_KEYS.categories, categories), [categories]);
  useEffect(() => saveToStorage(STORAGE_KEYS.storeConfig, storeConfig), [storeConfig]);
  useEffect(() => saveToStorage(STORAGE_KEYS.cart, cart), [cart]);
  useEffect(() => saveToStorage(STORAGE_KEYS.orders, orders), [orders]);
  useEffect(() => saveToStorage(STORAGE_KEYS.adminCredentials, adminCredentials), [adminCredentials]);
  useEffect(() => saveToStorage(STORAGE_KEYS.isAuthenticated, isAuthenticated), [isAuthenticated]);

  // Product operations
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFeatured = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  }, []);

  // Cart operations
  const addToCart = useCallback((productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev =>
        prev.map(item => item.productId === productId ? { ...item, quantity } : item)
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Order operations
  const addOrder = useCallback((order: Omit<Order, 'id' | 'date'>) => {
    const newOrder = {
      ...order,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [orders.length]);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  // Auth operations
  const login = useCallback((username: string, password: string): boolean => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [adminCredentials]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const changePassword = useCallback((currentPassword: string, newPassword: string): boolean => {
    if (currentPassword === adminCredentials.password) {
      setAdminCredentials({ username: 'admin', password: newPassword });
      return true;
    }
    return false;
  }, [adminCredentials]);

  // Store config operations
  const updateStoreConfig = useCallback((updates: Partial<StoreConfig>) => {
    setStoreConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // WhatsApp link generator
  const generateWhatsAppLink = useCallback((message: string) => {
    const number = storeConfig.whatsappNumber.replace(/\D/g, '');
    if (!number) return '#';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }, [storeConfig.whatsappNumber]);

  return {
    products,
    categories,
    storeConfig,
    cart,
    orders,
    isAuthenticated,
    adminCredentials,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
    addOrder,
    updateOrderStatus,
    login,
    logout,
    changePassword,
    updateStoreConfig,
    generateWhatsAppLink,
  };
}
