import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, label: 'Direccion', value: 'Av. Paseo de la Reforma 250, Ciudad de Mexico, 06600' },
    { icon: Phone, label: 'Telefono', value: '+52 55 1234 5678', href: 'tel:+5215512345678' },
    { icon: Mail, label: 'Email', value: 'info@paragon.com', href: 'mailto:info@paragon.com' },
    { icon: Clock, label: 'Horario', value: 'Lun - Vie: 9:00 - 18:00, Sab: 10:00 - 14:00' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-[1728px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-7xl font-medium">Contactanos</h1>
          <p className="mt-4 text-lg text-[#595959] max-w-xl">
            Estamos aqui para ayudarte. Envianos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FAFAFA] rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#595959]" />
                </div>
                <div>
                  <p className="text-xs text-[#797979] uppercase tracking-wider font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base font-medium mt-1 block hover:text-[#D6AE7B] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base mt-1">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="aspect-video bg-[#F5F5F5] rounded-2xl overflow-hidden mt-8">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Mapa"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Asunto de tu mensaje"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-black/90 transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
