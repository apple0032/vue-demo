import Vue from 'vue'
import VueRouter from 'vue-router'
// import _ from 'lodash'

Vue.use(VueRouter)

function loadView(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: loadView('Login'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: loadView('ForgetPassword'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: loadView('Register'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/register-success',
    name: 'RegisterSuccess',
    component: loadView('RegisterSuccess'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: loadView('ResetPassword'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/ui',
    name: 'UI',
    component: loadView('UI'),
    meta: {
      auth: false
    }
  },
  {
    path: '/',
    redirect: '/trainings',
    name: 'BaseFrame',
    component: loadView('BaseFrame'),
    meta: {
      auth: true,
      title: "All Trainings",
    },
    children: [{
        path: '/users',
        name: "users",
        component: loadView('UserList'),
        meta: {
          auth: true
        }
      },

      /**************************************/
      // version 2 - view & update a user
        {
          path: '/user/view/:id(\\d+)',
          name: "userView",
          component: loadView('UserView'),
          meta: {
            auth: true
          }
        },
      // Pending Page
        {
          path: '/users-pending',
          name: "usersPending",
          component: loadView('UserPending'),
          meta: {
            auth: true
          }
        },
        {
          path: '/record/create',
          name: "create-record",
          component: loadView('RecordCreateEdit'),
          meta: {
            auth: true,
          }
        },
        {
          path: '/record/:id',
          name: "view-record",
          component: loadView('RecordView'),
          meta: {
            auth: true,
          }
        },
        {
          path: '/record/edit/:id',
          name: "edit-record",
          component: loadView('RecordCreateEdit'),
          meta: {
            auth: true,
          }
        },
      /**************************************/

      {
        path: '/user/profile/:id(\\d+)',
        name: "userProfile",
        component: loadView('UserDetails'),
        meta: {
          auth: true
        }
      },
      {
        path: '/user/:id(\\d+)',
        name: "userDetails",
        component: loadView('UserDetails'),
        meta: {
          auth: true
        }
      },
      {
        path: '/user/create',
        name: "create-user",
        component: loadView('UserCreate'),
        meta: {
          auth: true
        }
      },
      {
        path: '/trainings',
        name: "trainings",
        component: loadView('TrainingList'),
        meta: {
          auth: true,
          title: "All Trainings",
        }
      },
      {
        path: '/training/:id(\\d+)',
        name: "training-detail",
        component: loadView('TrainingDetails'),
        meta: {
          auth: true,
        }
      },
      {
        path: '/training/create',
        name: "create-training",
        component: loadView('CreateEditTraining'),
        meta: {
          auth: true,
        }
      },
      {
        path: '/training/edit/:id(\\d+)',
        name: "edit-training",
        component: loadView('CreateEditTraining'),
        meta: {
          auth: true,
        }
      },
      {
        path: '/dashboard',
        name: "dashboard",
        component: loadView('Dashboard'),
        meta: {
          auth: true,
        }
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Vue.router.beforeEach((to, from, next) => {
//   if(_.has(to.query, "logout") && to.query.logout === "yes"){
//     Vue.auth.logout()
//   }
//   next()
// })

export default Vue.router;