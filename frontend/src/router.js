import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/home-page.vue'
import issuePage from './views/issue-page.vue'
import issueDetails from './views/issue-details.vue'
import issueEdit from './views/issue-edit.vue'
import userProfile from './views/user-profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/issue',
      name: 'issue-page',
      component: issuePage
    },
    {
      path: '/issue/edit/',
      name: 'issue-add',
      component: issueEdit
    },
    {
      path: '/issue/edit/:issueId',
      name: 'issue-edit',
      component: issueEdit
    },
    {
      path: '/issue/:issueId',
      name: 'issue-details',
      component: issueDetails
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about-page.vue')
    }
  ]
})
