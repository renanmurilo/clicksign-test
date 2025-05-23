<script setup lang="ts">
import Plus from "./icons/IconPlus.vue";
</script>

<template>
  <div class="empty">
    <h1 class="empty__title">Nenhum projeto</h1>
    <p class="empty__text">
      Clique no botão abaixo para criar o primeiro e gerenciá-lo.
    </p>
    <router-link to="/create" class="btn btn__primary">
      <Plus />Novo projeto
    </router-link>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;

.empty {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 880px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: $white;
  margin: 0 auto;

  .empty__title {
    @include font-primaria(1.5rem, 600, 0);
    color: $primary;
    margin-bottom: 1.5rem;
  }

  .empty__text {
    @include font-primaria;
    color: $text;
    margin-bottom: 2rem;
  }
}
</style>
