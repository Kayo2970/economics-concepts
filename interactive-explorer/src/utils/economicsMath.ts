export interface LinearEquation {
  intercept: number;
  slope: number;
}
export interface Point {
  x: number;
  y: number;
}
export const calculateEquilibrium = (demand: LinearEquation, supply: LinearEquation): Point | null => {
  const { intercept: a, slope: b } = demand;
  const { intercept: c, slope: d } = supply;
  if (b + d === 0) return null;
  const price = (a - c) / (b + d);
  const quantity = a - b * price;
  if (price < 0 || quantity < 0) return null;
  return { x: Math.round(quantity * 100) / 100, y: Math.round(price * 100) / 100 };
};
export const generateLinearPoints = (equation: LinearEquation, isDemand: boolean, maxPrice: number, pointsCount: number = 20): Point[] => {
  const points: Point[] = [];
  const { intercept, slope } = equation;
  for (let i = 0; i <= pointsCount; i++) {
    const price = (maxPrice / pointsCount) * i;
    const quantity = isDemand ? intercept - slope * price : intercept + slope * price;
    if (quantity >= 0) {
      points.push({ x: Math.round(quantity * 100) / 100, y: Math.round(price * 100) / 100 });
    }
  }
  return points;
};
export const calculateMarginalUtility = (totalUtilities: number[]): number[] => {
  const marginalUtilities: number[] = [totalUtilities[0]];
  for (let i = 1; i < totalUtilities.length; i++) {
    marginalUtilities.push(totalUtilities[i] - totalUtilities[i - 1]);
  }
  return marginalUtilities;
};
export const generatePPFPoints = (totalResources: number, pointsCount: number = 50): Point[] => {
  const points: Point[] = [];
  // Using a concave down function: y = sqrt(R^2 - x^2)
  const R = Math.sqrt(totalResources);
  for (let i = 0; i <= pointsCount; i++) {
    const x = (R / pointsCount) * i;
    const y = Math.sqrt(Math.max(0, totalResources - x * x));
    points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
  }
  return points;
};
