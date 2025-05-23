<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import IconTrashWhite from "./icons/IconTrashWhite.vue";

const props = defineProps<{
  visible: boolean;
  projectName: string;
}>();

const emit = defineEmits(["cancel", "confirm"]);

function onCancel() {
  emit("cancel");
}

function onConfirm() {
  emit("confirm");
}
</script>

<template>
  <div class="delete__project" v-if="visible">
    <div class="modal">
      <div class="icon-wrapper">
        <IconTrashWhite />
      </div>

      <h2 class="modal__h2">Remover projeto</h2>
      <p class="modal__text">Essa ação removerá definitivamente o projeto:</p>
      <h3 class="modal__h3">{{ projectName }}</h3>

      <div class="modal__buttons">
        <button class="btn btn__outline__primary" @click="onCancel">
          Cancelar
        </button>
        <button class="btn btn__primary" @click="onConfirm">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/mixins" as *;
@use "@/assets/styles/scss/typography" as *;

.delete__project {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #181818e5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal {
    background: $white;
    position: relative;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    padding: 3rem 2rem;
    width: 90%;
    max-width: 36.375rem;
    box-shadow: 0px 4px 4px 0px #00000040;

    .icon-wrapper {
      background-color: $secondary;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      margin: 0 auto;
      position: absolute;
      top: -2rem;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal__h2 {
      @include font-primaria(1.375rem, 600, 0);
      color: $secondary;
      margin-bottom: 2.125rem;
      padding-bottom: 1.5rem;
      border-bottom: 0.0625rem solid $border-dark;
    }

    .modal__text {
      @include font-primaria;
      color: $text;
      margin-bottom: 0.8125rem;
    }

    .modal__h3 {
      @include font-primaria(1.5rem, 500, 0);
      color: $primary-dark;
      margin-bottom: 2rem;
    }

    .modal__buttons {
      display: flex;
      justify-content: space-between;

      .btn__primary {
        height: 3.25rem;
        width: 260px;
      }

      .btn__outline__primary {
        width: 14.125rem;
        height: 3.25rem;
      }
    }
  }
}
</style>
