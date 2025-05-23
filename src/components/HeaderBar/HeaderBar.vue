<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import Plus from "../icons/IconPlus.vue";
import Sort from "@/components/HeaderBar/Sort.vue";
import ToggleFavorites from "@/components/HeaderBar/ToggleFavorites.vue";
import { listarProjetos } from "@/services/projectService";
import type { Project } from "@/types/Project";

const emit = defineEmits(["toggleFavoritos", "sortChange"]);

const projetos = ref<Project[]>([]);

defineProps<{
  totalProjetos: number;
}>();

onMounted(async () => {
  const resultado = await listarProjetos();
  projetos.value = resultado;
});

function atualizarFavoritos(valor: boolean) {
  emit("toggleFavoritos", valor);
}

function atualizarSort(tipo: string) {
  emit("sortChange", tipo);
}
</script>

<template>
  <div class="header__bar">
    <div class="total__bar">
      <h1 class="total__h1">
        Projetos
        <span>{{ totalProjetos > 0 ? `(${totalProjetos})` : "(0)" }}</span>
      </h1>
    </div>

    <div class="bar__buttons">
      <ToggleFavorites @update="atualizarFavoritos" />
      <Sort @update:sort="atualizarSort" />
      <router-link to="/create" class="btn btn__primary">
        <Plus />Novo projeto
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;
@use "@/assets/styles/scss/medias" as *;

.header__bar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @include mobile {
    flex-wrap: wrap;
  }

  .total__bar {
    .total__h1 {
      @include font-primaria(1.5rem, 700, 0);
      color: $secondary;
      display: flex;
      align-items: center;

      span {
        @include font-primaria(1.0625rem, 400, 0);
        margin-left: 0.5rem;
      }
    }
  }

  .bar__buttons {
    display: flex;
    align-items: center;

    @include mobile {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      margin-top: 2.5rem;
    }

    .btn__primary {
      padding: 0.5625rem 1.5rem;

      @include mobile {
        order: 2;
        margin-top: 2rem;
        width: max-content;
      }
    }
  }
}
</style>
