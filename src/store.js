import Vue from 'vue'
import Vuex from 'vuex' // <--- 引入 Vuex

// 使用 Vuex
Vue.use(Vuex) // <--- 用來當作資料中心

// 建立一個 Vuex
const store = new Vuex.Store({
  state: {
    todos: [{
      id: 1,
      text: 'Golang',
      done: true
    }, {
      id: 2,
      text: 'Docker',
      done: false
    }]
  },
  mutations: {
    addTodo (state, payload) {
      console.log('增加新任務', payload)
      state.todos.push(payload)
    },
    editTodo: (state, payload) => {
      console.log('修改任務', payload)
      state.todos = state.todos.map((todo) => {
        if (todo === payload.todo) {
          todo.text = payload.newText
        }
        return todo
      })
    },
    deleteTodo: (state, payload) => {
      console.log('刪除任務', payload)
      state.todos = state.todos.filter((todo) => {
        return payload !== todo
      })
    }
  }
})
export default store
