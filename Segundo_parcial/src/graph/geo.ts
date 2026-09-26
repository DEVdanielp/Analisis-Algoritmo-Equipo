/** Utilidades geográficas. */

const RADIO_TIERRA_KM = 6371;
/** Las vías no son rectas: se aplica un factor de sinuosidad urbana. */
export const FACTOR_VIAL = 1.35;
/** Velocidad promedio urbana sin tráfico (km/h). */
export const VELOCIDAD_BASE_KMH = 30;

interface Punto {
  lat: number;
  lng: number;
}

const rad = (g: number) => (g * Math.PI) / 180;

/** Distancia en línea recta (Haversine) en km. */
export function haversineKm(a: Punto, b: Punto): number {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(h));
}

/** Distancia vial estimada, redondeada a 0.1 km. */
export function distanciaVialKm(a: Punto, b: Punto): number {
  return Math.round(haversineKm(a, b) * FACTOR_VIAL * 10) / 10;
}

/** Minutos para recorrer un costo ponderado (km × tráfico) a velocidad base. */
export function minutosDesdeCosto(costoPonderado: number): number {
  return Math.round((costoPonderado / VELOCIDAD_BASE_KMH) * 60);
}
