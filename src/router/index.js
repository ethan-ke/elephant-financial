import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/performance',
    component: Layout,
    redirect: '/performance/index',
    name: 'Performance',
    meta: { title: '绩效管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'PerformanceIndex',
        component: () => import('@/views/performance/index'),
        meta: { title: '绩效列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'PerformanceCreate',
        component: () => import('@/views/performance/create'),
        meta: { title: '添加绩效', icon: 'form' }
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/index',
    name: 'Staff',
    meta: { title: '员工管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/staff/index'),
        meta: { title: '员工列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/staff/create'),
        meta: { title: '添加员工', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'StaffEdit',
        component: () => import('@/views/staff/edit'),
        meta: { title: '编辑员工' },
        hidden: true
      }
    ]
  },
  {
    path: '/district',
    component: Layout,
    redirect: '/district/index',
    name: 'District',
    meta: { title: '地区管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'DistrictIndex',
        component: () => import('@/views/district/index'),
        meta: { title: '地区列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'DistrictCreate',
        component: () => import('@/views/district/create'),
        meta: { title: '添加地区', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'DistrictEdit',
        component: () => import('@/views/district/edit'),
        meta: { title: '编辑地区' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
