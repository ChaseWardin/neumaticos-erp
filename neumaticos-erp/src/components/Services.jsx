import { Search, Wrench, Clock3 } from 'lucide-react';

const Services = () => {
  const servicios = [
    { id: 1, nombre: 'Calibracion de neumaticos', categoria: 'Mantenimiento', precio: '1.000.000', duracion_aprox: '30 min', estado: 'Disponible' },
    { id: 2, nombre: 'Instalacion de neumaticos', categoria: 'Instalacion', precio: '300.000', duracion_aprox: '20 min', estado: 'Disponible' },
    { id: 3, nombre: 'Mantenimiento preventivo', categoria: 'Mantenimiento', precio: '300.000', duracion_aprox: '60 min', estado: 'Alta Demanda' },
    { id: 4, nombre: 'Alineacion y balanceo', categoria: 'Alineacion', precio: '450.000', duracion_aprox: '45 min', estado: 'Disponible' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wrench className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Servicios de Taller</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar servicio..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-erp-orange outline-none w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-erp-orange uppercase text-xs font-black">
            <tr>
              <th className="px-6 py-4">Servicio</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4 text-center">Duracion Aprox.</th>
              <th className="px-6 py-4 text-right">Precio</th>
              <th className="px-6 py-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {servicios.map((servicio) => (
              <tr key={servicio.id} className="hover:bg-orange-50/50 transition-colors text-sm">
                <td className="px-6 py-4 font-bold text-gray-700">{servicio.nombre}</td>
                <td className="px-6 py-4 text-gray-600">{servicio.categoria}</td>
                <td className="px-6 py-4 text-center text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} />
                    {servicio.duracion_aprox}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-700">Gs. {servicio.precio}</td>
                <td className="px-6 py-4 text-center">
                  {servicio.estado === 'Alta Demanda' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase border border-yellow-200">
                      Alta Demanda
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-600 text-[10px] font-black uppercase border border-green-200">
                      Disponible
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

export default Services;