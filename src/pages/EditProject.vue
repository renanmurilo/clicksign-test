<script setup lang="ts">
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import ProjectForm from "@/components/ProjectForm.vue";
import { useProjectStore } from "@/stores/projectStore";
import type { Project } from "@/types/Project";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const store = useProjectStore();

const id = computed(() => route.params.id as string);

onMounted(async () => {
  if (!store.projects.length) await store.fetchProjects();
});

const project = computed(() => {
  return store.projects.find((p) => p.$id === id.value);
});

const updateProject = async (updated: Project) => {
  await store.updateProject(updated);
  router.push("/");
};
</script>

<template>
  <main>
    <div class="breadcrumb">
      <router-link to="/" class="before__page">
        <IconArrowLeft /> Voltar
      </router-link>
      <h1 class="breadcrumb__h1">Editar Projeto</h1>
    </div>

    <div class="create__project">
      <ProjectForm
        v-if="project"
        :initialData="project"
        :onSubmit="updateProject"
      />
      <p v-else>Carregando projeto...</p>
    </div>
  </main>
</template>

<style lang="scss"></style>
