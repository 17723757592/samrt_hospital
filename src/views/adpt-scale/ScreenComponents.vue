<template>
    <transition mode="out-in" name="fade">
      <component :is="components[activeNavIndex]" />
    </transition>
  </template>
  
  <script setup>
  import { inject } from "vue";
  import ExampleOne from "@/view/adpt-multi-device/pc/example-one";
  
  const activeNavIndex = inject("getActiveNavIndex");
  const components = [ExampleOne];
  </script>
  
  <style lang="scss" scoped>
  </style>
  