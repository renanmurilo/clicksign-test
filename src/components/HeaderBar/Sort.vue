<script setup lang="ts">
import { ref, watch } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const emit = defineEmits(["update:sort"]);

const selectedSort = ref("Ordem alfabética");

const options = [
  "Ordem alfabética",
  "Iniciados mais recentes",
  "Prazo mais próximo",
];

watch(selectedSort, (newValue) => {
  emit("update:sort", newValue);
});
</script>

<template>
  <div class="bar__select__filter">
    <v-select
      v-model="selectedSort"
      :options="options"
      placeholder="Selecione"
      class="custom__select"
      :clearable="false"
      :searchable="false"
    />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;
@use "@/assets/styles/scss/medias" as *;

.bar__select__filter {
  margin: 0 2rem;

  @include mobile {
    width: 100%;
    margin: 2.5rem auto 0;
    order: 3;
  }

  .custom__select {
    min-width: 18.5rem;

    @include mobile {
      max-width: 100%;
    }

    &.vs--open {
      .vs__dropdown-toggle {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        .vs__selected-options {
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -1rem;
            background-position: 100%;
            transform: translateY(-50%) rotateX(0);
            width: 12px;
            height: 12px;
            background-image: url("@/assets/images/chevron-down-purple.svg");
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
      }
    }

    .vs__dropdown-toggle {
      height: 2.5rem;
      border-radius: 0.5rem;
      border: 0.0625rem solid $text;
      padding: 0 0.75rem;
      background-color: #fff;
      font-size: 0.875rem;
      color: $secondary;

      @include mobile {
        width: 100%;
      }

      &.vs--open {
        border-color: $secondary;
      }

      &:hover {
        border-color: $secondary;
      }
    }

    .vs__selected {
      color: $primary-dark;
      @include font-primaria;
    }
    .vs__search {
      color: $primary-dark;
      @include font-primaria;

      &:focus {
        color: $primary-dark;
        @include font-primaria;
      }
    }

    .vs__dropdown-menu {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      top: calc(100% - 0.0625rem);
      border-top: 0.0625rem solid $primary;
      border-left-color: $secondary;
      border-right-color: $secondary;
      border-bottom-color: $secondary;

      .vs__dropdown-option {
        color: $primary-dark;
        @include font-primaria;
        height: 2.1875rem;
        margin-top: 1.1875rem;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 0.0625rem solid $border-light;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          border-bottom: none;
          padding-bottom: 1.1875rem;
        }

        &.vs__dropdown-option--highlight {
          background-color: transparent;
        }

        &:hover {
          background-color: transparent;
        }
      }
    }

    .vs__actions {
      margin-left: 0.5rem;
    }

    .vs__open-indicator {
      color: $primary-dark;
      @include font-primaria;
    }

    .vs__open-indicator {
      display: none;
    }

    .vs__selected-options {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -1rem;
        background-position: 100%;
        transform: translateY(-50%) rotateX(0);
        width: 12px;
        height: 12px;
        background-image: url("@/assets/images/chevron-down.svg");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
