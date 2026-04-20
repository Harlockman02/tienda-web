import type { Product, Category, StoreConfig, Order } from '@/types';

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Sofá de Terciopelo Azul',
    description: 'Elegante sofá de tres plazas tapizado en terciopelo azul marino. Ideal para salas de estar sofisticadas. Incluye cojines decorativos.',
    price: 24500,
    category: 'Muebles',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    featured: true,
    badge: 'NUEVO',
    specifications: { material: 'Terciopelo', dimensions: '220x90x85 cm', weight: '45 kg', color: 'Azul marino' }
  },
  {
    id: 'prod-2',
    name: 'Lámpara de Pie Arquitectónica',
    description: 'Lámpara de pie de diseño arquitectónico con estructura de metal negro mate y pantalla ajustable. Perfecta para iluminación direccional.',
    price: 8900,
    category: 'Iluminación',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80'],
    featured: true,
    specifications: { material: 'Metal', dimensions: '160x30x30 cm', weight: '8 kg', color: 'Negro mate' }
  },
  {
    id: 'prod-3',
    name: 'Mesa de Centro de Mármol',
    description: 'Mesa de centro con tapa de mármol blanco Carrara y base de acero inoxidable cepillado. Un centro de atención atemporal para cualquier sala.',
    price: 15200,
    category: 'Muebles',
    images: ['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80'],
    featured: true,
    badge: 'NUEVO',
    specifications: { material: 'Mármol y acero', dimensions: '100x60x45 cm', weight: '35 kg', color: 'Blanco/Plata' }
  },
  {
    id: 'prod-4',
    name: 'Sillón Ejecutivo de Cuero',
    description: 'Sillón ejecutivo de cuero genuino con soporte lumbar ergonómico y reposabrazos acolchados. Diseño profesional para oficinas ejecutivas.',
    price: 32800,
    category: 'Muebles',
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80'],
    featured: true,
    specifications: { material: 'Cuero genuino', dimensions: '70x70x110 cm', weight: '28 kg', color: 'Café oscuro' }
  },
  {
    id: 'prod-5',
    name: 'Espejo Dorado de Pared',
    description: 'Espejo decorativo con marco dorado de aluminio. Diseño ornamental que añade elegancia y profundidad a cualquier espacio.',
    price: 12400,
    category: 'Decoración',
    images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'],
    featured: true,
    specifications: { material: 'Aluminio y vidrio', dimensions: '80x80x3 cm', weight: '6 kg', color: 'Dorado' }
  },
  {
    id: 'prod-6',
    name: 'Set de Jarrones Cerámicos',
    description: 'Set de 3 jarrones cerámicos artesanales en tonos tierra. Cada pieza es única, hecha a mano por artesanos locales.',
    price: 4800,
    category: 'Decoración',
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80'],
    featured: true,
    specifications: { material: 'Cerámica', dimensions: '30x15x15 cm (c/u)', weight: '4 kg', color: 'Tonos tierra' }
  },
  {
    id: 'prod-7',
    name: 'Cortinas de Lino Natural',
    description: 'Cortinas de lino 100% natural con textura suave y caída elegante. Filtran la luz suavemente creando un ambiente cálido.',
    price: 6500,
    category: 'Textiles',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'],
    featured: false,
    specifications: { material: 'Lino', dimensions: '140x260 cm', weight: '2 kg', color: 'Beige natural' }
  },
  {
    id: 'prod-8',
    name: 'Alfombra Persa Artesanal',
    description: 'Alfombra persa tejida a mano con lana de alta calidad. Patrón tradicional con detalles intrincados que aportan lujo y calidez.',
    price: 18900,
    category: 'Textiles',
    images: ['https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'],
    featured: false,
    specifications: { material: 'Lana', dimensions: '200x300 cm', weight: '15 kg', color: 'Rojo/Crema' }
  },
  {
    id: 'prod-9',
    name: 'Escritorio Minimalista',
    description: 'Escritorio de diseño minimalista con sobre de roble macizo y patas de acero negro. Perfecto para espacios de trabajo modernos.',
    price: 22400,
    category: 'Muebles',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'],
    featured: false,
    specifications: { material: 'Roble y acero', dimensions: '140x70x75 cm', weight: '22 kg', color: 'Roble/Negro' }
  },
  {
    id: 'prod-10',
    name: 'Lámpara de Mesa de Cristal',
    description: 'Lámpara de mesa con base de cristal tallado y pantalla de lino blanco. Emite una luz cálida y acogedora.',
    price: 5600,
    category: 'Iluminación',
    images: ['https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=800&q=80'],
    featured: false,
    specifications: { material: 'Cristal y lino', dimensions: '35x35x60 cm', weight: '4 kg', color: 'Transparente/Blanco' }
  },
  {
    id: 'prod-11',
    name: 'Cojines Decorativos (Set 4)',
    description: 'Set de 4 cojines decorativos en lino con diferentes texturas y patrones. Incluye rellenos de plumas sintéticas.',
    price: 3200,
    category: 'Textiles',
    images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80'],
    featured: false,
    specifications: { material: 'Lino', dimensions: '45x45 cm (c/u)', weight: '1.5 kg', color: 'Variados' }
  },
  {
    id: 'prod-12',
    name: 'Reloj de Pared de Diseño',
    description: 'Reloj de pared minimalista con esfera de madera natural y manecillas negras. Movimiento silencioso de cuarzo.',
    price: 7800,
    category: 'Accesorios',
    images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80'],
    featured: false,
    specifications: { material: 'Madera', dimensions: '40x40x3 cm', weight: '1 kg', color: 'Madera natural' }
  }
];

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Muebles', description: 'Muebles de diseño para hogar y oficina', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', productCount: 4 },
  { id: 'cat-2', name: 'Decoración', description: 'Piezas decorativas únicas', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80', productCount: 2 },
  { id: 'cat-3', name: 'Iluminación', description: 'Lámparas e iluminación de diseño', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80', productCount: 2 },
  { id: 'cat-4', name: 'Textiles', description: 'Cortinas, alfombras y cojines', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', productCount: 3 },
  { id: 'cat-5', name: 'Accesorios', description: 'Accesorios y complementos', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80', productCount: 1 }
];

export const initialStoreConfig: StoreConfig = {
  name: 'PARAGON',
  whatsappNumber: '',
  currency: 'MXN'
};

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'María García',
    customerPhone: '5512345678',
    items: [{ productId: 'prod-1', productName: 'Sofá de Terciopelo Azul', quantity: 1, unitPrice: 24500 }],
    total: 24500,
    status: 'completed',
    date: '2025-04-15T10:30:00Z',
    whatsappMessage: 'Hola, estoy interesado en el producto: Sofá de Terciopelo Azul'
  },
  {
    id: 'ORD-002',
    customerName: 'Carlos Rodríguez',
    customerPhone: '5587654321',
    items: [{ productId: 'prod-3', productName: 'Mesa de Centro de Mármol', quantity: 1, unitPrice: 15200 }],
    total: 15200,
    status: 'pending',
    date: '2025-04-17T14:20:00Z',
    whatsappMessage: 'Hola, estoy interesado en el producto: Mesa de Centro de Mármol'
  }
];
