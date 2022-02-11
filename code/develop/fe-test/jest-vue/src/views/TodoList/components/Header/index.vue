<template>
  <div class="wrapper">
    <h1 class="title">TodoList</h1>
    <input
      data-test="input"
      v-model="inputValue"
      @keyup.enter="addTodoItem"
      placeholder="请输入待办事项"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  props: {
    msg: String
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    addTodoItem() {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  .title {
    color: #fff;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 600px;
    height: 40px;
    border: none;
    border-radius: 10px;
    text-indent: 20px;
    outline: none;
    font-size: 20px;
  }
}
</style>
