<script setup lang="ts">
import { computed } from 'vue'
import { IFileValidatorItem } from '@builtwithjavascript/file-input-validator'

interface IProps {
  id?: string
  index: number
  totItemsCount: number
  roundedCorners?: boolean
  model: IFileValidatorItem
  validatorRowCssClass?: string
  successClass?: string
  errorClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
  id: 'not-set',
  roundedCorners: false,
  successClass: 'success bg-success content-success',
  errorClass: 'error bg-danger content-danger',
  validatorRowCssClass: ''
})

const wrapperCssClass = computed(() => {
  const { model } = props
  const hasError = model?.hasError || false
  //const isFirst = model.index === 0
  //const isLast = index === model.totItemsCount - 1

  //const result = ['file-validator-item px-4 py-2 flex items-center text-white']
  const result = ['file-validator-item']

  result.push(`${props.validatorRowCssClass || ''}`)

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
  <div :class="wrapperCssClass" :title="model.value" :id="props.id" :data-testid="props.id">
    <span :class="`property-name`" style="flex: none; width: 5rem">{{ model.name }}</span>
    <span
      :class="`property-value ${model.hasError ? 'error' : ''}`"
      :style="`flex: 0 1 auto;${model.hasError ? '' : 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'}`"
    >
      {{ model.displayValue }}
    </span>
  </div>
</template>
