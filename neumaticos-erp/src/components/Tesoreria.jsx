import { Landmark, ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

const Tesoreria = () => {
  const movimientos = [
    { id: 1, concepto: 'Cobro Factura FAC-001', tipo: 'Ingreso', monto: '4.800.000', fecha: '2026-03-31' },
    { id: 2, concepto: 'Pago Proveedor: Pirelli', tipo: 'Egreso', monto: '2.500.000', fecha: '2026-03-30' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
          <div className="flex justify-between items-center text-green-600 mb-2">
            <span className="text-xs font-black uppercase">Disponibilidad Caja</span>
            <Wallet size={20} />
          </div>
          <p className="text-3xl font-black text-gray-800">Gs. 12.450.000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-erp-orange">
          <div className="flex justify-between items-center text-erp-orange mb-2">
            <span className="text-xs font-black uppercase">Pagos Pendientes</span>
            <ArrowDownCircle size={20} />
          </div>
          <p className="text-3xl font-black text-gray-800">Gs. 3.100.000</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Landmark className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Movimientos de Caja</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
            <tr>
              <th className="px-6 py-4">Concepto</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 italic">
            {movimientos.map((m) => (
              <tr key={m.id} className="text-sm">
                <td className="px-6 py-4 font-bold flex items-center gap-2">
                  {m.tipo === 'Ingreso' ? <ArrowUpCircle size={14} className="text-green-500" /> : <ArrowDownCircle size={14} className="text-red-500" />}
                  {m.concepto}
                </td>
                <td className="px-6 py-4 text-gray-500">{m.fecha}</td>
                <td className={`px-6 py-4 text-right font-black ${m.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                  {m.tipo === 'Ingreso' ? '+' : '-'} {m.monto}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tesoreria;