import axios from 'axios';
import { Drink } from '@/interfaces/Drink';

// Configuration de l'URL de la route de l'API
const API_URL = '/drink'; // Remplacez par l'URL de votre API

// Service API CRUD
const drinkService = {

    /**
     * Récupérer toutes les ressources
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async getAll(): Promise<Drink[]> {
        return axios.get(`${API_URL}/all`)
            .then(response => {
                return response.data.toSorted((a: any, b: any) => {
                    return a.name.localeCompare(b.name);
                }) as Array<Drink>;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
                console.log('Utilisation des données en cache.')
                throw error;
            });
    },

    /**
     * Récupérer une ressource par son ID
     * @param {Number} id - ID de la ressource
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async getById(id: number): Promise<Drink> {
        return axios.get(`${API_URL}/items/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Erreur lors de la récupération de l'élément avec l'ID ${id}:`, error);
                throw error;
            });
    }
};

export default drinkService;
