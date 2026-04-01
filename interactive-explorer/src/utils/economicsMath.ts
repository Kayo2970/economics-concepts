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
  const R = Math.sqrt(totalResources);
  for (let i = 0; i <= pointsCount; i++) {
    const x = (R / pointsCount) * i;
    const y = Math.sqrt(Math.max(0, totalResources - x * x));
    points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
  }
  return points;
};

export const calculateRegression = (data: Point[]): LinearEquation => {
  const n = data.length;
  if (n === 0) return { intercept: 0, slope: 0 };
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (const point of data) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumX2 += point.x * point.x;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { intercept, slope };
};

export const calculateMovingAverage = (data: Point[], period: number): Point[] => {
  const result: Point[] = [];
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].y;
    }
    result.push({ x: data[i].x, y: sum / period });
  }
  return result;
};

export const generateIndifferenceCurve = (utility: number, alpha: number, pointsCount: number = 50): Point[] => {
  const points: Point[] = [];
  const minX = 1;
  const maxX = 100;
  for (let i = 0; i <= pointsCount; i++) {
    const x = minX + (maxX - minX) * (i / pointsCount);
    const y = Math.pow(utility / Math.pow(x, alpha), 1 / (1 - alpha));
    if (y > 0 && y < 200) {
      points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
    }
  }
  return points;
};

export const generateBudgetLine = (income: number, priceX: number, priceY: number, pointsCount: number = 20): Point[] => {
  const points: Point[] = [];
  const maxX = income / priceX;
  for (let i = 0; i <= pointsCount; i++) {
    const x = (maxX / pointsCount) * i;
    const y = (income - priceX * x) / priceY;
    if (y >= 0) {
      points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
    }
  }
  return points;
};