<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

/**
 * See: https://icon-sets.iconify.design/
 */
const props = withDefaults(
  defineProps<{
  /** simple-icons:github */
    icon: string
    size?: number
  }>(),
  {
    size: 20,
  },
)

const iconRef = useTemplateRef('u-icon')

onMounted(() => {
  const parts = props.icon.split(':')
  let collection = ''
  let icon = ''

  if (parts.length === 1) {
    collection = 'simple-icons'
    icon = parts[0]
  }
  else {
    collection = parts[0]
    icon = parts[1]
  }

  const el = iconRef.value!
  const unMaskImage = (getComputedStyle(el).maskImage
    || getComputedStyle(el).webkitMaskImage) === 'none'

  if (collection && icon && unMaskImage) {
    el.style.setProperty(
      '--icon',
      `url('https://api.iconify.design/${collection}/${icon}.svg')`,
    )
    el.style.width = `${props.size}px`
    el.style.height = `${props.size}px`
  }
})
</script>

<template>
  <i ref="u-icon" :class="`u-icon i-${icon}`" />
</template>

<style lang="scss" scoped>
.u-icon {
  fill: currentColor;
}
</style>
