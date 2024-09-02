<script setup lang="ts">
import { computed } from 'vue'
import { IFileValidatorItem } from '@builtwithjavascript/file-input-validator'

type IProps = {
  id?: string
  index: number
  totItemsCount: number
  successClass?: string
  errorClass?: string
  roundedCorners?: boolean
  model: IFileValidatorItem
}

const props = withDefaults(defineProps<IProps>(), {
  roundedCorners: false,
  successClass: 'success bg-success content-success',
  errorClass: 'error bg-danger content-danger'
})

const cssClass = computed(() => {
  const { model } = props
  const hasError = model?.hasError || false
  //const isFirst = model.index === 0
  //const isLast = index === model.totItemsCount - 1

  //const result = ['file-validator-item px-4 py-2 flex items-center text-white']
  const result = ['file-validator-item']

  // if (props.roundedCorners) {
  //   if (isFirst) {
  //     result.push('rounded-t-lg')
  //   }
  //   if (isLast) {
  //     result.push('rounded-b-lg')
  //   }

  //   if (!isLast && totItemsCount > 1) {
  //     result.push('border-b-0')
  //   }
  // }

  // item success/error class
  result.push(hasError ? props.errorClass : props.successClass)

  return result.join(' ').trim()
})

// <icon class="h-4 w-4 flex-none" aria-hidden="true" :title="validationIcon" />
</script>
<template>
  <div :class="cssClass" :title="model.value" :data-testid="props.id">
    <span class="property-name flex-none w-20">{{ model.name }}</span>
    <span
      :class="`property-value flex-initial ${model.hasError ? '' : 'overflow-hidden overflow-ellipsis whitespace-nowrap'}`"
    >
      {{ model.displayValue }}
    </span>
  </div>
</template>
