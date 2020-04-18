export const storageKeys = {
  HIDE_LANDLORD_GUIDE: 'HIDE_LANDLORD_GUIDE',
  HIDE_CONSULTANT_GUIDE: 'HIDE_CONSULTANT_GUIDE',
  HIDE_COMPANY_GUIDE: 'HIDE_COMPANY_GUIDE',
};

export class Storage {
  saveData = async (key, value) => {
    localStorage.setItem(key, value);
  };

  getData = (key) => {
    return localStorage.getItem(key);
  };

  removeData = async (key) => {
    localStorage.removeItem(key);
  };
}
