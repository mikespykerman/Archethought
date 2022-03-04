const routes = [
  {
    path: '/',
    component: () => import('layouts/Landing.vue'),
    children: [
      { name: 'Landing', path: '', component: () => import('pages/Landing/Index.vue') },
      {
        name: 'Register',
        path: '/register',
        component: () => import('pages/Authentication/Register.vue'),
      },
      { name: 'SignIn', path: '/signin', component: () => import('pages/Authentication/SignIn.vue') },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    name: 'AppIndex',
    meta: {
      requireAuth: true,
    },
    redirect: '/app/home',
    children: [
      { name: 'AppHome', path: 'home', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/administration',
    component: () => import('layouts/AdministrationLayout.vue'),
    redirect: '/administration/branches',
    children: [
      { name: 'Branches', path: 'branches', component: () => import('pages/Administration/Branches/Index.vue') },
      { name: 'Curriculum', path: 'curriculum', component: () => import('pages/Administration/Curriculum/Index.vue') },
      { name: 'Devices', path: 'devices', component: () => import('pages/Administration/Devices/Index.vue') },
      { name: 'Users', path: 'users', component: () => import('pages/Administration/Users/Index.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
