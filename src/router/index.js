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
          component: resolve => require(['../components/page/OldInfo.vue'], resolve)
        },
        {
          path: '/otable:fid-:btid/info-:infoid',
          component: resolve => require(['../components/page/OldInfo.vue'], resolve)
        },
        // 统计-计划
        {
          path: '/StatisticsPlan:fid-:sid-:tid-:btid',
          component: resolve => require(['../components/page/StatisticsPlan.vue'], resolve)
        },
        {
          path: '/StatisticsPlan:fid-:sid-:btid',
          component: resolve => require(['../components/page/StatisticsPlan.vue'], resolve)
        },
        {
          path: '/StatisticsPlan:fid-:btid',
          component: resolve => require(['../components/page/StatisticsPlan.vue'], resolve)
        },
        // 统计-进度
        {
          path: '/StatisticsProgress:fid-:sid-:tid-:btid',
          component: resolve => require(['../components/page/StatisticsProgress.vue'], resolve)
        },
        {
          path: '/StatisticsProgress:fid-:sid-:btid',
          component: resolve => require(['../components/page/StatisticsProgress.vue'], resolve)
        },
        {
          path: '/StatisticsProgress:fid-:btid',
          component: resolve => require(['../components/page/StatisticsProgress.vue'], resolve)
        },
        // 统计-汇总
        {
          path: '/StatisticsSummary:fid-:sid-:tid-:btid',
          component: resolve => require(['../components/page/StatisticsSummary.vue'], resolve)
        },
        {
          path: '/StatisticsSummary:fid-:sid-:btid',
          component: resolve => require(['../components/page/StatisticsSummary.vue'], resolve)
        },
        {
          path: '/StatisticsSummary:fid-:btid',
          component: resolve => require(['../components/page/StatisticsSummary.vue'], resolve)
        },
        // 统计-历史进度表
        {
          path: '/HistoryProgress:fid-:sid-:tid-:btid',
          component: resolve => require(['../components/page/HistoryProgress.vue'], resolve)
        },
        {
          path: '/HistoryProgress:fid-:sid-:btid',
          component: resolve => require(['../components/page/HistoryProgress.vue'], resolve)
        },
        {
          path: '/HistoryProgress:fid-:btid',
          component: resolve => require(['../components/page/HistoryProgress.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
