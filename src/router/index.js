import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/home/HomePage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
