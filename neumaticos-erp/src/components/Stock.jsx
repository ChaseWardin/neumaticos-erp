import { useState } from 'react';
import { Package, Search, Filter, Plus } from 'lucide-react';
import StockForm from './Forms/StockForm';

const proveedoresMaestro = [
  { id: 1, nombre: 'Neumáticos del Este' },
  { id: 2, nombre: 'Importadora Global S.A.' },
  { id: 3, nombre: 'Distribuidora Pirelli' },
];

const Stock = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inventario, setInventario] = useState([
    { id: 1, nombre: 'Michelin Primacy 4', categoria: 'Auto', stock: 5, min: 10, proveedor: "Maracaibo",
      precio: '1.200.000' },
    { id: 2, nombre: 'Pirelli Scorpion AT', categoria: 'Camioneta', stock: 15, min: 8,proveedor:"Michellin", 
      precio: '1.850.000' },
    { id: 3, nombre: 'Bridgestone Turanza', categoria: 'Auto', stock: 3, min: 10, precio: '950.000' },
    { id: 4, nombre: 'Fate Max Senti', categoria: 'Auto', stock: 25, min: 15, precio: '600.000' },
  ]);

  const guardarProducto = ({ nombre, categoria, precio }) => {
    const nuevo = {
      id: Date.now(),
      nombre,
      categoria,
      stock: 0,
      min: 10,
      precio: precio ?? '—',
    };
    setInventario((prev) => [nuevo, ...prev]);
    setMostrarFormulario(false);
  };

  const inventarioFiltrado = inventario.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return [item.nombre, item.categoria].some((campo) => String(campo).toLowerCase().includes(q));
  });

  if (mostrarFormulario) {
    return (
      <StockForm
        proveedores={proveedoresMaestro}
        onCancelar={() => setMostrarFormulario(false)}
        onGuardar={guardarProducto}
      />
    );
  }

  return (
    <div className="bg-orange-50 overflow-hidden">
      <div className="p-4 border border-gray-500 rounded-t-xl flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Package className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Control de Existencias</h2>
        </div>
        <button
          type="button"
          onClick={() => setMostrarFormulario(true)}
          className="flex items-center gap-2 bg-erp-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md"
        >
          <Plus size={20} />
          Nuevo producto
        </button>
      </div>

      <div className="bg-white rounded shadow-md md:p-6 mb-6 mx-0 md:mx-0 border border-gray-500">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-orange outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4 text-center">Stock Actual</th>
                <th className="px-6 py-4 text-center">Stock Mín.</th>
                <th className="px-6 py-4 text-right">Precio Unitario</th>
                <th className="px-6 py-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventarioFiltrado.map((item) => (
                <tr key={item.id} className="hover:bg-orange-50/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-bold text-gray-700">{item.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{item.categoria}</td>
                  <td className="px-6 py-4 text-center font-mono font-bold">{item.stock}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{item.min}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-700">
                    {item.precio === '—' ? (
                      <span className="text-gray-400 font-medium">—</span>
                    ) : (
                      <>Gs. {item.precio}</>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.stock <= item.min ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-600 text-[10px] font-black uppercase border border-red-200">
                        Reposición Urgente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-600 text-[10px] font-black uppercase border border-green-200">
                        Stock OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;