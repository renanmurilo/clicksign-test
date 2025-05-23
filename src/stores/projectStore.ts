import { defineStore } from "pinia";
import { ref } from "vue";
import type { Project } from "@/types/Project";
import {
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
  listarProjetos,
} from "@/services/projectService";

export const useProjectStore = defineStore("projectStore", () => {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      projects.value = await listarProjetos();
    } catch (e) {
      error.value = "Erro ao carregar projetos";
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const addProject = async (project: Project) => {
    try {
      const novo = await criarProjeto(project);
      projects.value.unshift(novo);
    } catch (e) {
      error.value = "Erro ao adicionar projeto";
      console.error(e);
    }
  };

  const updateProject = async (updated: Project) => {
    try {
      const body = {
        name: updated.name,
        cliente: updated.cliente,
        datainicio: updated.datainicio,
        datafim: updated.datafim,
        imagem: updated.imagem,
        favorito: updated.favorito,
      };

      const atualizado = await atualizarProjeto({ $id: updated.$id, ...body });
      const index = projects.value.findIndex((p) => p.$id === updated.$id);
      if (index !== -1) projects.value[index] = atualizado;
    } catch (e) {
      error.value = "Erro ao atualizar projeto";
      console.error(e);
    }
  };

  const removeProject = async (id: string) => {
    try {
      await deletarProjeto(id);
      projects.value = projects.value.filter((p) => p.$id !== id);
    } catch (e) {
      error.value = "Erro ao remover projeto";
      console.error(e);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    removeProject,
  };
});
