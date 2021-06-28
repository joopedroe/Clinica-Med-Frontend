import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/index.vue';
import Login from '../views/login/index.vue';
import { logged } from '../sevices/user/logged';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        name: 'Calendar',
        path: '',
        component: () => import('../components/calendar.vue'),
      },
      {
        name: 'Attendance',
        path: 'attendance',
        component: () => import('../components/add_attendance.vue'),
      },
      {
        name: 'Edit_attendance',
        path: 'attendance/edit/:id',
        component: () => import('../components/edit_attendance.vue'),
      },
      {
        name: 'Patient',
        path: 'new/patient',
        component: () => import('../components/add_patient.vue'),
      },
      {
        name: 'New_employee',
        path: 'employee/new',
        component: () => import('../components/add_employee.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  if (to.name !== 'Login' && !logged()) next({ name: 'Login' });
  else next();
});
export default router;
