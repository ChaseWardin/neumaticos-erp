import { prisma } from '../lib/prisma.js';
import { contextoPeriodo } from './contextoPeriodo.js';

/**
 * Genera un asiento contable automático.
 * @param {Object} params
 * @param {import('@prisma/client').Prisma.TransactionClient|null} txClient
 * @param {{ strict?: boolean }} options — strict=true lanza error si falla (para transacciones)
 */
export const registrarAsientoAutomatico = async (params, txClient = null, options = {}) => {
  const db = txClient || prisma;
  const { strict = false } = options;
  const {
    fecha,
    descripcion,
    tabla_origen,
    id_registro_origen,
    detalles,
  } = params;

  try {
    const contextStore = contextoPeriodo.getStore();
    const workingPeriodId = contextStore?.workingPeriodId;

    let periodoActivo = null;
    if (workingPeriodId) {
      periodoActivo = await db.proceso_contable.findFirst({
        where: { id_proc_contable: workingPeriodId, estado: 'Abierto' }
      });
    }

    if (!periodoActivo) {
      periodoActivo = await db.proceso_contable.findFirst({
        where: { estado: 'Abierto' },
        orderBy: { fecha_inicio: 'desc' },
      });
    }

    if (!periodoActivo) {
      const msg = 'No hay un periodo contable abierto. Abrí un periodo en Contabilidad antes de registrar movimientos.';
      if (strict) throw new Error(msg);
      console.warn(`⚠️ ${msg}`);
      return null;
    }

    if (fecha && periodoActivo.fecha_inicio && periodoActivo.fecha_fin) {
      const fechaAsiento = new Date(fecha);
      const inicio = new Date(periodoActivo.fecha_inicio);
      const fin = new Date(periodoActivo.fecha_fin);
      if (fechaAsiento < inicio || fechaAsiento > fin) {
        const msg = `La fecha del asiento (${new Date(fecha).toISOString().split('T')[0]}) está fuera del periodo (${periodoActivo.fecha_inicio.toISOString().split('T')[0]} al ${periodoActivo.fecha_fin.toISOString().split('T')[0]})`;
        if (strict) throw new Error(msg);
        console.warn(`⚠️ ${msg}`);
        return null;
      }
    }

    const detallesConId = await Promise.all(
      detalles.map(async (d) => {
        let cuenta = await db.plan_cuentas.findFirst({
          where: { cuenta_contable: d.cuenta_codigo },
        });

        if (!cuenta) {
          cuenta = await db.plan_cuentas.create({
            data: {
              cuenta_contable: d.cuenta_codigo,
              nombre: d.glosa || `Cuenta Automática ${d.cuenta_codigo}`,
              asentable: true,
              id_proc_contable: periodoActivo.id_proc_contable,
              nivel: 1,
            },
          });
        }

        return {
          id_cuenta: cuenta.id_cuenta,
          monto: d.monto,
          debe_haber: d.debe_haber,
        };
      })
    );

    const totalDebe = detallesConId
      .filter((d) => d.debe_haber === true)
      .reduce((sum, d) => sum + Number(d.monto), 0);

    const totalHaber = detallesConId
      .filter((d) => d.debe_haber === false)
      .reduce((sum, d) => sum + Number(d.monto), 0);

    if (Math.abs(totalDebe - totalHaber) > 0.01) {
      throw new Error(`Partida doble no balanceada: Debe=${totalDebe}, Haber=${totalHaber}`);
    }

    const ultimoAsiento = await db.asientos.findFirst({
      where: { id_proc_contable: periodoActivo.id_proc_contable },
      orderBy: { numero_asiento: 'desc' },
    });
    const nroAsiento = (ultimoAsiento?.numero_asiento || 0) + 1;

    const asiento = await db.asientos.create({
      data: {
        fecha: fecha || new Date(),
        numero_asiento: nroAsiento,
        descripcion,
        total_debe: totalDebe,
        total_haber: totalHaber,
        estado: 'confirmado',
        tabla_origen,
        id_registro_origen,
        id_proc_contable: periodoActivo.id_proc_contable,
        asiento_detalle: {
          create: detallesConId.map((d) => ({
            id_cuenta: d.id_cuenta,
            monto: d.monto,
            debe_haber: d.debe_haber,
          })),
        },
      },
      include: { asiento_detalle: true },
    });

    return asiento;
  } catch (error) {
    console.error('❌ Error al registrar asiento automático:', error);
    if (strict) throw error;
    return null;
  }
};
