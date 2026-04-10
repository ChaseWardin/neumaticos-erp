import { useState } from 'react';
import { Plus, Eye, ClipboardList, X } from 'lucide-react';

const proveedoresMaestro = [
  { id: 1, nombre: 'Neumáticos del Este' },
  { id: 2, nombre: 'Importadora Global S.A.' },
  { id: 3, nombre: 'Distribuidora Pirelli' },
];

const PedidosCompra = ({ onNuevoPedido, pedidos }) => {
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Pedidos de Compra</h2>
        </div>
        <button 
          onClick={onNuevoPedido}
          className="flex items-center gap-2 bg-erp-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md"
        >
          <Plus size={20} /> Nuevo Pedido
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-erp-orange uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Nro. Pedido</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Cant. Items</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pedidos.map((p) => (
              <tr key={p.id} className="hover:bg-orange-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-700">#{p.id}</td>
                <td className="px-6 py-4 text-gray-600">{p.fecha}</td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{p.productos} productos</span>
                    <button
                      onClick={() => setPedidoDetalle(p)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Ver ítems del pedido"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                    {p.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pedidoDetalle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-16">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-orange-100 overflow-hidden">
            <div className="bg-erp-orange p-4 flex items-center justify-between">
              <h3 className="text-white font-bold">Detalle de ítems del pedido #{pedidoDetalle.id}</h3>
              <button
                onClick={() => setPedidoDetalle(null)}
                className="text-white hover:bg-orange-600 rounded-full p-1"
                title="Cerrar detalle"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {!pedidoDetalle.items || pedidoDetalle.items.length === 0 ? (
                <p className="text-sm text-gray-500">Este pedido no tiene ítems cargados.</p>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase">
                      <tr>
                        <th className="px-4 py-2">Producto</th>
                        <th className="px-4 py-2 text-center">Cantidad</th>
                        <th className="px-4 py-2 text-center">Proveedor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pedidoDetalle.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2">{item.nombreProducto}</td>
                          <td className="px-4 py-2 text-center font-medium">{item.cantidad}</td>
                          <td className="px-4 py-2 text-center font-medium">{item.proveedorNombre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosCompra;