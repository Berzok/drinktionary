import { Filesystem, Directory } from '@capacitor/filesystem';

// Service API CRUD
const cacheService = {

    async cacheImage(url, fileName) {
        try {
            // Vérifier si l'image existe déjà dans le cache
            await Filesystem.readFile({
                path: `images/${fileName}`,
                directory: Directory.Cache,
            });
            // Si l'image existe, vous pouvez la charger directement depuis le cache
        } catch (e) {
            // Si l'image n'existe pas, la télécharger et la stocker dans le cache
            const response = await fetch(url);
            const blob = await response.blob();
            const base64Data = await convertBlobToBase64(blob);

            await Filesystem.writeFile({
                path: `images/${fileName}`,
                data: base64Data,
                directory: Directory.Cache,
            });
        }
    },

    async loadCachedImage(fileName) {
        try {
            const file = await Filesystem.readFile({
                path: `images/${fileName}`,
                directory: Directory.Cache,
            });
            return `data:image/png;base64,${file.data}`;
        } catch (e) {
            // Gérer l'erreur si l'image n'est pas disponible
            return null;
        }
    },


    convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
    }
};

export default cacheService;
