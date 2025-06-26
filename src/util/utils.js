export const criarArray = (n) => {
  return Array.from({ length: n }, (_, i) => i + 1);
};

export const isEqualArray = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, idx) => val === arr2[idx]);
};
