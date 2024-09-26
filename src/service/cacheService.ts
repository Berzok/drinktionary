import { Filesystem, Directory } from '@capacitor/filesystem';
import { Drink } from '@/interfaces/Drink';
import axios from 'axios';

// Service API CRUD
const cacheService = {

    apiURL: process.env.VITE_API_URL as string,

    async cacheIcon(drink: Drink, fileName: string) {
        try {
            // Vérifier si l'image existe déjà dans le cache
            await Filesystem.readFile({
                path: `icons/${fileName}`,
                directory: Directory.Cache,
            });
            // Si l'image existe, vous pouvez la charger directement depuis le cache
        } catch (e) {
            // Si l'image n'existe pas, la télécharger et la stocker dans le cache
            const response = await axios.get(`/drink/icon/${drink.id}`, {
                responseType: 'blob'
            });
            const blob: Blob = await response.data;
            const base64Data = await this.convertBlobToBase64(blob);

            await Filesystem.writeFile({
                path: `icons/${fileName}`,
                data: base64Data,
                directory: Directory.Cache,
            });
        }
    },

    async cacheImage(drink: Drink, fileName: string) {
        try {
            // Vérifier si l'image existe déjà dans le cache
            await Filesystem.readFile({
                path: `images/${fileName}`,
                directory: Directory.Cache,
            });
            // Si l'image existe, vous pouvez la charger directement depuis le cache
        } catch (e) {
            // Si l'image n'existe pas, la télécharger et la stocker dans le cache
            const response = await axios.get(`/drink/image/${drink.id}`, {
                responseType: 'blob'
            });
            const blob: Blob = await response.data;
            const base64Data = await this.convertBlobToBase64(blob);

            await Filesystem.writeFile({
                path: `images/${fileName}`,
                data: base64Data,
                directory: Directory.Cache,
            });
        }
    },

    async loadCachedIcon(fileName: string): Promise<string> {
        try {
            const file = await Filesystem.readFile({
                path: `icons/${fileName}`,
                directory: Directory.Cache,
            });
            return `data:image/png;base64,${file.data}`;
        } catch (e) {
            // Gérer l'erreur si l'image n'est pas disponible
            console.dir(e);
            throw Error;
        }
    },

    async loadCachedImage(fileName: string): Promise<string> {
        try {
            const file = await Filesystem.readFile({
                path: `images/${fileName}`,
                directory: Directory.Cache,
            });
            return `data:image/png;base64,${file.data}`;
        } catch (e) {
            // Gérer l'erreur si l'image n'est pas disponible
            console.dir(e);
            throw Error;
        }
    },

    convertBlobToBase64(blob: Blob): Promise<string | Blob> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    resolve(result.split(',')[1]);
                }
            };
            reader.readAsDataURL(blob);
        });
    },

    /**
     * Vérifie si un fichier particulier est en cache
     * @param fileName
     * @param type
     */
    async isCached(fileName: string, type: 'icon' | 'image'): Promise<boolean> {
        try {
            const path = `${type === 'icon' ? 'icons' : 'images'}/${fileName}`;
            await Filesystem.readFile({
                path: path,
                directory: Directory.Cache,
            });
            return true; // Le fichier existe en cache
        } catch (e) {
            return false; // Le fichier n'existe pas en cache
        }
    }



};

export default cacheService;
