import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/',
      alias: '/files/move',
      name: 'MoveFiles',
      component: () => import('@/pages/movefiles'),
    },
    {
      path: '/files/getlink',
      name: 'GetLink',
      component: () => import('@/pages/getlink'),
    },
  ],
})

export default routers
