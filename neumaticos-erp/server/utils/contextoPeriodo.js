import { AsyncLocalStorage } from 'async_hooks';

/**
 * Almacena el ID del periodo contable seleccionado por el usuario
 * durante el ciclo de vida de la petición HTTP.
 */
export const contextoPeriodo = new AsyncLocalStorage();
