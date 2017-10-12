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
import ProductPage from '@/pages/ProductPage'
import NewsPage from '@/pages/NewsPage'

Vue.use(Router)
// main.js引入了VueRouter，所有的页面路由都写到router/index.js这个文件里
// 在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage,
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
      path: '/products',
      component: ProductPage
    },
    {
      path: '/news',
      component: NewsPage
    }
  ]
})
