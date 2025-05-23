<script setup lang="ts">
import { ref, watch } from "vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import Trash from "@/components/icons/IconRemoveImage.vue";

const emit = defineEmits(["update:image"]);

const preview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref<boolean>(false);
const imageFile = ref<File | null>(null);

const props = defineProps<{
  initialUrl?: string | null;
}>();
console.log(props.initialUrl, "props");

watch(
  () => props.initialUrl,
  (newUrl) => {
    if (newUrl !== null && newUrl !== undefined) {
      preview.value = newUrl.replace("/preview", "/view");
    } else {
      preview.value = null;
    }
  },
  { immediate: true, flush: "post" }
);

function handleFile(file: File) {
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    alert("Por favor, selecione uma imagem .jpg ou .png.");
    return;
  }

  preview.value = URL.createObjectURL(file);
  imageFile.value = file;
  emit("update:image", file);
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) handleFile(target.files[0]);
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function onDragLeave(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
  const file = event.dataTransfer?.files[0];
  if (file) handleFile(file);
}

function openFileDialog() {
  fileInput.value?.click();
}

function removeImage() {
  preview.value = null;
  imageFile.value = null;
  emit("update:image", null);
}
</script>

<template>
  <div
    class="upload-area"
    :class="[{ dragging: isDragging }, { active: preview }]"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <input
      id="fileInput"
      ref="fileInput"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
      @change="onFileChange"
    />

    <label for="fileInput" class="content">
      <div v-if="!preview" class="placeholder">
        <IconUpload />
        <p class="upload__text">
          Escolha uma imagem .jpg ou .png no seu dispositivo
        </p>
        <button
          type="button"
          class="btn btn__outline__primary"
          @click="openFileDialog"
        >
          Selecionar
        </button>
      </div>

      <div class="content__image" v-else>
        <img :src="preview" alt="Preview" class="preview__img" />
        <button
          type="button"
          class="btn btn__outline__danger"
          @click.stop.prevent="removeImage"
        >
          <Trash />
        </button>
      </div>
    </label>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/buttons" as *;
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;

.upload-area {
  width: 100%;
  margin: auto;
  border: 1px dashed $text;
  border-radius: 0.25rem;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  min-height: 10.875rem;
  padding: 1.5rem;
  transition: background-color 0.2s ease-in-out, border-color 0.2s;

  &.active {
    padding: 0;
    border: none;
  }

  .hidden {
    display: none;
  }

  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;

    .placeholder {
      display: flex;
      align-items: center;
      flex-direction: column;

      .upload__text {
        @include font-primaria;
        color: $text;
        margin: 1rem 0;
      }
    }

    .content__image {
      width: 100%;

      .preview__img {
        max-width: 100%;
        border-radius: 0.25rem;
        object-fit: contain;
        width: 100%;
      }

      .btn__outline__danger {
        position: absolute;
        top: 1.5625rem;
        right: -0.9375rem;
        z-index: 1;
      }
    }
  }
}
</style>
