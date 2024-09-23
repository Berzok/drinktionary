import { acceptHMRUpdate, defineStore } from 'pinia';
import { Network } from '@capacitor/network';

const useStore = defineStore('main', {
    state: () => ({
        api: process.env.VITE_API_URL as string,
        loading: false,
        network: true
    }),
    getters: {
        isLoading: (state) => state.loading,
        getNetworkStatus: async () => await Network.getStatus()
    },
    actions: {},
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

export { useStore };