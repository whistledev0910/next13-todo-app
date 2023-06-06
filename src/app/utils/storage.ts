export const getDataFromLocal = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return {};
};

export const setDataToLocal = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: string) => {
  return localStorage.removeItem(key);
};

export const clearStorage = () => {
  return localStorage.clear();
};
