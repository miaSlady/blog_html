import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
  { path: '*', redirect: '/blogHome' },
  {
    path: '/blogHome',
    name: '展示首页',
    component:() => import('@/views/ShowHome/pages/show_home'),
    children: [
      {
        path: '/blogHome',
        name: '首页',
        component:() => import('@/views/ShowHome/pages/blogHome'),
      },
      {
        path: '/showVideoCourse',
        name: '视频教程',
        component:() => import('@/views/ShowHome/pages/showVideoCourse'),
      },
      {
        path: '/showBibi',
        name: '逼逼叨',
        component:() => import('@/views/ShowHome/pages/showBibi'),
      },
         
    ]
  },  
  {
    path: '/showLife',
    name: '图说生活',
    component:() => import('@/views/ShowHome/pages/showLife'),
  },
 
]

const createRouter = () => new Router({
  mode:'history',
  routes: Routes
})

const router = createRouter()

export default router;