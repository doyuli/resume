<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import UEditor from '@/components/UEditor.vue'
import UPreview from '@/components/UPreview.vue'
import USplitPane from '@/components/USplitPane.vue'
</script>

<template>
  <AppHeader />

  <div class="container">
    <USplitPane>
      <template #left>
        <UEditor />
      </template>
      <template #right>
        <UPreview />
      </template>
    </USplitPane>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: calc(100vh - var(--header-height));
  gap: 1rem;
}
</style>
