import { ref, computed } from "vue";
import type { Project } from "@/types/Project";

export function useProjectSorter(initialProjects: Project[]) {
  const sortType = ref("Ordem alfabética");
  const projects = ref([...initialProjects]);

  function setSortType(value: string) {
    sortType.value = value;
  }

  function updateProjects(newProjects: Project[]) {
    projects.value = [...newProjects];
  }

  const sortedProjects = computed(() => {
    const copy = [...projects.value];
    switch (sortType.value) {
      case "Iniciados mais recentes":
        return copy.sort(
          (a, b) =>
            new Date(b.datainicio).getTime() - new Date(a.datainicio).getTime()
        );

      case "Prazo mais próximo":
        return copy.sort(
          (a, b) =>
            new Date(a.datafim).getTime() - new Date(b.datafim).getTime()
        );

      case "Ordem alfabética":
      default:
        return copy.sort((a, b) => a.name.localeCompare(b.name));
    }
  });

  return {
    sortType,
    setSortType,
    updateProjects,
    sortedProjects,
  };
}
