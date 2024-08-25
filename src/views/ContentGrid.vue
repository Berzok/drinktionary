<template>
  <ion-page class="overflow-scroll">
    <div class="content-grid">
      <GridItem v-for="drink in drinks" :key="drink" :drink="drink" class="grid-item"></GridItem>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {IonPage} from "@ionic/vue";
import {defineComponent} from 'vue'
import GridItem from "@/views/GridItem.vue";
import drinks from "/src/data.json";

export default defineComponent({
  name: "ContentGrid",
  components: {
    GridItem,
    IonPage
  },
  data() {
    return {
      drinks: drinks
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

  .grid-item {
    //flex: 1 1 auto; /* Les éléments prennent toute la largeur disponible */
    //min-width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .content-grid {
    min-width: 100%;
  }
}
</style>