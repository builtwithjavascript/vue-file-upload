<script setup lang="ts">
import { computed } from 'vue'
import FileValidatorRowComponent from './FileValidatorRow.component.vue'
import type { IFileInfo, IFileValidatorItem } from '@builtwithjavascript/file-input-validator'

interface IProps {
  id: string
  model: IFileInfo
  successClass?: string
  errorClass?: string
  showOnlyErrors?: boolean
  roundedCorners?: boolean
  validatorItems: IFileValidatorItem[]
}

const props = withDefaults(defineProps<IProps>(), {
  showOnlyErrors: true,
  roundedCorners: false,
  successClass: 'success bg-success content-success',
  errorClass: 'error bg-danger content-danger'
})

const computedValidatorItems = computed(() => {
  return props.validatorItems.filter((x) => !props.showOnlyErrors || x.hasError)
})

const topDivCssClasses = computed((): string => {
  const result = [
    //`file-validator-item px-4 py-2 flex items-center text-white`
    `file-validator-item`
  ]

  result.push(`${props.model?.isValid ? props.successClass : props.errorClass}`)

  return result.join(' ').trim()
})
</script>

<template>
  <div v-show="model.displayName.length > 0" class="file-validator">
    <div v-show="model.message" :class="topDivCssClasses">
      <span style="">{{ model.isValid ? 'File:' : 'Error:' }}</span>
      <span class="" :title="model.isValid ? model.displayName : model.message">
        {{ model.isValid ? model.displayName : model.message }}
      </span>
    </div>
    <!-- do not use v-show here, but rather v-if to make sure it re-render appropriately -->
    <div v-if="!model.message" class="file-validator-inner">
      <FileValidatorRowComponent
        v-for="(item, index) in computedValidatorItems"
        :key="`file-validator-row-${item.key}`"
        :index="index"
        :totItemsCount="computedValidatorItems.length"
        :roundedCorners="roundedCorners"
        :model="item"
      />
    </div>
  </div>
</template>
