<template>
  <div>
    <el-checkbox v-model="todo.done">
      <!-- 顯示完成任務 -->
      <span v-if="todo.done">
        <del class="text done">{{ todo.text }}</del>
      </span>
      <!-- 顯示未完成任務 -->
      <span v-else class="text">{{ todo.text }}</span>
      <!-- 修改按鈕 -->
      <el-button
        type="success"
        icon="el-icon-edit"
        @click="editTodo()"
        plain
      >
      </el-button>
      <!-- 刪除按鈕 -->
      <el-button
        type="danger"
        icon="el-icon-delete"
        plain
        @click="deleteTodo(todo)"
      ></el-button>
    </el-checkbox>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  // 參數區
  props: {
    todo: {
      id: -1,
      done: false,
      text: 'unknown'
    }
  },
  // 方法
  methods: {
    /** 載入Vuex的 mutations 方法 **/
    ...mapMutations({
      editTodoFromVuex: 'editTodo',
      deleteTodo: 'deleteTodo'
    }),
    /** 以下為Vue裡面宣告的方法 **/
    editTodo () {
      let newText = prompt('請輸入要修改的任務')
      newText = newText.trim()
      if (newText === '') {
        return
      }
      this.editTodoFromVuex({
        todo: this.todo,
        newText
      })
    }
  }
}
</script>
