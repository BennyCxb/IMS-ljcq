import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Home.vue'], resolve)
        },
        {
          path: '/otable:fid-:sid-:tid-:btid',
          component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        },
        {
          path: '/otable:fid-:sid-:btid',
          component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        },
        {
          path: '/otable:fid-:btid',
          component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        },
        {
          path: '/null:fid-:btid',
          component: resolve => require(['../components/page/notfound.vue'], resolve)
        },
        {
          path: '/otable:fid-:btid/info',
          component: resolve => require(['../components/page/add.vue'], resolve)
        }
        // {
        //   path: '/btable:fid-:sid-:tid-:btid',
        //   component: resolve => require(['../components/page/BridgeTable.vue'], resolve)
        // },
        // {
        //   path: '/btable:fid-:sid-:btid',
        //   component: resolve => require(['../components/page/BridgeTable.vue'], resolve)
        // },
        // {
        //   path: '/btable:fid-:btid',
        //   component: resolve => require(['../components/page/BridgeTable.vue'], resolve)
        // },
        // {
        //   path: '/rtable:fid-:sid-:tid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // },
        // {
        //   path: '/rtable:fid-:sid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // },
        // {
        //   path: '/rtable:fid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // },
        // {
        //   path: '/ctable:fid-:sid-:tid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // },
        // {
        //   path: '/ctable:fid-:sid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // },
        // {
        //   path: '/ctable:fid-:btid',
        //   component: resolve => require(['../components/page/ProblemTable.vue'], resolve)
        // }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
