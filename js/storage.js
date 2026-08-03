/* ================================================================
   MODULE 1: StorageService
   Responsibility: Handle saving/loading state from sessionStorage
   ================================================================ */
const StorageService = {
    KEY: 'resume_builder_data_v11',

    save(data) {
        try {
            sessionStorage.setItem(this.KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Storage failed:", e);
        }
    },

    load() {
        try {
            const data = sessionStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Load failed:", e);
            return null;
        }
    },

    clear() {
        sessionStorage.removeItem(this.KEY);
    }
};