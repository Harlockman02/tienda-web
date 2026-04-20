export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  featured: boolean;
  badge?: string;
  specifications?: {
    material: string;
    dimensions: string;
    weight: string;
    color: string;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface StoreConfig {
  name: string;
  whatsappNumber: string;
  currency: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  whatsappMessage: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}
