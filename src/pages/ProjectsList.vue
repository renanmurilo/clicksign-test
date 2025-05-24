<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProjectCard from "@/components/Card/ProjectCard.vue";
import DeleteProjectModal from "@/components/DeleteProjectModal.vue";
import { deletarProjeto } from "@/services/projectService";
import type { Project } from "@/types/Project";

defineProps<{
  projetos: Project[];
  termo?: string;
}>();

const router = useRouter();
const isDeleteModalOpen = ref<boolean>(false);
const projetoSelecionado = ref<Project | null>(null);

const emit = defineEmits(["projetoRemovido", "favoritoAtualizado"]);

function editarProjeto(projeto: Project) {
  router.push({ name: "edit", params: { id: projeto.$id || projeto.id } });
}

function abrirModalRemocao(projeto: Project) {
  projetoSelecionado.value = projeto;
  isDeleteModalOpen.value = true;
}

function marcarComoFavorito(projeto: Project, favorito?: boolean) {
  const atualizado = { ...projeto, favorito: favorito ?? projeto.favorito };
  emit("favoritoAtualizado", atualizado);
}

function cancelarRemocao() {
  isDeleteModalOpen.value = false;
  projetoSelecionado.value = null;
}

async function confirmarRemocao() {
  if (!projetoSelecionado.value) return;

  const id = projetoSelecionado.value?.$id ?? projetoSelecionado.value?.id;

  if (!id) {
    throw new Error("ID do projeto não encontrado.");
  }

  await deletarProjeto(id);

  cancelarRemocao();
  emit("projetoRemovido", projetoSelecionado.value);
}
</script>

<template>
  <div class="project__list">
    <ProjectCard
      v-for="projeto in projetos"
      :key="projeto.$id"
      :project="projeto"
      :termo="termo"
      @editar="editarProjeto"
      @remover="abrirModalRemocao"
      @favorito="marcarComoFavorito"
    />

    <DeleteProjectModal
      :visible="isDeleteModalOpen"
      :projectName="projetoSelecionado?.name ?? ''"
      @cancel="cancelarRemocao"
      @confirm="confirmarRemocao"
    />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/medias" as *;
.project__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.0313rem 2rem;
  margin-top: 1.375rem;

  @include mobile {
    justify-content: center;
  }
}
</style>
