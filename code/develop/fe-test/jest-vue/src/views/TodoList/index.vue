<template>
  <div class="todolist">
    <m-header class="header" msg="Welcome to your App" @add="addItem"></m-header>
    <div class="list-container">
      <div class="list">
        <h3>未完成</h3>
        <ul class="undolist">
          <li v-for="li in undolist" :key="li">{{ li }}</li>
        </ul>
      </div>
      <div class="list">
        <h3>已完成</h3>
        <ul class="dolist">
          <li v-for="li in dolist" :key="li">{{ li }}</li>
        </ul>
      </div>
    </div>
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
      undolist: [] as string[],
      dolist: [] as string[]
    }
  },
  methods: {
    addItem(item: string) {
      this.undolist.push(item)
    }
  }
})
</script>

<style lang="scss" scoped>
.todolist {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .header {
    width: 100%;
    height: 130px;
    line-height: 60px;
    background-color: #000;
  }
  .list-container {
    width: 70%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    .list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      list-style: none;
      line-height: 30px;
    }
    .undolist {
      width: 400px;
      height: 500px;
      padding: 10px;
      font-size: 18px;
      font-weight: 400;
      border: 1px solid rgb(240, 173, 78);
      list-style: none;
      border-radius: 15px;
    }
    .dolist {
      width: 400px;
      height: 500px;
      padding: 10px;
      font-size: 18px;
      font-weight: 400;
      border: 1px solid rgb(92, 184, 92);
      text-decoration: line-through;
      border-radius: 15px;
    }
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
