import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
  { path: '*', redirect: '/personal_center' },
  {
    path: '/personal_center',
    name: '后台首页',
    component:() => import('@/views/BackHome/pages/back_home'),
    children: [
      {
        path: '/personal_center',
        name: '个人中心',
        icon:'cluster',
        meta:{show:true,menuPath:'/personal_center',openKey:'sub1'},
        component:() => import('@/views/PersonalCenter/pages/personal_center'),
      },
         
    ]
  },  
 
]

const createRouter = () => new Router({
  mode:'history',
  routes: Routes
})

const router = createRouter()

export default router;