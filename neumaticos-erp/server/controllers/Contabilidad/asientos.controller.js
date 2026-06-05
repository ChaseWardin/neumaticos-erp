import { prisma } from '../../lib/prisma.js';
import { generarAsientoPorModelo } from '../../utils/generarAsientoPorModelo.utils.js';
import { contextoPeriodo } from '../../utils/contextoPeriodo.js';

// GET: Obtener todos los asientos para la tabla del frontend
export const getAsientosCompras = async (req, res) => {
  try {
    const asientos = await prisma.asientos.findMany({
      where: {
        OR: [
          { tabla_origen: 'factura_compra' },
          { tabla_origen: 'nota_credito' },
          { tabla_origen: 'orden_pago_proveedores' },
        ],
      },
      orderBy: { id_asiento: 'desc' },
    });
    res.json(asientos);
  } catch (error) {
    console.error("Error al obtener asientos:", error);
    res.status(500).json({ error: 'Error al obtener asientos' });
  }
};

export const getAsientosVentas = async (req, res) => {
  try {
    const asientos = await prisma.asientos.findMany({
      where: {
        OR: [
          { tabla_origen: 'factura_venta' },
          { tabla_origen: 'nota_credito_venta' },
          { tabla_origen: 'cobranza' },
        ]
      },
      include: {
        asiento_detalle: {
          include: {
            plan_cuentas: true
          }
        }
      },
      orderBy: { id_asiento: 'desc' }
    });
    res.json(asientos);
  } catch (error) {
    console.error("Error al obtener asientos ventas:", error);
    res.status(500).json({ error: 'Error al obtener asientos ventas' });
  }
};

export const ejecutarAsientoContableCompra = async (tx, factura) => {
  const total = Number(factura.total);
  const montoIva = Math.round(total / 11);
  const montoNeto = total - montoIva;

  return await generarAsientoPorModelo({
    operacion_asiento: 'COMPRA_FACTURA',
    fecha: new Date(),
    descripcion: `Compra Factura Nro: ${factura.id_factura_compra}`,
    tabla_origen: 'factura_compra',
    id_registro_origen: factura.id_factura_compra,
    montos: [montoNeto, montoIva, total],
  }, tx, { strict: true });
};

export const ejecutarAsientoNotaCreditoCompra = async (tx, nc) => {
  const total = Number(nc.monto_subtotal);
  const montoIva = Math.round(total / 11);
  const montoNeto = total - montoIva;

  return await generarAsientoPorModelo({
    operacion_asiento: 'COMPRA_NOTA_CREDITO',
    fecha: new Date(),
    descripcion: nc.descripcion || `Nota de Crédito Compra Nro: ${nc.numero_nota || nc.id_nota_credito}`,
    tabla_origen: 'nota_credito',
    id_registro_origen: nc.id_nota_credito,
    montos: [total, montoNeto, montoIva],
  }, tx, { strict: true });
};

export const ejecutarAsientoCobroCliente = async (tx, cobranza, factura, cuentaBancariaId) => {
  const total = Number(cobranza.total);
  const nroFactura = factura.nro_factura ?? factura.id_factura_venta;

  return await generarAsientoPorModelo({
    operacion_asiento: 'COBRO_CLIENTE',
    fecha: cobranza.fecha_cobro || new Date(),
    descripcion: `Cobro Factura Nro: ${nroFactura} — Recibo ${cobranza.nro_recibo ?? ''}`.trim(),
    tabla_origen: 'cobranza',
    id_registro_origen: cobranza.id_cobranza,
    montos: [total, total],
    cuentaBancariaId,
  }, tx, { strict: true });
};

export const ejecutarAsientoPagoProveedor = async (tx, ordenPago, esParcial, cuentaBancariaId) => {
  const total = Number(ordenPago.total);
  const descripcion = `Pago Proveedor OP-${String(ordenPago.id_orden_pago).padStart(4, '0')}${esParcial ? ' (Parcial)' : ''}`;

  return await generarAsientoPorModelo({
    operacion_asiento: 'PAGO_PROVEEDOR',
    fecha: ordenPago.fecha_pago || new Date(),
    descripcion,
    tabla_origen: 'orden_pago_proveedores',
    id_registro_origen: ordenPago.id_orden_pago,
    montos: [total, total],
    cuentaBancariaId,
  }, tx, { strict: true });
};

// Cuentas para nómina
const CUENTAS_NOMINA = [
  { code: 'SYS-NOM-SUELDOS', nombre: 'Sueldos y Jornales' },
  { code: 'SYS-NOM-BONIF', nombre: 'Bonificación Familiar' },
  { code: 'SYS-NOM-IPS', nombre: 'Aportes y Retenciones a Pagar (IPS)' },
  { code: 'SYS-NOM-CAJA', nombre: 'Caja y Banco (Pago Nómina)' },
];

async function idsPlanCuentasNomina(tx) {
  const ids = [];
  for (const { code, nombre } of CUENTAS_NOMINA) {
    let row = await tx.plan_cuentas.findFirst({ where: { cuenta_contable: code } });
    if (!row) {
      row = await tx.plan_cuentas.create({
        data: { cuenta_contable: code, nombre, asentable: true }
      });
    }
    ids.push(row.id_cuenta);
  }
  return { sueldos: ids[0], bonif: ids[1], ips: ids[2], caja: ids[3] };
}

// POST /api/asientos  — usado por el módulo de nómina al cerrar proceso
export const createAsiento = async (req, res) => {
  const { descripcion, fecha, tabla_origen, id_registro_origen, id_proc_contable, detalles } = req.body;
  // detalles: [{ cuenta_contable, nombre_cuenta, debe, haber }]

  if (!detalles || detalles.length === 0) {
    return res.status(400).json({ error: 'detalles es requerido' });
  }

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      let periodoId = id_proc_contable ? Number(id_proc_contable) : null;

      if (!periodoId) {
        const contextStore = contextoPeriodo.getStore();
        periodoId = contextStore?.workingPeriodId ?? null;
      }

      if (!periodoId) {
        const periodoFallback = await tx.proceso_contable.findFirst({
          where: { estado: 'Abierto' },
          orderBy: { fecha_inicio: 'desc' },
        });
        if (periodoFallback) periodoId = periodoFallback.id_proc_contable;
      }

      if (!periodoId) {
        throw new Error('No hay un periodo contable abierto. Seleccioná un periodo de trabajo.');
      }

      const periodo = await tx.proceso_contable.findUnique({ where: { id_proc_contable: periodoId } });
      if (!periodo) throw new Error('El periodo contable seleccionado no existe');
      if (periodo.estado !== 'Abierto') throw new Error('El periodo contable seleccionado está cerrado');

      if (fecha && periodo.fecha_inicio && periodo.fecha_fin) {
        const fechaAsiento = new Date(fecha);
        const inicio = new Date(periodo.fecha_inicio);
        const fin = new Date(periodo.fecha_fin);
        if (fechaAsiento < inicio || fechaAsiento > fin) {
          throw new Error(
            `La fecha del asiento (${fecha}) está fuera del periodo (${periodo.fecha_inicio.toISOString().split('T')[0]} al ${periodo.fecha_fin.toISOString().split('T')[0]})`
          );
        }
      }

      const totalDebe = detalles.reduce((s, d) => s + Number(d.debe ?? 0), 0);
      const totalHaber = detalles.reduce((s, d) => s + Number(d.haber ?? 0), 0);

      const detallesConId = await Promise.all(
        detalles.map(async (d) => {
          let cuenta = await tx.plan_cuentas.findFirst({
            where: { cuenta_contable: d.cuenta_contable }
          });
          if (!cuenta) {
            cuenta = await tx.plan_cuentas.create({
              data: {
                cuenta_contable: d.cuenta_contable,
                nombre: d.nombre_cuenta,
                asentable: true,
              }
            });
          }
          return { id_cuenta: cuenta.id_cuenta, debe: Number(d.debe ?? 0), haber: Number(d.haber ?? 0) };
        })
      );

      const asiento = await tx.asientos.create({
        data: {
          fecha: fecha ? new Date(fecha) : new Date(),
          descripcion,
          total_debe: totalDebe,
          total_haber: totalHaber,
          estado: 'confirmado',
          tabla_origen: tabla_origen ?? 'nomina',
          id_registro_origen: id_registro_origen ?? null,
          id_proc_contable: periodoId,
          asiento_detalle: {
            create: detallesConId.map(d => ({
              id_cuenta: d.id_cuenta,
              monto: d.debe > 0 ? d.debe : d.haber,
              debe_haber: d.debe > 0,
            }))
          }
        },
        include: { asiento_detalle: true }
      });

      return asiento;
    });

    res.status(201).json({ ok: true, id_asiento: resultado.id_asiento });
  } catch (error) {
    console.error(' Error al crear asiento:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAsientosNomina = async (req, res) => {
  try {
    const asientos = await prisma.asientos.findMany({
      where: { tabla_origen: 'nomina' },
      orderBy: { id_asiento: 'desc' },
      include: {
        asiento_detalle: {
          include: { plan_cuentas: true }
        }
      }
    });
    res.json(asientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asientos de nómina' });
  }
};
