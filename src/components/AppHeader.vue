<script setup lang="ts">
import { onClickOutside, useToggle } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useResumeExport } from '@/composables'
import { useResumeStore } from '@/stores'
import UIconLink from './UIconLink.vue'
import USwitch from './USwitch.vue'

const resumeStore = useResumeStore()

const { isLoading, isServiceHealth, handleExport } = useResumeExport()

const [showDropdownMenu, toggleDropdown] = useToggle()

const target = useTemplateRef<HTMLElement>('target')

onClickOutside(target, () => showDropdownMenu.value = false)

type ExportParameters = Parameters<typeof handleExport>

function handleDropdownExport(...args: ExportParameters) {
  showDropdownMenu.value = false
  handleExport(...args)
}
</script>

<template>
  <header>
    <div class="resume">
      <input v-model="resumeStore.name" placeholder="请输入" type="text">
    </div>
    <div class="operations">
      <UIconLink icon="github" link="https://github.com/doyuli/resume" />
      <div class="divider" />
      <USwitch />
      <div class="divider" />
      <div ref="target" class="dropdown" @click.stop>
        <button :class="{ loading: isLoading }" @click="toggleDropdown()">
          {{ isLoading ? '导出中' : '导出' }}
        </button>
        <transition name="fade-slide">
          <ul v-if="showDropdownMenu" class="dropdown-menu">
            <li @click="handleDropdownExport('pdf-client')">
              快速导出 PDF
            </li>
            <li v-if="isServiceHealth" @click="handleDropdownExport('pdf-service')">
              高质量导出 PDF
            </li>
            <li @click="handleDropdownExport('image')">
              导出图片
            </li>
            <li @click="handleDropdownExport('md')">
              导出 MD
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--u-text);
  height: var(--header-height);
  box-sizing: border-box;
  padding: 0 4em;
  background-color: var(--u-bg);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.5s;
  color: var(--u-text-1);

  .operations {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .divider {
    width: 1px;
    height: 24px;
    background-color: var(--u-divider);
  }
}

input {
  padding: 4px 10px;
  width: 100%;
  min-width: 0;
  max-width: 400px;
  color: var(--u-text-1);
  font-size: 14px;
  background-color: transparent;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 2px;
  outline: none;
  transition: all 0.3s;

  &:hover {
    border-color: var(--u-theme);
  }
  &:focus {
    border-color: var(--u-theme);
  }
}

button {
  padding: 6px 12px;
  color: #ffffff;
  font-size: 12px;
  background-color: var(--u-theme);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dropdown {
  position: relative;
  display: inline-block;

  .dropdown-menu {
    position: absolute;
    top: 108%;
    right: 0;
    background: var(--u-bg);
    border: 1px solid var(--u-border);
    border-radius: 4px;
    margin-top: 4px;
    list-style: none;
    padding: 0;
    min-width: 100px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }

  .dropdown-menu li {
    padding: 6px 12px;
    white-space: nowrap;
    cursor: pointer;
  }

  .dropdown-menu li:hover {
    background: var(--u-divider);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
