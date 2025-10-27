<template>
  <div class="min-h-screen bg-background text-foreground">
    <RouterView />
    <Toaster position="top-right" theme="system" rich-colors :duration="2000" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { initAuth } from "@/lib/auth";

onMounted(() => {
  initAuth();
});
</script>
