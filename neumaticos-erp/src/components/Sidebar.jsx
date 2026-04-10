import { ChevronDown, ChevronRight, ShoppingCart, Tag, Landmark, Users, Calculator, 
  Package, Wrench, LogOut,  Send,  UserSquare2 } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ setModulo, moduloActual }) => {
  const [comprasAbierto, setComprasAbierto] = useState(true);

  const moduloComprasItems = [
    { id: 'proveedores', icon: <Users size={18} />, label: 'Proveedores' },
    { id: 'compras', icon: <ShoppingCart size={18} />, label: 'Pedidos de Compra' },
    { id: 'cotizaciones', icon: <Send size={18} />, label: 'Cotizaciones' },
  ];

  const menuItems = [
    { id: 'ventas', icon: <Tag size={20} />, label: 'Ventas & Facturación' },
    { id: 'stock', icon: <Package size={20} />, label: 'Stock / Existencias' },
    { id: 'servicios', icon: <Wrench size={20} />, label: 'Servicios' },
    { id: 'tesoreria', icon: <Landmark size={20} />, label: 'Tesorería' },
    { id: 'personal', icon: <UserSquare2 size={20} />, label: 'Personal' },
  ];

  return (
    <div className="w-64 h-screen bg-erp-yellow flex flex-col border-r border-orange-300 shrink-0 overflow-x-hidden">
      {/* Logo */}
      <div className="p-6 flex flex-col items-center border-b border-orange-300">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
           <Package className="text-erp-orange" size={32} />
        </div>
        <h2 className="font-bold text-erp-orange text-lg text-center leading-tight">
          Neumáticos ERP
        </h2>
      </div>

      {/* Menú */}
      <nav className="flex-1 mt-4 overflow-y-auto overflow-x-hidden">
        <div className="px-2">
          <button
            type="button"
            onClick={() => setComprasAbierto((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 text-orange-900 hover:bg-orange-200 rounded-lg transition-all font-bold text-sm"
          >
            <span className="inline-flex items-center gap-3">
              <ShoppingCart size={20} />
              Modulo Compras
            </span>
            {comprasAbierto ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {comprasAbierto && (
            <div className="mt-1 mb-2">
              {moduloComprasItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setModulo(item.id)}
                  className={`w-full flex items-center gap-3 px-8 py-2 rounded-lg transition-all font-medium text-sm
                    ${moduloActual === item.id
                      ? 'bg-erp-orange text-white shadow-inner'
                      : 'text-orange-800 hover:bg-orange-200'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setModulo(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-3 transition-all font-medium text-sm
              ${moduloActual === item.id 
                ? 'bg-erp-orange text-white shadow-inner' 
                : 'text-orange-800 hover:bg-orange-200'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Salida */}
      <div className="p-4 border-t border-orange-300">
        <button className="w-full flex items-center gap-4 px-6 py-3 text-orange-900 font-bold bg-orange-200 rounded-lg hover:bg-red-200 transition-colors text-xs uppercase">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;