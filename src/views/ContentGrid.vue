<template>
  <ion-page class="content-wrapper">
    <ion-item class="search-item">
      <ion-input placeholder="Recherche" v-model="searchTerm">
        <ion-icon slot="start" :icon="searchOutline"></ion-icon>
      </ion-input>
    </ion-item>
    <div class="content-grid">
      <GridItem v-for="drink in drinks" :key="drink.id" :drink="drink" class="grid-item"></GridItem>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonIcon, IonInput, IonItem, IonPage } from "@ionic/vue";
import { defineComponent, onMounted } from 'vue'
import GridItem from "@/views/GridItem.vue";
import { useDrinkStore } from '@/store/drinkStore';
import { searchOutline } from 'ionicons/icons';

export default defineComponent({
    name: "ContentGrid",
    components: {
        GridItem,
        IonIcon,
        IonInput,
        IonItem,
        IonPage
    },
    setup() {
        const drinkStore = useDrinkStore();

        onMounted(() => {
            if (!drinkStore.isLoaded) { // éviter des appels répétés
                // drinkStore.fetchDrinks();
            }
        });

        return {
            drinkStore,
            searchOutline
        };
    },
    computed: {
        drinks() {
            if (this.searchTerm) {
                return this.drinkStore.drinks.filter(drink => {
                    return drink.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
                });
            } else {
                return this.drinkStore.drinks;
            }
        },
    },
    data() {
        return {
            items: [],
            searchTerm: ''
        }
    }
})
</script>

<style scoped lang="scss">
.content-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  grid-auto-rows: 200px;
  max-width: 100%; /* Assure que la grille occupe toute la largeur disponible */
}

.grid-item {
  margin: 1rem; /* pour espacer les éléments */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-wrapper {
  display: grid;
  grid-template-rows: 7% 1fr 10%;
  overflow: scroll;
}

@media (max-width: 600px) {
  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 170px;
    justify-content: space-around;
  }
}

@media only screen and (max-width: 600px) {
  .content-grid {
    min-width: 100%;
  }
}
</style>