
export const localList = {
  save(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
  },
  getList(key) {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : [];
  }
};




