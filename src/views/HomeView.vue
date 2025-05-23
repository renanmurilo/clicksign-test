<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import ProjectEmpty from "@/components/ProjectEmpty.vue";
import ProjectsList from "@/pages/ProjectsList.vue";
import HeaderBar from "@/components/HeaderBar/HeaderBar.vue";
import { listarProjetos } from "@/services/projectService";
import type { Project } from "@/types/Project";
import { useProjectSorter } from "@/composables/useProjectSorter";

const projetos = ref<Project[]>([]);
const carregando = ref(true);
const isFavoriteOnly = ref(false);

const { sortedProjects, sortType, setSortType, updateProjects } =
  useProjectSorter(projetos.value);

onMounted(async () => {
  await carregarProjetos();
});

async function carregarProjetos() {
  try {
    const resultado = await listarProjetos();
    projetos.value = resultado;
    updateProjects(resultado);
  } catch (error) {
    console.error("Erro ao listar projetos:", error);
  } finally {
    carregando.value = false;
  }
}

function atualizarProjetoFavorito(projetoAtualizado: Project) {
  const index = projetos.value.findIndex(
    (p) => (p.$id || p.id) === (projetoAtualizado.$id || projetoAtualizado.id)
  );

  if (index !== -1) {
    projetos.value[index].favorito = projetoAtualizado.favorito;
    updateProjects(projetos.value);
  }
}

function handleToggleFavoritos(valor: boolean) {
  isFavoriteOnly.value = valor;
}

function handleSortChange(novoValor: string) {
  setSortType(novoValor);
}

const projetosFiltrados = computed(() => {
  const lista = isFavoriteOnly.value
    ? sortedProjects.value.filter((p) => p.favorito)
    : sortedProjects.value;

  return lista;
});
</script>

<template>
  <main>
    <HeaderBar
      :totalProjetos="projetosFiltrados.length"
      @toggleFavoritos="handleToggleFavoritos"
      @sortChange="handleSortChange"
    />

    <div v-if="carregando">
      <p>Carregando projetos...</p>
    </div>

    <div v-else-if="projetosFiltrados.length === 0">
      <p v-if="isFavoriteOnly">Não existem produtos favoritos.</p>
      <ProjectEmpty v-else />
    </div>

    <ProjectsList
      v-else
      :projetos="projetosFiltrados"
      @projetoRemovido="carregarProjetos"
      @favoritoAtualizado="atualizarProjetoFavorito"
    />
  </main>
</template>
