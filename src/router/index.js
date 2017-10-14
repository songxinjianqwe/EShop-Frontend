import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import RegisterPage from '@/pages/RegisterPage'
import RegisterForm from '@/components/RegisterForm'
import Activation from '@/components/Activation'
import RegisterValidation from '@/components/RegisterValidation'
import ForgetPasswordPage from '@/pages/ForgetPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import LoginPage from '@/pages/LoginPage'
import CategoryPage from '@/pages/CategoryPage'
import CategoryInfoPage from '@/pages/CategoryInfoPage'
import ProductInfoPage from '@/pages/ProductInfoPage'
import NewsPage from '@/pages/NewsPage'
import NewsInfoPage from '@/pages/NewsInfoPage'
import UserPage from '@/pages/UserPage'
import MailPage from '@/pages/MailPage'
import PayPage from '@/pages/PayPage'

Vue.use(Router)
// main.js引入了VueRouter，所有的页面路由都写到router/index.js这个文件里
// 在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/users/:id',
      component: UserPage
    },
    {
      path: '/users/:id/mails',
      component: MailPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage,
      // chilren意味着一定会有<router-view>
      children: [
        {
          path: 'form',
          component: RegisterForm
        },
        {
          path: 'activate/:id',
          component: Activation
        },
        {
          path: 'validate/:activationId/:activationCode',
          component: RegisterValidation
        }
      ]
    },
    {
      path: '/forget_password',
      component: ForgetPasswordPage
    },
    {
      path: '/reset_password/:validationId/:validationCode',
      component: ResetPasswordPage
    },
    {
      path: '/categories',
      component: CategoryPage
    },
    {
      path: '/categories/:id',
      component: CategoryInfoPage
    },
    {
      path: '/products/:id',
      component: ProductInfoPage
    },
    {
      path: '/news',
      component: NewsPage
    },
    {
      path: '/news/:id',
      component: NewsInfoPage
    },
    {
      path: '/pay',
      component: PayPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
// 处理需要登录才能访问的页面
router.beforeEach((to, from, next) => {
  // 如果需要验证登录状态
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果没有登录
    if (localStorage.getItem('loginResult') === null) {
      next({
        path: '/login',
        // to.fullPath表示把当前路由信息传递过去方便登录后跳转回
        query: { redirect: to.fullPath }
      })
    } else {
      // 如果登录，那么放行
      next()
    }
  } else {
    // 如果不需要验证，那么放行
    next()
  }
})
export default router
