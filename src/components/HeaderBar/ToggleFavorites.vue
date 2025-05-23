<script setup lang="ts">
import { ref, watch } from "vue";
import VueToggles from "vue-toggles";

const emit = defineEmits(["update"]);

const isFavoriteOnly = ref<boolean>(false);

watch(isFavoriteOnly, (val) => {
  emit("update", val);
});
</script>

<template>
  <div class="bar__toggle">
    <VueToggles
      v-model="isFavoriteOnly"
      :height="24"
      :width="48"
      checkedBg="#FFB23D"
      uncheckedBg="#53525D"
    />
    <span>Apenas Favoritos</span>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;
@use "@/assets/styles/scss/medias" as *;

.bar__toggle {
  display: flex;
  align-items: center;

  @include mobile {
    order: 1;
  }

  span {
    @include font-primaria;
    color: $text-dark;
    margin-left: 0.5rem;
  }
}
</style>
