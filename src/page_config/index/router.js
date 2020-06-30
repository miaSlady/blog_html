import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
  { path: '*', redirect: '/homePage' },
  {
    path: '/homePage',
    name: '欢迎页面',
    component:() => import('@/views/HomePage/pages/homePage'),
    
  },  
 
]

const createRouter = () => new Router({
  mode:'history',
  routes: Routes
})

const router = createRouter()

export default router;