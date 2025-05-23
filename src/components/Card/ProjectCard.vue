<script setup lang="ts">
import { computed, defineEmits, onMounted, ref } from "vue";
import IconCalendarInit from "../icons/IconCalendarInit.vue";
import IconCalendarFinish from "../icons/IconCalendarFinish.vue";
import FavoriteCard from "@/components/Card/FavoriteCard.vue";
import OptionsCard from "@/components/Card/OptionsCard.vue";
import type { Project } from "@/types/Project";
import { useDateFormat } from "@/composables/useDateFormat";
import { getImagemUrl } from "@/services/projectService";
import { useHighlight } from "@/composables/useHighlight";

const { highlight } = useHighlight();

const { formatDate } = useDateFormat();

const props = defineProps<{
  project: Project;
  termo?: string;
}>();

const imagemPreview = ref<string | null>(null);

onMounted(async () => {
  if (props?.project?.imagem) {
    if (!props?.project?.imagem.startsWith("http")) {
      imagemPreview.value = await getImagemUrl(props?.project?.imagem);
    } else {
      imagemPreview.value = props?.project?.imagem;
    }
  }
});

const emit = defineEmits<{
  (e: "editar", project: Project): void;
  (e: "remover", project: Project): void;
}>();
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img
        :src="
          project.imagem
            ? project.imagem.replace('/preview', '/view')
            : '@/assets/images/banner-capa.png'
        "
        :alt="project.name"
      />

      <FavoriteCard :project="project" @favorito="emit('favorito', $event)" />

      <OptionsCard
        :project="project"
        @editar="emit('editar', $event)"
        @remover="emit('remover', $event)"
      />
    </div>

    <div class="card__description">
      <h2 class="card__h2" v-html="highlight(project.name, termo)"></h2>
      <h3 class="card__h3">
        Cliente: <span v-html="highlight(project.cliente, termo)"></span>
      </h3>

      <div class="card__dates">
        <div class="date">
          <div class="date__icon">
            <IconCalendarInit />
          </div>
          <p class="date__text">{{ formatDate(project.datainicio) }}</p>
        </div>
        <div class="date">
          <div class="date__icon">
            <IconCalendarFinish />
          </div>
          <p class="date__text">{{ formatDate(project.datafim) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/typography" as *;

.card {
  width: 100%;
  max-width: 21.625rem;
  height: 26.905rem;
  border-radius: 1rem;
  background-color: $white;

  .card__image {
    width: 100%;
    height: 100%;
    max-height: 14.4375rem;
    position: relative;

    img {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card__description {
    padding: 1.5rem;
    height: 100%;
    max-height: 12.4375rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: 0.0625rem solid $border;

    .card__h2 {
      @include font-primaria(1.25rem, 700, 0);
      color: $primary;
      margin-bottom: 0.3125rem;
    }

    .card__h3 {
      @include font-primaria(1rem, 700, 0);
      color: $text;
      margin-bottom: 1rem;

      span {
        font-weight: 400;
      }
    }

    .card__dates {
      width: 100%;
      border-top: 0.0625rem solid $border-light;
      padding-top: 1rem;

      .date {
        display: flex;
        align-items: center;

        &:last-child {
          margin-top: 1rem;
        }

        .date__icon {
          margin-right: 1rem;
        }

        .date__text {
          @include font-primaria;
          color: $text;
        }
      }
    }
  }
}
</style>
