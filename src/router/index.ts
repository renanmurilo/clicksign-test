import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CreateProject from "@/pages/CreateProject.vue";
import EditProject from "@/pages/EditProject.vue";
import BuscaView from "@/views/BuscaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "create",
      component: CreateProject,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditProject,
    },
    {
      path: "/busca",
      name: "Busca",
      component: BuscaView,
    },
  ],
});

export default router;
