<template>
  <div class="w-100 text-center d-flex justify-content-center">
    <div class="position-relative text-center w-75">
      <input
        :type="InputType"
        :placeholder="PlaceHolder"
        v-model="inputValue"
        class="border rounded-2 red-border-1 border-2 bg-color-white red-text-1 fs-2 px-4 py-2 w-100"
      />
      <div class="h-100 position-absolute end-0 d-inline p-2">
        <IconSubmit
          v-show="submitButtonVisible"
          @click="handleSubmit"
          color="white"
          class="bg-red-1 rounded-5 p-2 h-100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import IconSubmit from '../icons/IconSubmit.vue'

export default {
  components: {
    IconSubmit
  },
  props: {
    InputType: {
      type: String,
      required: true
    },
    PlaceHolder: {
      type: String,
      default: ''
    },
    SubmitAction: {
      type: Function,
      default: null
    },
    value: {
      // Accept a value prop for v-model
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const submitButtonVisible = ref(false)
    const inputValue = ref(props.value) // Create a local ref for input value

    // Watch for changes in the SubmitAction prop
    watch(
      () => props.SubmitAction,
      (newValue) => {
        submitButtonVisible.value = typeof newValue === 'function' // Check if it's a function
      },
      { immediate: true }
    )

    // Watch inputValue to emit changes to parent
    watch(inputValue, (newValue) => {
      emit('update:value', newValue) // Emit the updated value to parent
    })

    const handleSubmit = () => {
      console.log('Form submitted!')
      if (props.SubmitAction) {
        props.SubmitAction(inputValue.value) // Pass the input value to the SubmitAction
      }
    }

    return {
      submitButtonVisible,
      inputValue, // Use the local ref for v-model binding
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.red-text-1 {
  color: $red-1;
}
.large-text {
  font-size: 6rem;
}
.bg-red-1 {
  background-color: $red-1;
}
.bg-color-white {
  background-color: $vt-c-white;
}
.red-border-1 {
  border-color: $red-1 !important;
}
</style>
