import { Users, ShieldCheck, Phone } from 'lucide-react';

const Personal = () => {
  const empleados = [
    { id: 1, nombre: 'Admin Sistema', cargo: 'Gerente', tel: '0981-111222', acceso: 'Total' },
    { id: 2, nombre: 'Ana Ventas', cargo: 'Vendedor', tel: '0971-333444', acceso: 'Limitado' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <Users className="text-erp-orange" />
        <h2 className="text-xl font-bold text-gray-800">Nómina de Personal</h2>
      </div>
      <table className="w-full text-left">
        <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
          <tr>
            <th className="px-6 py-4">Nombre y Cargo</th>
            <th className="px-6 py-4 text-center">Contacto</th>
            <th className="px-6 py-4 text-center">Nivel de Acceso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {empleados.map((e) => (
            <tr key={e.id} className="text-sm">
              <td className="px-6 py-4">
                <div className="font-black text-gray-700">{e.nombre}</div>
                <div className="text-[10px] text-erp-orange font-bold uppercase">{e.cargo}</div>
              </td>
              <td className="px-6 py-4 text-center text-gray-500 flex items-center justify-center gap-1">
                <Phone size={12} /> {e.tel}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-black flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-blue-500" /> {e.acceso}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Personal;