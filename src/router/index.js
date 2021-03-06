import Vue from 'vue'
import Router from 'vue-router'
import store, {types} from '../store'

import ResourceIndex from '../components/ResourceIndex'
import ResourceEdit from '../components/ResourceEdit'
import ResourceShow from '../components/ResourceShow'
import ResourceStat from '../components/ResourceStat'
import CustomForm from '../components/CustomForm'
import CustomPage from '../components/CustomPage'
import Login from '../components/Login'
import Layout from '../components/Layout'
import Home from '../components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/rest/:resource/stat',
          name: 'stat',
          component: ResourceStat
        },
        {
          path: '/rest/:resource',
          name: 'index',
          component: ResourceIndex
        },
        {
          path: '/rest/:resource/create',
          name: 'create',
          component: ResourceEdit
        },
        {
          path: '/rest/:resource/:id/edit',
          name: 'edit',
          component: ResourceEdit
        },
        
        {
          path: '/rest/:resource/:id',
          name: 'show',
          component: ResourceShow
        },
        {
          path: '/form',
          name: 'form',
          component: CustomForm
        },
        {
          path: '/page',
          name: 'page',
          component: CustomPage
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.token && !to.meta.isPublic) {
    console.log('no token', store.state.auth);
    return next({name: 'login'})
  }
  next()
})

export default router