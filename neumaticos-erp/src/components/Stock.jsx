import { Package, Search, Filter } from 'lucide-react';

const Stock = () => {
  const inventario = [
    { id: 1, nombre: 'Michelin Primacy 4', categoria: 'Auto', stock: 5, min: 10, precio: '1.200.000'},
    { id: 2, nombre: 'Pirelli Scorpion AT', categoria: 'Camioneta', stock: 15, min: 8, precio: '1.850.000'},
    { id: 3, nombre: 'Bridgestone Turanza', categoria: 'Auto', stock: 3, min: 10, precio: '950.000'},
    { id: 4, nombre: 'Fate Max Senti', categoria: 'Auto', stock: 25, min: 15, precio: '600.000'},
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Package className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Control de Existencias</h2>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar neumático..." className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-erp-orange outline-none w-64" />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-100 text-gray-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

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
            {inventario.map((item) => (
              <tr key={item.id} className="hover:bg-orange-50/50 transition-colors text-sm">
                <td className="px-6 py-4 font-bold text-gray-700">{item.nombre}</td>
                <td className="px-6 py-4 text-gray-600">{item.categoria}</td>
                <td className="px-6 py-4 text-center font-mono font-bold">{item.stock}</td>
                <td className="px-6 py-4 text-center text-gray-400">{item.min}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-700">Gs. {item.precio}</td>
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
  );
};

export default Stock;