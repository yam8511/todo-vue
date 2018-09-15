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
      <Todo v-for="todo in filterTodos"
        :key="todo.id"
        class="text item"
        :todo="todo"
      />
    </el-card>
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    Todo
  },
  // 資料區
  data () {
    return {
      newTodo: '',
      filter: '0',
      id: 0
    }
  },
  // 設定給 template 用的，具有快取作用
  computed: {
    ...mapState({
      filterTodos: function (state) {
        console.log('目前過濾器 --->', this.filter)
        let filterTodos = state.todos
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
      totalCount: function (state) {
        return state.todos.length
      },
      todoCount: function (state) {
        return state.todos.filter((todo) => {
          return todo.done === false
        }).length
      },
      doneCount: function (state) {
        return state.todos.filter((todo) => {
          return todo.done === true
        }).length
      }
    })
  },
  // 監聽變數
  watch: {
    newTodo: function () {
      console.log('新任務有改變,', this.newTodo)
    }
  },
  // 方法
  methods: {
    /** 載入Vuex的 mutations 方法 **/
    ...mapMutations({
      addTodoFromVuex: 'addTodo'
    }),
    /** 以下為Vue裡面宣告的方法 **/
    addTodo () {
      this.newTodo = this.newTodo.trim()
      if (this.newTodo === '') {
        return
      }
      this.addTodoFromVuex({
        id: this.id++,
        text: this.newTodo,
        done: false
      })
      this.newTodo = ''
    },
    changeFilter (filter) {
      console.log('過濾器變更', filter)
      this.filter = filter
    }
  },
  mounted () {
    this.id = this.filterTodos.length + 1
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
