<template>
  <div>{{ userStore.name }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
userStore.setName("John");
</script>

<style lang="less" scoped></style>
