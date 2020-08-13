import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: JSON.parse(window.localStorage.getItem('goodsList')) || [],
    isAllChecked: window.localStorage.getItem('isAllChecked') || false
  },
  mutations: {
    addGoods(state, obj) {
      if (!state.goodsList.some(item => item.id === obj.id)) {
        obj.num = 1
        obj.Checked = false
        state.goodsList.push(obj)
      } else {
        state.goodsList.forEach(item => {
          if (item.id === obj.id) {
            item.num++
          }
        })
      }
      state.isAllChecked = !state.goodsList.some(item => item.Checked === false)
      window.localStorage.setItem('isAllChecked', state.isAllChecked)
      window.localStorage.setItem('goodsList', JSON.stringify(state.goodsList))
    },
    add(state, id) {
      state.goodsList.forEach(item => {
        if (item.id === id) {
          item.num++
        }
      })
      window.localStorage.setItem('goodsList', JSON.stringify(state.goodsList))
    },
    reduce(state, id) {
      state.goodsList.forEach(item => {
        if (item.id === id) {
          if (item.num === 1) {
            return
          }
          item.num--
        }
      })
      window.localStorage.setItem('goodsList', JSON.stringify(state.goodsList))
    },
    checked(state, id) {
      state.goodsList.forEach(item => {
        if (item.id === id) {
          item.Checked = !item.Checked
        }
      })
      window.localStorage.setItem('goodsList', JSON.stringify(state.goodsList))
      state.isAllChecked = !state.goodsList.some(item => item.Checked === false)
      window.localStorage.setItem('isAllChecked', state.isAllChecked)
    },
    allChecked(state) {
      state.isAllChecked = !state.isAllChecked
      state.goodsList.forEach(item => (item.Checked = state.isAllChecked))
    }
  },
  actions: {},
  modules: {},
  getters: {
    totalPrices(state) {
      let totalPrices = 0
      state.goodsList.forEach(item => {
        if (item.Checked) {
          totalPrices += item.price * 10 * item.num
        }
      })
      return totalPrices / 10
    },
    checkedNum(state) {
      let num = 0
      state.goodsList.forEach(item => {
        if (item.Checked) {
          num += item.num
        }
      })
      return num
    }
  }
})
