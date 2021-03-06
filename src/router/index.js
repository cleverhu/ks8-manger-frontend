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
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/workloads',
    component: Layout,
    name: 'Example',
    meta: {title: '工作负载', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'deployments',
        name: 'deployments',
        component: () => import('@/views/workloads/deployment'),
        meta: {title: 'deployments列表', icon: 'table'}
      }, {
        path: 'pods',
        name: 'pods',
        component: () => import('@/views/workloads/pods'),
        meta: {title: 'pods列表', icon: 'table'}
      },]
  },
  {
    path: '/ingresses',
    component: Layout,
    name: 'Example',
    meta: {title: 'ingress管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'ingresslist',
        name: 'ingresslist',
        component: () => import('@/views/ingresses/ingress'),
        meta: {title: 'ingress列表', icon: 'table'}
      },
      {
        path: 'createingress',
        name: 'createingress',
        component: () => import('@/views/ingresses/ingress-create'),
        meta: {title: '创建ingress', icon: 'table'}
      }]
  },
  {
    path: '/resources',
    component: Layout,
    name: 'Example',
    meta: {title: '资源管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'secretlist',
        name: 'secretlist',
        component: () => import('@/views/resources/secret'),
        meta: {title: '密文列表', icon: 'table'}
      },
      {
        path: 'createsecret',
        name: 'createsecret',
        component: () => import('@/views/resources/secret-create'),
        meta: {title: '创建密文', icon: 'table'}
      },
      {
        path: 'configlist',
        name: 'configlist',
        component: () => import('@/views/resources/secret'),
        meta: {title: '配置列表', icon: 'table'}
      }]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
