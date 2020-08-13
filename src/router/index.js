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
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    component: Home,
    redirect: '/page',
    children: [
      { path: '/page', component: Page },
      { path: '/shopping', component: Shopping },
      { path: '/my', component: My }
    ]
  },
  { path: '/goods/details/:id', component: GoodDetails, props: true },
  { path: '/buy/now/:id', component: BuyNow, props: true },
  { path: '/goods/list', component: GoodsList }
]

const router = new VueRouter({
  routes
})

export default router
