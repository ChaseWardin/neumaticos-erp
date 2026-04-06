import { useState } from 'react';
import { Send, FileText, CheckCircle, Clock, Plus } from 'lucide-react';

const Cotizaciones = () => {
  const [cotizaciones] = useState([
    { id: 'COT-001', pedido: '1001', fecha: '2026-03-31', proveedores: 3, estado: 'Enviado' },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Send className="text-erp-orange" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Pedidos de Cotización</h2>
        </div>
        <button className="flex items-center gap-2 bg-erp-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md text-sm">
          <Plus size={18} /> Nueva Cotización
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
            <tr>
              <th className="px-6 py-4">ID Cotización</th>
              <th className="px-6 py-4">Ref. Pedido</th>
              <th className="px-6 py-4">Fecha Envío</th>
              <th className="px-6 py-4">Proveedores</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cotizaciones.map((c) => (
              <tr key={c.id} className="hover:bg-orange-50/50 transition-colors text-sm">
                <td className="px-6 py-4 font-bold text-gray-700">{c.id}</td>
                <td className="px-6 py-4">Pedido #{c.pedido}</td>
                <td className="px-6 py-4 text-gray-600">{c.fecha}</td>
                <td className="px-6 py-4 text-gray-600">{c.proveedores} invitados</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-blue-600 font-bold">
                    <Clock size={14} /> {c.estado}
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

export default Cotizaciones;