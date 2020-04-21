export const storageKeys = {};

export class Storage {
  saveString = async (key, value) => {
    localStorage.setItem(key, `${value}`);
  };

  getString = (key) => {
    return `${localStorage.getItem(key)}`;
  };

  saveBoolean = async (key, value) => {
    localStorage.setItem(key, value ? 'true' : 'false');
  };

  getBoolean = (key) => {
    return localStorage.getItem(key) === 'true';
  };

  removeData = async (key) => {
    localStorage.removeItem(key);
  };
}
