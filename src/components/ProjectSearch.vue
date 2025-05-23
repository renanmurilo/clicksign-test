<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import IconLupaPurple from "@/components/icons/IconLupaPurple.vue";
import IconClose from "./icons/IconClose.vue";
import IconTime from "./icons/IconTime.vue";
import IconClosePurple from "./icons/IconClosePurple.vue";

const termo = ref("");
const router = useRouter();
const route = useRoute();
const historico = ref<string[]>([]);
const isSerachView = computed(() => route.name === "Busca");

onMounted(() => {
  const armazenado = localStorage.getItem("buscas-recentes");
  if (armazenado) {
    historico.value = JSON.parse(armazenado);
  }
});

function salvarHistorico() {
  localStorage.setItem("buscas-recentes", JSON.stringify(historico.value));
}

const buscar = () => {
  const termoTrim = termo.value.trim();

  if (termoTrim.length < 3) return;

  if (!historico.value.includes(termoTrim)) {
    historico.value.unshift(termoTrim);
    if (historico.value.length > 5) historico.value.pop();
    salvarHistorico();
  }

  router.push({ name: "Busca", query: { q: termoTrim } });
};

function removerHistorico(item: string) {
  historico.value = historico.value.filter((h) => h !== item);
  salvarHistorico();
}

function usarHistorico(item: string) {
  termo.value = item;
  buscar();
}
</script>

<template>
  <div class="project__search" :class="{ active: isSerachView }">
    <div class="search__input">
      <button @click="buscar" class="btn__search" aria-label="Buscar">
        <IconLupaPurple />
      </button>

      <input
        v-model="termo"
        @keyup.enter="buscar"
        placeholder="Digite o nome do projeto..."
        class="field__search"
        aria-label="Campo de busca de projetos"
      />

      <button class="btn__close" @click="$emit('close')">
        <IconClosePurple />
      </button>
    </div>

    <div
      v-if="historico.length && termo.length > 1"
      class="historico__search"
      :class="{ active: isSerachView }"
    >
      <ul>
        <li v-for="item in historico" :key="item" class="historico__item">
          <div class="text">
            <IconTime />
            <button class="historico__texto" @click="usarHistorico(item)">
              {{ item }}
            </button>
          </div>

          <button
            class="historico__remover"
            aria-label="Remover busca"
            @click="removerHistorico(item)"
          >
            <IconClose />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/mixins" as *;
@use "@/assets/styles/scss/typography" as *;

.project__search {
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  min-height: 5rem;
  left: 0;
  padding: 0 2rem;
  background-color: $white;
  border-radius: 1rem;
  border: 0.125rem solid $secondary;

  &.active {
    border-radius: 0;
    border: none;
  }

  .search__input {
    height: 5.125rem;
    width: 100%;
    display: flex;
    align-items: center;

    .btn__search {
      background-color: transparent;
      border: none;
      position: relative;
      top: 0.3125rem;
    }

    .field__search {
      border: none;
      width: 100%;
      padding-left: 1rem;
      @include font-primaria(1.5rem, 400, 0);
      color: $primary-dark;
    }

    .btn__close {
      position: absolute;
      right: 1.5rem;
      border: none;
      background-color: transparent;
    }
  }

  .historico__search {
    width: 100%;
    padding: 0;
    background: $white;

    &.active {
      display: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      .historico__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3.25rem;
        width: 100%;
        border-top: 0.0625rem solid $border-ex-ligth;

        .text {
          display: flex;
          align-items: center;

          .historico__texto {
            margin-left: 1rem;
            border: none;
            background-color: transparent;
            @include font-primaria(1rem, 400, 0);
            color: $text;
          }
        }

        .historico__remover {
          position: absolute;
          right: 1.5rem;
          border: none;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
