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
      {
        path: '/test',
        name: 'base64上传',
        icon:'cluster',
        meta:{show:true,menuPath:'/test',openKey:'sub1'},
        component:() => import('@/views/PersonalCenter/pages/test'),
      },
      {
        path: '/home',
        name: '首页设置',
        icon:'cluster',
        meta:{show:true,menuPath:'/home',openKey:'sub1'},
        component:() => import('@/views/BackFunction/pages/homeSet'),
      },
      {
        path: '/videoCourse',
        name: '视频教程',
        icon:'cluster',
        meta:{show:true,menuPath:'/videoCourse',openKey:'sub2'},
        component:() => import('@/views/BackFunction/pages/videoCourse'),
      },
      {
        path: '/bibi',
        name: '逼逼叨',
        icon:'cluster',
        meta:{show:true,menuPath:'/bibi',openKey:'sub2'},
        component:() => import('@/views/BackFunction/pages/bibi'),
      },
      {
        path: '/life',
        name: '图说生活',
        icon:'cluster',
        meta:{show:true,menuPath:'/life',openKey:'sub2'},
        component:() => import('@/views/BackFunction/pages/life'),
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