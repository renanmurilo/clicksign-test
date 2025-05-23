<script setup lang="ts">
import Logo from "./icons/IconLogo.vue";
import IconLupaWhite from "./icons/IconLupaWhite.vue";
</script>

<template>
  <header>
    <Logo />

    <button class="icon__search" @click="$emit('open-search')">
      <IconLupaWhite />
    </button>
  </header>
</template>

<style lang="scss">
@use "@/assets/styles/scss/colors" as *;

header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background;
  box-shadow: 0px 4px 4px 0px #00000040;
  position: relative;

  .icon__search {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 4rem;
  }
}
</style>
