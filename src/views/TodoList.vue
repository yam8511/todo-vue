<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <!-- 本體 -->
    <el-card class="box-card" shadow="hover">
      <!-- 標題區 -->
      <div slot="header" class="clearfix">
        <div class="card-header">任務清單</div>
        <!-- 輸入塊 -->
        <input
          class="text"
          placeholder="請輸入新任務"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
        <!-- 輸入按鈕 -->
        <el-button
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="addTodo"
          plain
        >
        </el-button>
      </div>
      <!-- 過濾區、顯示計算區 -->
      <el-container>
        <el-radio-group
          v-model="filter"
          style="margin:auto;"
        >
          <el-radio-button label="0">ALL ({{ totalCount }})</el-radio-button>
          <el-radio-button label="1">Todo ({{ todoCount }})</el-radio-button>
          <el-radio-button label="2">Done ({{ doneCount }})</el-radio-button>
        </el-radio-group>
      </el-container>
      <hr />
      <!-- 列表區 -->
      <div v-for="todo in filterTodos" :key="todo.id" class="text item">
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
            @click="editTodo(todo)"
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
    </el-card>
  </div>
</template>

<script>
export default {
  // 資料區
  data () {
    return {
      newTodo: '',
      filter: '0',
      id: 0,
      todos: [{
        id: 1,
        text: 'Golang',
        done: true
      }, {
        id: 2,
        text: 'Docker',
        done: false
      }]
    }
  },
  // 設定給 template 用的，具有快取作用
  computed: {
    filterTodos: function () {
      console.log('目前過濾器 --->', this.filter)
      let filterTodos = this.todos
      if (this.filter === '1') {
        filterTodos = filterTodos.filter((todo) => {
          return todo.done === false
        })
      } else if (this.filter === '2') {
        filterTodos = filterTodos.filter((todo) => {
          return todo.done === true
        })
      }
      return filterTodos
    },
    totalCount: function () {
      return this.todos.length
    },
    todoCount: function () {
      return this.todos.filter((todo) => {
        return todo.done === false
      }).length
    },
    doneCount: function () {
      return this.todos.filter((todo) => {
        return todo.done === true
      }).length
    }
  },
  // 監聽變數
  watch: {
    newTodo: function () {
      console.log('新任務有改變,', this.newTodo)
    }
  },
  // 方法
  methods: {
    addTodo () {
      this.newTodo = this.newTodo.trim()
      if (this.newTodo === '') {
        return
      }
      console.log('增加新任務', this.newTodo)
      this.todos.push({
        id: this.id++,
        text: this.newTodo,
        done: false
      })
      this.newTodo = ''
    },
    editTodo (editTodo) {
      let newText = prompt('請輸入要修改的任務')
      newText = newText.trim()
      if (newText === '') {
        return
      }
      this.todos = this.todos.filter((todo) => {
        if (todo.id === editTodo.id) {
          todo.text = newText
        }
        return todo
      })
    },
    deleteTodo (deletedTodo) {
      this.todos = this.todos.filter((todo) => {
        return todo !== deletedTodo
      })
    },
    changeFilter (filter) {
      console.log('過濾器變更', filter)
      this.filter = filter
    }
  },
  mounted () {
    this.id = this.todos.length + 1
    console.log('掛載完了, 目前ID =', this.id)
  }
}
</script>

<style scoped>
  .card-header {
    font-size: 36px
  }
  .text {
    font-size: 24px;
    color: #333;
  }
  .done {
    color: #AAA;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
  }
</style>
