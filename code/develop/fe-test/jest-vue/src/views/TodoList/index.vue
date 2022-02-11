<template>
  <div>
    <m-header msg="Welcome to your App"></m-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header/index.vue'

export default defineComponent({
  components: {
    MHeader: Header
  }
})
</script>
