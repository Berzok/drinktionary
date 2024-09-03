<template>
  <ion-page class="overflow-scroll">
    <div class="content-grid">
      <GridItem v-for="drink in drinks" :key="drink" :drink="drink" class="grid-item"></GridItem>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
import { defineComponent, onMounted } from 'vue'
import GridItem from "@/views/GridItem.vue";
import { useDrinkStore } from '@/store/drinkStore';

export default defineComponent({
    name: "ContentGrid",
    components: {
        GridItem,
        IonPage
    },
    setup() {
        const drinkStore = useDrinkStore();

        onMounted(() => {
            if (!drinkStore.isLoaded) { // éviter des appels répétés
                // drinkStore.fetchDrinks();
            }
        });

        return {drinkStore};
    },
    created() {
        //this.fetchItems(); // Récupérer les éléments lors de la création du composant
    },
    computed: {
        drinks() {
            return this.drinkStore.drinks;
        },
    },
    data() {
        return {
            items: []
        }
    }
    ,
    methods: {
        async fetchItems() {
            try {
                // this.items = await ApiService.getAll();
            } catch (error) {
                // console.error('Erreur lors de la récupération des éléments:', error);
            }
        }
    }
})
</script>

<style scoped>
.content-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.grid-item {
    flex: 0 1 auto; /* flex-grow: 1, flex-shrink: 1, flex-basis: 200px */
    margin: 1rem; /* pour espacer les éléments */
}

.overflow-scroll {
    overflow: scroll;
}

@media (max-width: 600px) {
    .content-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-around;
    }
}

@media only screen and (max-width: 600px) {
    .content-grid {
        min-width: 100%;
    }
}
</style>