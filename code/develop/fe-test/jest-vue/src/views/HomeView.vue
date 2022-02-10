<template>
  <div>
    <hello-world msg="Welcome to your App"></hello-world>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "../components/HelloWorld/index.vue";

export default defineComponent({
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss" scoped></style>
