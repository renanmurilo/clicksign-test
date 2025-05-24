<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/projectStore";
import ProjectsList from "@/pages/ProjectsList.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import type { Project } from "@/types/Project";

const route = useRoute();
const termo = ref<string>((route.query.q as string) || "");
const resultados = ref<Project[]>([]);
const store = useProjectStore();

onMounted(async () => {
  if (store.projects.length === 0) {
    await store.fetchProjects();
  }
});

watchEffect(() => {
  const termoBusca = termo.value.toLowerCase();
  resultados.value = store.projects.filter((p) =>
    p.name.toLowerCase().includes(termoBusca)
  );
});

function carregarProjetos(): void {
  store.fetchProjects().then(() => {
    const termoBusca = termo.value.toLowerCase();
    resultados.value = store.projects.filter((p) =>
      p.name.toLowerCase().includes(termoBusca)
    );
  });
}

function atualizarProjetoFavorito(projetoAtualizado: Project) {
  const index = resultados.value.findIndex(
    (p) => (p.$id || p.id) === (projetoAtualizado.$id || projetoAtualizado.id)
  );

  if (index !== -1) {
    resultados.value[index].favorito = projetoAtualizado.favorito;
  }
}
</script>

<template>
  <main>
    <div class="breadcrumb">
      <router-link to="/" class="before__page">
        <IconArrowLeft /> Voltar
      </router-link>
      <h1 class="breadcrumb__h1">Resultado da busca</h1>
    </div>
    <div class="busca__view">
      <ProjectsList
        v-if="resultados.length"
        :projetos="resultados"
        :termo="termo"
        @projetoRemovido="carregarProjetos"
        @favoritoAtualizado="atualizarProjetoFavorito"
      />

      <p v-else>Nenhum resultado encontrado para "{{ termo }}"</p>
    </div>
  </main>
</template>
