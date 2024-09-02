<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { IFileInfo } from '@builtwithjavascript/file-input-validator'

type IFileInputProps = {
  id: string
  model: IFileInfo
  cssClass?: string
}

export default defineComponent({
  name: 'FileInputComponent'
})
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<IFileInputProps>(), {
  cssClass: ''
})

const emits = defineEmits<{
  (e: 'changed', model: IFileInfo): any
}>()

const refInputFile = ref<HTMLInputElement | null>()

const cssClasses = computed(() => {
  const classes: string[] = [
    //'cursor-pointer w-full flex flex-col space-y-2 p-2 overflow-hidden overflow-ellipsis whitespace-nowrap'
  ]
  if (props.cssClass) {
    classes.push(props.cssClass)
  }
  return classes.join(' ').trim()
})

const resetInputFile = () => {
  // a way to reset the html input type='file" element
  const inputFile = refInputFile.value
  if (inputFile) {
    inputFile.value = ''
  }
}

defineExpose<{
  resetInputFile: () => any
}>({
  resetInputFile
})

const onInputFileChange = (ev: any) => {
  const el: HTMLInputElement = ev.target
  if (el.files && el.files.length > 0) {
    props.model.file = el.files.item(0)
  } else {
    // no file selected
    props.model.file = null
  }
  props.model.fileSelected = !!props.model.file
  emits('changed', props.model)
}
</script>
<template>
  <label :class="cssClasses" :id="props.id">
    <input ref="refInputFile" type="file" @change="onInputFileChange" />
  </label>
</template>
