import { useState, useRef, useCallback } from 'react';
import { Search, Plus, Pencil, Trash2, Star, X, Upload } from 'lucide-react';
import type { Product } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AdminProductsProps {
  products: Product[];
  categories: string[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  category: '',
  images: [],
  featured: false,
  specifications: { material: '', dimensions: '', weight: '', color: '' },
};

export default function AdminProducts({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleFeatured,
}: AdminProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setImagePreviews([]);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: [...product.images],
      featured: product.featured,
      badge: product.badge,
      specifications: product.specifications
        ? { ...product.specifications }
        : { material: '', dimensions: '', weight: '', color: '' },
    });
    setImagePreviews([...product.images]);
    setErrors({});
    setShowModal(true);
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImagePreviews((prev) => [...prev, result]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.category) newErrors.category = 'Selecciona una categoria';
    if (formData.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (formData.images.length === 0) newErrors.images = 'Sube al menos una imagen';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, { ...formData });
    } else {
      onAddProduct({ ...formData });
    }
    setShowModal(false);
    setFormData(emptyProduct);
    setImagePreviews([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium">Productos</h1>
          <p className="text-sm text-[#595959] mt-1">{products.length} productos en total</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-black/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Anadir Producto
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797979]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E2E2] rounded-xl text-sm outline-none focus:border-black transition-all"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#F1F1F1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F1F1]">
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Producto</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Precio</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Categoria</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Destacado</th>
                <th className="text-left text-xs text-[#797979] uppercase tracking-wider font-medium px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[#F1F1F1] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        {product.badge && (
                          <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded">{product.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">${product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-[#595959]">{product.category}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleFeatured(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.featured ? 'text-[#D6AE7B] bg-[#D6AE7B]/10' : 'text-[#E2E2E2] hover:bg-[#F5F5F5]'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-[#595959]" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[#595959]">
                    {searchQuery ? 'No se encontraron productos' : 'No hay productos. Anade uno nuevo.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingProduct ? 'Editar Producto' : 'Anadir Producto'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Image Upload */}
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Imagenes del producto *
              </label>
              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E2E2E2]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${
                    errors.images ? 'border-red-400 bg-red-50' : 'border-[#E2E2E2] hover:border-black bg-[#FAFAFA]'
                  }`}
                >
                  <Upload className="w-5 h-5 text-[#797979]" />
                  <span className="text-[10px] text-[#797979]">Subir</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              {errors.images && <p className="text-xs text-red-600 mt-1">{errors.images}</p>}
              <p className="text-xs text-[#797979] mt-1">JPG, PNG. Maximo 5MB por imagen</p>
            </div>

            {/* Name */}
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Sofa de Terciopelo"
                className={`w-full bg-[#F7F7F7] border rounded-xl px-4 py-3 outline-none focus:border-black transition-colors ${
                  errors.name ? 'border-red-400' : 'border-[#EDEDED]'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full bg-[#F7F7F7] border rounded-xl px-4 py-3 outline-none focus:border-black transition-colors appearance-none ${
                    errors.category ? 'border-red-400' : 'border-[#EDEDED]'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="0.00"
                    className={`w-full bg-[#F7F7F7] border rounded-xl pl-8 pr-4 py-3 outline-none focus:border-black transition-colors ${
                      errors.price ? 'border-red-400' : 'border-[#EDEDED]'
                    }`}
                  />
                </div>
                {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Descripcion
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el producto..."
                rows={4}
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors resize-none"
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Especificaciones
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.specifications?.material || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, material: e.target.value, dimensions: formData.specifications?.dimensions || '', weight: formData.specifications?.weight || '', color: formData.specifications?.color || '' }
                  })}
                  placeholder="Material"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.specifications?.dimensions || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, dimensions: e.target.value, material: formData.specifications?.material || '', weight: formData.specifications?.weight || '', color: formData.specifications?.color || '' }
                  })}
                  placeholder="Dimensiones"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.specifications?.weight || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, weight: e.target.value, material: formData.specifications?.material || '', dimensions: formData.specifications?.dimensions || '', color: formData.specifications?.color || '' }
                  })}
                  placeholder="Peso"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.specifications?.color || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, color: e.target.value, material: formData.specifications?.material || '', dimensions: formData.specifications?.dimensions || '', weight: formData.specifications?.weight || '' }
                  })}
                  placeholder="Color"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm"
                />
              </div>
            </div>

            {/* Badge & Featured */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                  Etiqueta (Badge)
                </label>
                <select
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value || undefined })}
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors appearance-none"
                >
                  <option value="">Ninguna</option>
                  <option value="NUEVO">NUEVO</option>
                  <option value="OFERTA">OFERTA</option>
                  <option value="POPULAR">POPULAR</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-11 h-6 rounded-full relative transition-colors ${
                      formData.featured ? 'bg-[#D6AE7B]' : 'bg-[#E2E2E2]'
                    }`}
                    onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        formData.featured ? 'translate-x-5.5 left-0.5' : 'left-0.5'
                      }`}
                      style={{ transform: formData.featured ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </div>
                  <span className="text-sm">Producto destacado</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E2E2]">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-black rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all duration-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-black/90 transition-colors"
              >
                {editingProduct ? 'Guardar Cambios' : 'Guardar Producto'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">Eliminar Producto</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. El producto se eliminara permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-black hover:bg-black hover:text-white transition-all duration-500">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm) onDeleteProduct(deleteConfirm);
                setDeleteConfirm(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
