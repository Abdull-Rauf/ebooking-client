import { LocalStorageDataType } from 'types';

const getLocalStorageItem = (key: string): string | null => {
    const getItem = localStorage.getItem(key);
    return getItem;
};

const setLocalStorageItem = (data: LocalStorageDataType): void => {
    localStorage.setItem(data.key, data.value);
};

const expireLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key);
};

export { getLocalStorageItem, setLocalStorageItem, expireLocalStorageItem };
