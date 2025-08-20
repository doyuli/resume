<script setup lang="ts">
import { useDarkStore } from '@/stores'

const { isDark, toggleDark } = useDarkStore()
</script>

<template>
  <button :aria-checked="isDark" class="u-switch" type="button" role="switch" @click="toggleDark()">
    <span class="check">
      <span class="icon">
        <span class="i-sun sun" />
        <span class="i-moon moon" />
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.u-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s !important;
  cursor: pointer;

  &:hover {
    border-color: var(--u-theme);
  }

  .check {
    position: absolute;
    top: 1px;
    /*rtl:ignore*/
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--vp-c-neutral-inverse);
    box-shadow: var(--vp-shadow-1);
    transition: transform 0.25s !important;
  }
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;

  [class^='i-'] {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 12px;
    height: 12px;
    color: var(--u-text-2);
  }
}

.dark .icon [class^='i-'] {
  color: var(--u-text-1);
  transition: opacity 0.25s !important;
}

.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .check {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
