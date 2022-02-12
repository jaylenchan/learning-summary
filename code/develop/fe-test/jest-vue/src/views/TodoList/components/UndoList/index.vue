<template>
  <div class="wrapper">
    <div class="count">{{ list.length }}</div>
    <ul>
      <li v-for="(item, index) in list" :key="item + index" class="item"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: ' UndoList',
  props: {
    list: []
  }
})
</script>

<style lang="scss" scoped></style>
