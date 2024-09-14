<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import FileInputComponent from './FileInput.component.vue'
import FileValidatorComponent from './FileValidator.component.vue'
import { useFileInputValidator } from '@builtwithjavascript/file-input-validator'
import type {
  IFileInfo,
  IFileValidatorItem,
  IFileValidatorOptions
} from '@builtwithjavascript/file-input-validator'

interface IFileUploadProps {
  id: string
  disabled?: boolean
  uploadLabel: string
  validatorOptions?: IFileValidatorOptions
  showOnlyErrors?: boolean
  roundedCorners?: boolean
  successClass?: string
  errorClass?: string
  inputCssClass?: string
  inputWrapperCssClass?: string
  validatorRowCssClass?: string
}

const props = withDefaults(defineProps<IFileUploadProps>(), {
  disabled: false,
  showOnlyErrors: false,
  roundedCorners: false,
  successClass: 'success', // 'bg-none text-success border-success',
  errorClass: 'error', // bg-none text-danger border border-danger',
  inputWrapperCssClass: ''
})

const emits = defineEmits<{
  (e: 'fileSelectionChanged', model: IFileInfo): any
  (e: 'uploadClicked', model: IFileInfo): any
  (e: 'update:valid', value: boolean): any
}>()

const refFileInputComp = ref<InstanceType<typeof FileInputComponent> | null>()

const initFileInfo = () => {
  return {
    file: null,
    lastModified: '',
    fileSelected: false,
    isValid: false,
    name: '',
    displayName: '',
    message: ''
  }
}

const state = reactive<{
  fileInfo: IFileInfo
  validatorItems: IFileValidatorItem[]
}>({
  fileInfo: initFileInfo(),
  validatorItems: []
})

const isInvalid = computed(() => {
  if (!state.fileInfo.file) {
    return true
  }
  return state.validatorItems.some((x) => x.hasError)
})

// init FileValidator
const fileValidator = useFileInputValidator(props.validatorOptions)

const onFileInputChanged = (updatedModel: IFileInfo) => {
  state.fileInfo = updatedModel
  state.validatorItems = fileValidator.validateFile(state.fileInfo)
  console.log('___ fileSelectionChanged', state.fileInfo, state.validatorItems)
  emits('fileSelectionChanged', state.fileInfo)
  emits('update:valid', isInvalid.value)
}

const onUploadClick = async () => {
  console.log('___ onUploadClick', state.fileInfo?.file)
  emits('uploadClicked', state.fileInfo)
}

const reset = () => {
  refFileInputComp.value?.resetInputFile()
  onFileInputChanged(initFileInfo())
}

defineExpose<{
  reset: () => any
}>({
  reset
})
</script>

<template>
  <div className="max-w-96 space-y-2">
    <FileInputComponent
      ref="refFileInputComp"
      :id="props.id"
      :disabled="props.disabled"
      :model="state.fileInfo"
      :inputWrapperCssClass="props.inputWrapperCssClass"
      :inputCssClass="props.inputCssClass"
      @changed="onFileInputChanged"
    />

    <FileValidatorComponent
      :model="state.fileInfo"
      :id="`${props.id}-validator`"
      :validatorItems="state.validatorItems"
      :showOnlyErrors="props.showOnlyErrors"
      :roundedCorners="props.roundedCorners"
      :successClass="props.successClass"
      :errorClass="props.errorClass"
      :validatorRowCssClass="props.validatorRowCssClass"
    />

    <slot>
      <button
        @click="onUploadClick"
        :disabled="isInvalid"
        :class="`p-2 rounded-md ${isInvalid ? 'bg-gray-400' : 'bg-blue-500'} color-white`"
      >
        {{ props.uploadLabel }}
      </button>
    </slot>
  </div>
</template>
