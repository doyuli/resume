<script setup lang="ts">
import { computed, shallowRef, useTemplateRef } from 'vue'

const dragging = shallowRef(false)
const containerRef = useTemplateRef('container')

const split = shallowRef(20)

const boundSplit = computed(() => {
  return split.value < 20 ? 20 : split.value > 80 ? 80 : split.value
})

let startPosition = 0
let startSplit = 0

function dragStart(e: MouseEvent) {
  dragging.value = true
  startPosition = e.pageX
  startSplit = boundSplit.value
}

function dragMove(e: MouseEvent) {
  if (containerRef.value && dragging.value) {
    const position = e.pageX
    const totalSize = containerRef.value.offsetWidth
    const dp = position - startPosition
    split.value = startSplit + +((dp / totalSize) * 100).toFixed(2)
  }
}

function dragEnd() {
  dragging.value = false
}
</script>

<template>
  <div
    ref="container"
    class="u-split-pane"
    :class="{ dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left-pane" :style="{ width: `${boundSplit}%` }">
      <slot name="left" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="right-pane" :style="{ width: `${100 - boundSplit}%` }">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.u-split-pane {
  display: flex;
  height: 100%;
  width: 100vw;
  position: relative;

  &.dragging {
    cursor: ew-resize;

    .left-pane,
    .right-pane {
      pointer-events: none;
    }
  }

  .left-pane,
  .right-pane {
    position: relative;
    height: 100%;
  }

  .left-pane {
    border-right: 1px solid var(--u-border);
  }

  .dragger {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    right: -5px;
    width: 10px;
    cursor: ew-resize;
  }
}
</style>
