<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

/**
 * iconCollection/icon
 * See: https://icones.js.org/collection/simple-icons
 */
const props = defineProps<{
  icon: string
  iconCollection?: string
  link: string
  ariaLabel?: string
}>()

const el = ref<HTMLAnchorElement>()

const iconCollection = props.iconCollection ?? 'simple-icons'

onMounted(() => {
  nextTick(() => {
    const span = el.value?.children[0]
    if (
      span instanceof HTMLElement
      && span.className.startsWith('vpi-icon-')
      && (getComputedStyle(span).maskImage
        || getComputedStyle(span).webkitMaskImage) === 'none'
    ) {
      span.style.setProperty(
        '--icon',
        `url('https://api.iconify.design/${iconCollection}/${props.icon}.svg')`,
      )
    }
  })
})

const svg = computed(() => {
  return `<span class="vpi-icon-${props.icon}"></span>`
})
</script>

<template>
  <a
    ref="el"
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    target="_blank"
    class="u-icon-link"
    rel="noopener"
    v-html="svg"
  />
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

.u-icon-link > :deep([class^='vpi-icon-']) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
