<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useResumeStore } from '@/stores'
import { themes } from '@/themes'
import UColorPicker from './UColorPicker.vue'

const resumeStore = useResumeStore()
const { color, lineHeight, fontFamily, theme } = storeToRefs(resumeStore)

const lineHeights = Array.from({ length: 14 }, (_, i) => {
  const value = i + 12
  return {
    label: value,
    value: value / 10,
  }
})

const fonts = [
  {
    label: '思源黑体',
    value: 'Noto Sans SC',
  },
  {
    label: '思源宋体',
    value: 'Noto Serif SC',
  },
  // {
  //   label: '苹果方正',
  //   value: 'PingFang SC',
  // },
]
</script>

<template>
  <div class="u-operations">
    <select v-model="theme" title="设置主题">
      <option v-for="item in themes" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>

    <select v-model="lineHeight" title="设置行距">
      <option v-for="item in lineHeights" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>

    <select v-model="fontFamily" title="设置字体">
      <option v-for="item in fonts" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>

    <UColorPicker v-model="color" title="设置主题色" />
  </div>
</template>

<style lang="scss" scoped>
.u-operations {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 12px;
  padding: 1em;
  background-color: #4e4e4e;
  border-radius: 4px;
}

select {
  padding: 2px 8px;
  width: 100%;
  min-width: 0;
  max-width: 120px;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  &:hover {
    border-color: var(--u-theme);
  }
  &:focus {
    border-color: var(--u-theme);
  }
}
</style>
