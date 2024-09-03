import axios from 'axios';

// Configuration de l'URL de base de l'API
const API_URL = 'http://btc-vault'; // Remplacez par l'URL de votre API

// Service API CRUD
const ApiService = {

    /**
     * Récupérer toutes les ressources
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async getAll(): Promise<any[]> {
        return axios.get(`${API_URL}/drink/all`)
            .then(response => response.data)
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
                throw error;
            });
    },

    /**
     * Récupérer une ressource par son ID
     * @param {Number} id - ID de la ressource
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async getById(id: number): Promise<any> {
        return axios.get(`${API_URL}/items/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Erreur lors de la récupération de l'élément avec l'ID ${id}:`, error);
                throw error;
            });
    },

    /**
     * Créer une nouvelle ressource
     * @param {Object} data - Données de la ressource à créer
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async create(data: any): Promise<any> {
        return axios.post(`${API_URL}/items`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Erreur lors de la création de l\'élément:', error);
                throw error;
            });
    },

    /**
     * Mettre à jour une ressource existante
     * @param {Number} id - ID de la ressource à mettre à jour
     * @param {Object} data - Données mises à jour de la ressource
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async update(id: number, data: any): Promise<any> {
        return axios.put(`${API_URL}/items/${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error(`Erreur lors de la mise à jour de l'élément avec l'ID ${id}:`, error);
                throw error;
            });
    },

    /**
     * Supprimer une ressource par son ID
     * @param {Number} id - ID de la ressource à supprimer
     * @returns {Promise} Promesse contenant les données de la réponse de l'API
     */
    async delete(id: number): Promise<any> {
        return axios.delete(`${API_URL}/items/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Erreur lors de la suppression de l'élément avec l'ID ${id}:`, error);
                throw error;
            });
    }
};

export default ApiService;
