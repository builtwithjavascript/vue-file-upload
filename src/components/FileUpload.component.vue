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

type IFileUploadProps = {
  id: string
  uploadLabel: string
  validatorOptions?: IFileValidatorOptions
  showOnlyErrors?: boolean
  roundedCorners?: boolean
  successClass?: string
  errorClass?: string
  inputCssClass?: string
}

const props = withDefaults(defineProps<IFileUploadProps>(), {
  showOnlyErrors: false,
  roundedCorners: false,
  successClass: 'success bg-green-600',
  errorClass: 'error bg-red-600'
})

const emits = defineEmits<{
  (e: 'uploadClicked', model: IFileInfo): any
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

const uploadDisabled = computed(() => {
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
}

const onUploadClick = async () => {
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
      :id="`${props.id}-input`"
      :model="state.fileInfo"
      :cssClass="props.inputCssClass"
      @changed="onFileInputChanged"
    />

    <FileValidatorComponent
      :model="state.fileInfo"
      :id="`${props.id}-validator`"
      :validatorItems="state.validatorItems"
      :showOnlyErrors="props.showOnlyErrors"
      :roundedCorners="props.roundedCorners"
    />

    <button
      @click="onUploadClick"
      :disabled="uploadDisabled"
      :class="`p-2 rounded-md ${uploadDisabled ? 'bg-gray-400' : 'bg-blue-500'} color-white`"
    >
      {{ props.uploadLabel }}
    </button>
  </div>
</template>
