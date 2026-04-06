import { useState } from 'react';
import { ShoppingBag, Plus, Search, FileText, User } from 'lucide-react';

const Ventas = () => {
  const [ventas] = useState([
    { id: 'FAC-001', cliente: 'Transporte Rápido S.A.', fecha: '2026-03-31', total: '4.800.000', estado: 'Cobrado' },
    { id: 'FAC-002', cliente: 'Juan Manuel Ortiz', fecha: '2026-03-31', total: '1.200.000', estado: 'Pendiente' },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Ventas & Facturación</h2>
        </div>
        <button className="flex items-center gap-2 bg-erp-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md">
          <Plus size={20} /> Nueva Venta
        </button>
      </div>

      <div className="p-4 bg-white border-b flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input type="text" placeholder="Buscar por cliente o factura..." className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm outline-none focus:ring-2 focus:ring-erp-orange" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
            <tr>
              <th className="px-6 py-4">Nro. Factura</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-right">Monto Total</th>
              <th className="px-6 py-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ventas.map((v) => (
              <tr key={v.id} className="hover:bg-orange-50/50 transition-colors text-sm">
                <td className="px-6 py-4 font-bold text-gray-700">{v.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    {v.cliente}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{v.fecha}</td>
                <td className="px-6 py-4 text-right font-black text-gray-700">Gs. {v.total}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase border ${
                    v.estado === 'Cobrado' ? 'bg-green-100 text-green-600 border-green-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200'
                  }`}>
                    {v.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ventas;