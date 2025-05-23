<script setup lang="ts">
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import ProjectForm from "@/components/ProjectForm.vue";
import { useProjectStore } from "@/stores/projectStore";
import type { Project } from "@/types/Project";
import { useRouter } from "vue-router";

const store = useProjectStore();
const router = useRouter();

const createProject = async (project: Project) => {
  await store.addProject(project);
  router.push("/");
};
</script>

<template>
  <main>
    <div class="breadcrumb">
      <router-link to="/" class="before__page">
        <IconArrowLeft /> Voltar
      </router-link>

      <h1 class="breadcrumb__h1">Novo Projeto</h1>
    </div>

    <div class="create__project">
      <ProjectForm :onSubmit="createProject" />
    </div>
  </main>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/mixins" as *;
@use "@/assets/styles/scss/medias" as *;

.create__project {
  border: 1px solid $border;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 3.25rem 0;

  @include mobile {
    border: none;
  }
}
</style>
