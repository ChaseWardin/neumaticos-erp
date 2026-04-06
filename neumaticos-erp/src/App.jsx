import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PedidosCompra from './components/ModuloCompras/PedidosCompra';
import NuevoPedidoForm from './components/NuevoPedidoForm';
import Proveedores from './components/ModuloCompras/Proveedores';
import Cotizaciones from './components/ModuloCompras/Cotizaciones';
import Stock from './components/Stock';
import Ventas from './components/Ventas';
import Tesoreria from './components/Tesoreria'; // NUEVO
import Personal from './components/Personal'; // NUEVO

function App() {
  const [moduloActual, setModuloActual] = useState('compras'); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pedidos, setPedidos] = useState([
    { id: '1001', fecha: '2026-03-31', productos: 5, estado: 'Pendiente Cotización', items: [] },
    { id: '1002', fecha: '2026-03-30', productos: 2, estado: 'En Cotización', items: [] },
  ]);

  const guardarNuevoPedido = (items) => {
    const hoy = new Date();
    const fecha = hoy.toISOString().slice(0, 10);
    const nuevoPedido = {
      id: String(Date.now()).slice(-6),
      fecha,
      productos: items.length,
      estado: 'Pendiente Cotización',
      items,
    };
    setPedidos((prev) => [nuevoPedido, ...prev]);
    setMostrarFormulario(false);
  };

  const pendientesCotizacion = pedidos.filter((p) => p.estado === 'Pendiente Cotización').length;

  const renderContenido = () => {
    switch (moduloActual) {
      case 'proveedores': return <Proveedores />;
      case 'cotizaciones': return <Cotizaciones />;
      case 'stock': return <Stock />;
      case 'compras':
        if (mostrarFormulario) {
          return (
            <NuevoPedidoForm
              onCancelar={() => setMostrarFormulario(false)}
              onGuardarPedido={guardarNuevoPedido}
            />
          );
        }
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-erp-orange">
                <h3 className="font-bold text-gray-500 text-xs uppercase">Pedidos Totales</h3>
                <p className="text-3xl font-black text-erp-orange mt-1">{pedidos.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-blue-500">
                <h3 className="font-bold text-gray-500 text-xs uppercase">Pendientes de Cotización</h3>
                <p className="text-3xl font-black text-blue-500 mt-1">{pendientesCotizacion}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-erp-yellow">
                <h3 className="font-bold text-gray-500 text-xs uppercase">Alertas de Stock</h3>
                <p className="text-3xl font-black text-erp-yellow mt-1">3</p>
              </div>
            </div>
            <PedidosCompra
              onNuevoPedido={() => setMostrarFormulario(true)}
              pedidos={pedidos}
            />
          </>
        );
      default:
        return (
          <div className="bg-white p-20 rounded-xl border-4 border-dotted border-gray-100 text-center">
            <p className="text-gray-300 font-black uppercase text-xl">Módulo en Desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-orange-50 font-sans text-gray-900">
      <Sidebar setModulo={setModuloActual} moduloActual={moduloActual} />
      <main className="flex-1 overflow-auto p-10">
        <header className="mb-8 border-b-2 border-erp-yellow pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-erp-orange uppercase tracking-tighter">
              {moduloActual.replace('tesoreria', 'Tesorería').replace('personal', 'Recursos Humanos')}
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-orange-100 text-right">
            <span className="block text-[9px] font-black text-erp-orange uppercase">Estado del Sistema</span>
            <span className="text-xs font-bold text-green-500 flex items-center gap-1 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE
            </span>
          </div>
        </header>
        {renderContenido()}
      </main>
    </div>
  );
}

export default App;