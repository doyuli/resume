<script setup lang="ts">
import { useTemplateRef } from 'vue'
import UIcon from './UIcon.vue'

const color = defineModel<string>('modelValue')

const inputRef = useTemplateRef('ipt')
</script>

<template>
  <div class="u-color-pinker" :style="{ backgroundColor: color }" @click="inputRef?.click()">
    <UIcon icon="ri:color-filter-fill" :size="16" />
    <input id="" ref="ipt" v-model="color" type="color" name="">
  </div>
</template>

<style lang="scss" scoped>
.u-color-pinker {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: #ffffff;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 4px;

  input[type='color'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
