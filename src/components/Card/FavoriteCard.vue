<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import IconFavoriteWhite from "../icons/IconFavoriteWhite.vue";
import IconFavoriteYellow from "../icons/IconFavoriteYellow.vue";
import type { Project } from "@/types/Project";
import { updateFavorito } from "@/services/projectService";

const props = defineProps<{
  project: Project;
}>();

const isFavorited = ref(props.project.favorito);
const projectStore = useProjectStore();
const emit = defineEmits<{
  (e: "favorito", projetoAtualizado: Project): void;
}>();

const toggleFavorite = async () => {
  isFavorited.value = !isFavorited.value;

  try {
    if (props.project.$id) {
      await updateFavorito(props.project.$id, {
        favorito: isFavorited.value,
      });
    } else {
      console.error("Projeto sem ID!");
    }

    emit("favorito", {
      ...props.project,
      favorito: isFavorited.value,
    });
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
    isFavorited.value = !isFavorited.value;
  }
};

watch(
  () => props.project.favorito,
  (val) => {
    isFavorited.value = val;
  }
);
</script>

<template>
  <div class="favorite">
    <a class="icon__favoriteWhite" @click="toggleFavorite">
      <component :is="isFavorited ? IconFavoriteYellow : IconFavoriteWhite" />
    </a>
  </div>
</template>

<style lang="scss">
.favorite {
  position: absolute;
  right: 4.5rem;
  bottom: 1.09rem;
}
</style>
