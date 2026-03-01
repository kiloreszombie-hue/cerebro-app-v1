// localStorage management module

const LocalStorageManager = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getItem: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    removeItem: (key) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    },

    getAllItems: () => {
        const items = {};
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            items[key] = LocalStorageManager.getItem(key);
        }
        return items;
    }
};

export default LocalStorageManager;