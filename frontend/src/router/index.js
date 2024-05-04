import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginForm.vue';
import Register from '@/components/RegisterForm.vue';
import ForgetPassword from '@/components/ForgetPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    props: true  // This allows the route parameters to be passed as props to the component
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router