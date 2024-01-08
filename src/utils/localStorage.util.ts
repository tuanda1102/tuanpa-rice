export const setLocalStorage = <T = string>(key: string, value: T) => {
  if (!key || !String(value)) {
    throw new Error('Key and value are required');
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T = any>(
  key: string,
  defaultValue: T | null,
) => {
  const value = localStorage.getItem(key);
  if (value && typeof value !== 'string') {
    throw new Error('Value must be a string.');
  }
  return value ? JSON.parse(value) : defaultValue;
};

export const removeLocalStorageByKey = (key: string) => {
  if (!key) {
    throw new Error('Key is required');
  }
  localStorage.removeItem(key);
};
