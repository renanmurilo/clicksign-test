<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted, computed } from "vue";
import ImageUploader from "@/components/ImageUploader.vue";
import { getImagemUrl } from "@/services/projectService";
import type { Project } from "@/types/Project";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface Props {
  initialData?: Project;
  onSubmit: (project: Project) => void;
}

const props = defineProps<Props>();

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

const schema = yup.object({
  nome: yup
    .string()
    .required("Obrigatório")
    .test(
      "uma-palavra",
      "Digite ao menos uma palavra",
      (v) => v?.trim().split(/\s+/).length >= 1
    ),
  cliente: yup
    .string()
    .required("Obrigatório")
    .test(
      "uma-palavra",
      "Digite ao menos uma palavra",
      (v) => v?.trim().length > 0
    ),
  datainicio: yup
    .date()
    .nullable()
    .required("Obrigatório")
    .min(hoje, "Selecione uma data válida"),
  datafim: yup
    .date()
    .nullable()
    .required("Obrigatório")
    .min(yup.ref("datainicio"), "Selecione uma data válida")
    .min(hoje, "Data final não pode ser no passado"),
});

const { handleSubmit, errors, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    nome: props.initialData?.name ?? "",
    cliente: props.initialData?.cliente ?? "",
    datainicio: props.initialData?.datainicio,
    datafim: props.initialData?.datafim,
  },
});

const { value: nome } = useField<string>("nome");
const { value: cliente } = useField<string>("cliente");
const { value: datainicio } = useField<string>("datainicio");
const { value: datafim } = useField<string>("datafim");

const favorito = ref(props.initialData?.favorito ?? false);
const imagem = ref<string>(props.initialData?.imagem ?? "");
const imagemSelecionada = ref<File | null>(null);
const imagemPreview = ref<string | null>(null);

const isFormValid = computed(() => meta.value.valid);

onMounted(async () => {
  if (imagem.value && !imagem.value.startsWith("http")) {
    imagemPreview.value = await getImagemUrl(imagem.value);
  } else {
    imagemPreview.value = imagem.value;
  }
});

function atualizarImagem(file: File | null) {
  imagemSelecionada.value = file;
  if (file) imagemPreview.value = URL.createObjectURL(file);
}

const submitForm = handleSubmit(async (values) => {
  let imagemId = imagem.value;
  if (imagemSelecionada.value) {
    const { uploadImagem } = await import("@/services/projectService");
    imagemId = await uploadImagem(imagemSelecionada.value);
  }

  const project: Project = {
    $id: props.initialData?.$id,
    id: props.initialData?.id ?? Date.now().toString(),
    name: values.nome,
    cliente: values.cliente,
    datainicio: values.datainicio,
    datafim: values.datafim,
    favorito: favorito.value,
    imagem: imagemId,
  };

  props.onSubmit(project);
});
</script>

<template>
  <form @submit="submitForm" class="form__class">
    <div class="form__row">
      <label class="label__field" :class="{ required: errors.nome }">
        Nome do projeto
        <span :class="{ required: errors.nome }">(Obrigatório)</span>
      </label>
      <input
        v-model="nome"
        class="field"
        :class="{ 'field--error': errors.nome }"
      />
      <span v-if="errors.nome" class="error-msg">{{ errors.nome }}</span>
    </div>

    <div class="form__row">
      <label class="label__field" :class="{ required: errors.cliente }">
        Cliente <span :class="{ required: errors.cliente }">(Obrigatório)</span>
      </label>
      <input
        v-model="cliente"
        class="field"
        :class="{ 'field--error': errors.cliente }"
      />
      <span v-if="errors.cliente" class="error-msg">{{ errors.cliente }}</span>
    </div>

    <div class="form__row">
      <div class="form__controls">
        <label class="label__field" :class="{ required: errors.datainicio }">
          Data de Início
          <span :class="{ required: errors.datainicio }">(Obrigatório)</span>
        </label>
        <VueDatePicker
          v-model="datainicio"
          :format="'dd/MM/yyyy'"
          locale="pt-BR"
          :class="{ 'field--error': errors.datainicio }"
          :clearable="false"
          :auto-apply="true"
          :enable-time-picker="false"
        >
          <template #input-icon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_38_2924"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="2"
                y="0"
                width="21"
                height="24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.75 3H18.5V0.375C18.5 0.16875 18.3312 0 18.125 0H17.375C17.1687 0 17 0.16875 17 0.375V3H8V0.375C8 0.16875 7.83125 0 7.625 0H6.875C6.66875 0 6.5 0.16875 6.5 0.375V3H4.25C3.00781 3 2 4.00781 2 5.25V21.75C2 22.9922 3.00781 24 4.25 24H20.75C21.9922 24 23 22.9922 23 21.75V5.25C23 4.00781 21.9922 3 20.75 3ZM21.5005 21.75C21.5005 22.1625 21.163 22.5 20.7505 22.5H4.25049C3.83799 22.5 3.50049 22.1625 3.50049 21.75V9H21.5005V21.75ZM3.50049 7.5H21.5005V5.25C21.5005 4.8375 21.163 4.5 20.7505 4.5H4.25049C3.83799 4.5 3.50049 4.8375 3.50049 5.25V7.5ZM7.25146 18H11.7515C12.164 18 12.5015 17.6625 12.5015 17.25V12.75C12.5015 12.3375 12.164 12 11.7515 12H7.25146C6.83896 12 6.50146 12.3375 6.50146 12.75V17.25C6.50146 17.6625 6.83896 18 7.25146 18ZM10.9985 13.5H7.99854V16.5H10.9985V13.5Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_38_2924)">
                <rect
                  width="24"
                  height="24"
                  transform="translate(2)"
                  :fill="errors.datainicio ? '#9f0000' : '#717171'"
                />
              </g>
            </svg>
          </template>
        </VueDatePicker>
        <span v-if="errors.datainicio" class="error-msg">
          {{ errors.datainicio }}
        </span>
      </div>
      <div class="form__controls">
        <label class="label__field" :class="{ required: errors.datafim }">
          Data Final
          <span :class="{ required: errors.datafim }">(Obrigatório)</span>
        </label>
        <VueDatePicker
          v-model="datafim"
          :format="'dd/MM/yyyy'"
          locale="pt-BR"
          :class="{ 'field--error': errors.datafim }"
          :clearable="false"
          :auto-apply="true"
          :enable-time-picker="false"
        >
          <template #input-icon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_38_2916"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="2"
                y="0"
                width="21"
                height="24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.5 3H20.75C21.9927 3 23 4.00734 23 5.25V21.75C23 22.9927 21.9927 24 20.75 24H4.25C3.00734 24 2 22.9927 2 21.75V5.25C2 4.00734 3.00734 3 4.25 3H6.5V0.5625C6.5 0.251859 6.75186 0 7.0625 0H7.4375C7.74814 0 8 0.251859 8 0.5625V3H17V0.5625C17 0.251859 17.2519 0 17.5625 0H17.9375C18.2481 0 18.5 0.251859 18.5 0.5625V3ZM20.7505 4.5H4.25049C3.83696 4.5 3.50049 4.83647 3.50049 5.25V7.5H21.5005V5.25C21.5005 4.83647 21.164 4.5 20.7505 4.5ZM20.7505 22.5H4.25049C3.83696 22.5 3.50049 22.1635 3.50049 21.75V9H21.5005V21.75C21.5005 22.1635 21.164 22.5 20.7505 22.5ZM11.3122 19.63L17.6305 13.3623C17.8512 13.1434 17.8527 12.7869 17.6337 12.5662L17.2372 12.1665C17.0182 11.9457 16.6618 11.9443 16.441 12.1633L10.92 17.64L8.55554 15.2688C8.33602 15.0486 7.97958 15.0481 7.75941 15.2676L7.36074 15.6651C7.14062 15.8847 7.1401 16.2411 7.35962 16.4613L10.517 19.6278C10.7362 19.8476 11.0919 19.8485 11.3122 19.63Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_38_2916)">
                <rect
                  width="24"
                  height="24"
                  transform="translate(2)"
                  :fill="errors.datafim ? '#9f0000' : '#717171'"
                />
              </g>
            </svg>
          </template>
        </VueDatePicker>
        <span v-if="errors.datafim" class="error-msg">{{
          errors.datafim
        }}</span>
      </div>
    </div>

    <div class="form__row">
      <label class="label__field">Capa do Projeto</label>
      <ImageUploader
        :initial-url="imagemPreview"
        @update:image="atualizarImagem"
      />
    </div>

    <div class="form__row">
      <button type="submit" class="btn btn__primary" :disabled="!isFormValid">
        Salvar Projeto
      </button>
    </div>
  </form>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;
@use "@/assets/styles/scss/mixins" as *;
@use "@/assets/styles/scss/typography" as *;
@use "@/assets/styles/scss/medias" as *;

.form__class {
  width: 100%;
  max-width: 43.875rem;

  .form__row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    @include inputField;
    @include labelField;

    .form__controls {
      width: 100%;
      max-width: 48%;

      @include mobile {
        max-width: 100%;
        margin-bottom: 2rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .field--error {
        .dp__input {
          color: $error;
          border-color: $error;
        }
      }

      .dp__input {
        width: 100%;
        height: 2.5rem;
        background-color: $white;
        border: 0.0625rem solid $text;
        padding-left: 1rem;
        @include font-primaria;
        color: $primary-dark;
        border-radius: 0.25rem;
        padding: 0 1rem;
        margin-top: 0.25rem;
      }

      .dp__input_icon {
        right: 0.5rem;
        top: 55%;
        direction: rtl !important;
      }

      .dp__today {
        border: none;
      }

      .dp__active_date {
        background-color: $secondary;
        border-color: $secondary;
        color: $white;
      }
    }

    .btn__primary {
      width: 100%;

      &[disabled] {
        opacity: 0.5;
      }
    }

    .error-msg {
      color: $error;
      @include font-primaria(0.875rem, 400, 0);
      margin-top: 0.25rem;
    }
  }
}
</style>
