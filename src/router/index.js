import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Page from '@/components/home/Page.vue'
import Shopping from '@/components/home/Shopping.vue'
import My from '@/components/home/My.vue'
import GoodDetails from '@/components/gooddetails/GoodDetails.vue'
import BuyNow from '@/components/buynow/BuyNow.vue'
import GoodsList from '@/views/GoodsList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/',
    component: Home,
    redirect: '/page',
    name: 'home',
    children: [
      { path: '/page', name: 'page', component: Page },
      { path: '/shopping', name: 'shopping', component: Shopping },
      { path: '/my', name: 'my', component: My }
    ]
  },
  {
    path: '/goods/details/:id',
    name: 'goodsdetails',
    component: GoodDetails,
    props: true
  },
  { path: '/buy/now/:id', name: 'buynow', component: BuyNow, props: true },
  { path: '/goods/list', name: 'goodslist', component: GoodsList }
]

const router = new VueRouter({
  routes
})

export default router
