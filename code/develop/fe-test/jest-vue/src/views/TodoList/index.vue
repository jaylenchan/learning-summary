<template>
  <div class="todolist">
    <m-header class="header" msg="Welcome to your App" @add="addItem"></m-header>
    <ul>
      <li v-for="(li, index) in undolist" :key="index">{{ li }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header/index.vue'

export default defineComponent({
  name: 'TodoList',
  components: {
    MHeader: Header
  },
  data() {
    return {
      undolist: [] as string[]
    }
  },
  methods: {
    addItem(item: string) {
      this.undolist.push(item)
    }
  }
})
</script>
