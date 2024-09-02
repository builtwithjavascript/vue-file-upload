<script setup lang="ts">
import { computed } from 'vue'
import FileValidatorRowComponent from './FileValidatorRow.component.vue'
import type { IFileInfo, IFileValidatorItem } from '@builtwithjavascript/file-input-validator'

interface IProps {
  id: string
  model: IFileInfo
  showOnlyErrors?: boolean
  roundedCorners?: boolean
  validatorItems: IFileValidatorItem[]
  successClass?: string
  errorClass?: string
  validatorRowCssClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
  showOnlyErrors: true,
  roundedCorners: false,
  successClass: 'success bg-success content-success',
  errorClass: 'error bg-danger content-danger',
  validatorRowCssClass: ''
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
  <div v-show="model.displayName.length > 0" :data-testid="props.id" class="file-validator">
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
        :id="`${props.id}-file-validator-row_${item.key}`"
        :key="`file-validator-row-${item.key}`"
        :index="index"
        :totItemsCount="computedValidatorItems.length"
        :roundedCorners="roundedCorners"
        :model="item"
        :successClass="props.successClass"
        :errorClass="props.errorClass"
        :validatorRowCssClass="props.validatorRowCssClass"
      />
    </div>
  </div>
</template>
