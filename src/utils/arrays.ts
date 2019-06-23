export const flatten = <T>(arr: any[], result: T[] = []) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    const val = arr[i];
    if (Array.isArray(val)) {
      flatten(val, result);
    } else {
      result.push(val);
    }
  }

  return result;
};
