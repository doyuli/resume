<script setup lang="ts">
import UIcon from './UIcon.vue'

defineProps<{
  /** simple-icons:github */
  icon: string
  link: string
  ariaLabel?: string
}>()
</script>

<template>
  <a
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    target="_blank"
    class="u-icon-link"
    rel="noopener"
  >
    <UIcon icon="simple-icons:github" />
  </a>
</template>

<style lang="scss" scoped>
.u-icon-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--u-text-2);
  transition: color 0.5s;

  &:hover {
    color: var(--u-text-1);
    transition: color 0.25s;
  }
}
</style>
