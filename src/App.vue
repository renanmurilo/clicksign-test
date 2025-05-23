<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import ThemeHeader from "./components/ThemeHeader.vue";
import ProjectSearch from "@/components/ProjectSearch.vue";

const searchVisible = ref(false);
const route = useRoute();

function openSearch() {
  searchVisible.value = true;
}

function closeSearch() {
  searchVisible.value = false;
}

watch(
  () => route.fullPath,
  () => {
    searchVisible.value = false;
  }
);
</script>

<template>
  <transition name="slide-down">
    <ProjectSearch v-if="searchVisible" @close="closeSearch" />
  </transition>

  <ThemeHeader @open-search="openSearch" />

  <RouterView />
</template>
