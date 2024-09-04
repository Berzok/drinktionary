<template>
  <div class="loader-overlay" v-if="isLoading">
    <div class="spinner-border loader" role="status" aria-describedby="spinner de chargement">
      <ion-spinner name="crescent" color="primary"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSpinner } from "@ionic/vue";
import { useStore } from "@/store/mainStore";

export default defineComponent({
    name: 'LoadingSpinner',
    components: {
        IonSpinner
    },
    computed: {
        isLoading() {
            return useStore().isLoading;
        },
    },
});
</script>

<style scoped lang="scss">
.loader-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.loader {
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 14px);
    top: calc(50% - 14px);
    opacity: 1;
    color: white;
}

ion-spinner {
    transform: scale(3);
}
</style>