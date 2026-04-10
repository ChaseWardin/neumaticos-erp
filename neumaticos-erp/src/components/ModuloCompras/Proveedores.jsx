import { useState } from 'react';
import { Plus, Phone, Mail, MapPin, Users, Tag, X, Save, Building2, Edit, Trash2, Search } from 'lucide-react';

const Proveedores = () => {
  const [mostrarFormProvee, setMostrarFormProvee] = useState(false);
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: 'Neumáticos del Este', ruc: '80012345-0', categoria: 'Neumáticos Camioneta', contacto: 'Juan Pérez', telefono: '0981-111222',
      direccion: 'Av. de los Próceres, 123' },
    { id: 2, nombre: 'Importadora Global S.A.', ruc: '80098765-1', categoria: 'Lubricantes', contacto: 'María García', telefono: '0971-333444',
      direccion: 'Calle de la Paz, 456' },
    { id: 3, nombre: 'Distribuidora Pirelli', ruc: '80055443-2', categoria: 'Neumáticos Auto', contacto: 'Carlos Ruiz', telefono: '0961-555666',
      direccion: 'Av. de la Libertad, 789' },
  ]);

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [cat, setCat] = useState('Neumáticos Auto');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  const categoriasDisponibles = [...new Set(proveedores.map((p) => p.categoria))].sort();

  const proveedoresFiltrados = proveedores.filter((p) => {
    const q = searchTerm.trim().toLowerCase();
    const coincideTexto =
      !q ||
      [p.nombre, p.contacto, p.ruc, p.direccion]
        .filter(Boolean)
        .some((campo) => String(campo).toLowerCase().includes(q));
    const coincideCategoria = filtroCategoria === 'todas' || p.categoria === filtroCategoria;
    return coincideTexto && coincideCategoria;
  });

  const guardarProveedor = () => {
    if (!nombre || !ruc || !contacto || !direccion || !telefono) return;
    const nuevo = {
      id: Date.now(),
      nombre,
      ruc,
      categoria: cat,
      contacto,
      telefono,
      direccion,
    };
    setProveedores([...proveedores, nuevo]);
    setMostrarFormProvee(false);
    setNombre('');
    setRuc('');
    setContacto('');
    setDireccion('');
    setTelefono('');
  };

  if (mostrarFormProvee) {
    return (
      <div className="bg-white rounded-xl shadow-2xl border border-red-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-erp-orange p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
            <Building2 size={20}/> Nuevo Proveedor
          </h2>
          <button onClick={() => setMostrarFormProvee(false)} className="text-white hover:bg-orange-600 rounded-full p-1">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Razón Social</label>
              <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none" placeholder="Nombre de la empresa"/>
            </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">RUC</label>
                <input type="text" value={ruc} onChange={(e)=>setRuc(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none" placeholder="1234567-0"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contacto</label>
                <input type="text" value={contacto} onChange={(e)=>setContacto(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none" placeholder="Nombre del contacto"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Dirección</label>
                <input type="text" value={direccion} onChange={(e)=>setDireccion(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none" placeholder="Dirección de la empresa"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
                <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none" placeholder="Teléfono de la empresa"/>
              </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Categoría de Productos</label>
              <select value={cat} onChange={(e)=>setCat(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-erp-orange outline-none bg-white">
                <option>Neumáticos Auto</option>
                <option>Neumáticos Camioneta</option>
                <option>Lubricantes</option>
                <option>Accesorios</option>
              </select>
            </div>

          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setMostrarFormProvee(false)} className="px-6 py-2 text-gray-600 font-semibold bg-orange-100 hover:bg-orange-200 rounded-lg">Cancelar</button>
            <button onClick={guardarProveedor} className="px-6 py-2 bg-erp-orange text-white font-bold rounded-lg shadow-md hover:bg-orange-600 flex items-center gap-2">
              <Save size={20} /> Guardar Proveedor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 overflow-hidden">
      <div className="p-4 border border-gray-500 rounded-t-xl flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Users className="text-erp-orange" />
          <h2 className="text-xl font-bold text-gray-800">Maestro de Proveedores</h2>
        </div>
        <button 
          onClick={() => setMostrarFormProvee(true)}
          className="flex items-center gap-2 bg-erp-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md"
        >
          <Plus size={20} /> Nuevo Proveedor
        </button>
      </div>

      {/* Búsqueda y filtro */}
      <div className="bg-white rounded shadow-md md:p-6 mb-6 mx-0 md:mx-0 border border-gray-500">
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre, RUC, contacto o dirección..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-orange outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 sm:w-64 shrink-0">
            <Tag className="w-5 h-5 text-gray-400 shrink-0 hidden sm:block" aria-hidden />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-erp-orange outline-none bg-white text-sm font-medium text-gray-700"
              aria-label="Filtrar por categoría"
            >
              <option value="todas">Todas las categorías</option>
              {categoriasDisponibles.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        {proveedoresFiltrados.length === 0 && (
          <p className="mt-3 text-sm text-gray-500">No hay proveedores que coincidan con la búsqueda o el filtro.</p>
        )}
      </div>

      {/* Ficha de Proveedor */}
      <div className="grid rounded shadow grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-orange-50 mt-8">
        {proveedoresFiltrados.map((proveedor) => (
          <div key={proveedor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{proveedor.nombre}</h3>
                  <div className="text-xs text-gray-400 font-mono">{proveedor.ruc}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-erp-orange font-bold hover:underline text-sm uppercase"><Edit size={20} /></button>
                  <button className="text-erp-orange font-bold hover:underline text-sm uppercase"><Trash2 size={20} /></button>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  <span>{proveedor.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} />
                  <span>{proveedor.contacto}</span> 
                </div>  
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={14} />
                  <span>{proveedor.direccion}</span>
                </div>
              </div>  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proveedores;