import Vue from 'vue'

export const setLocalVariable = function(name, value) {
  localStorage.setItem(name, value)
}

Vue.prototype.$setLocal = setLocalVariable
