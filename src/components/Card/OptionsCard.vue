<script setup lang="ts">
import { ref } from "vue";
import IconOptions from "../icons/IconOptions.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconTrash from "../icons/IconTrash.vue";
import type { Project } from "@/types/Project";

const props = defineProps<{
  project: Project;
}>();

const emit = defineEmits<{
  (e: "editar", project: Project): void;
  (e: "remover", project: Project): void;
}>();

const showEdit = ref<boolean>(false);

function toggleEdit() {
  showEdit.value = !showEdit.value;
}
</script>

<template>
  <div class="option__card">
    <a @click.stop.prevent="toggleEdit">
      <IconOptions />
    </a>

    <div class="option__content" :class="{ active: showEdit }">
      <a class="options" @click="emit('editar', project)">
        <div class="icon__option">
          <IconEdit />
        </div>
        <div class="option__link">Editar</div>
      </a>

      <a class="options" @click="emit('remover', project)">
        <div class="icon__option">
          <IconTrash />
        </div>
        <div class="option__link">Remover</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;

.option__card {
  position: absolute;
  right: 1rem;
  bottom: 0.6rem;

  .option__content {
    width: 15rem;
    height: 6.625rem;
    box-shadow: 0px 4px 4px 0px #00000040;
    padding: 0.875rem 0;
    background-color: $white;
    position: absolute;
    border-radius: 0.5rem;
    right: 0;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;

    &.active {
      opacity: 1;
      visibility: visible;
      transition: all 0.4s;
    }

    &::before {
      content: "";
      width: 1rem;
      height: 0.75rem;
      background-image: url(../../assets/images/polygon.svg);
      position: absolute;
      top: -11px;
      vertical-align: cover;
      background-size: 100%;
      background-repeat: no-repeat;
      left: 212px;
      margin: auto;
    }

    .options {
      display: flex;
      align-items: center;
      height: 2.4375rem;
      padding: 0 1.25rem;

      &:first-child {
        padding-bottom: 1rem;
        margin-bottom: 0.4375rem;
        border-bottom: 0.0625rem solid $border-ex-ligth;
      }

      .icon__option {
        margin-right: 0.75rem;
      }

      .option__link {
        @include font-primaria;
        color: $secondary;
      }
    }
  }
}
</style>
