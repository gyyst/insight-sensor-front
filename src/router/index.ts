import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/manage/index.vue")
const OjLayout = () => import("@/layout/basic/index.vue")
/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/register",
    component: () => import("@/views/login/register.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true,
          hidden: true
        }
      }
    ]
  },
  {
    path: "/sensor",
    component: Layout,
    redirect: "/sensor/laser",
    name: "Sensor",
    meta: {
      title: "传感器管理",
      elIcon: "Monitor",
      alwaysShow: true
    },
    children: [
      {
        path: "laser",
        component: () => import("@/views/sensor/laser/index.vue"),
        name: "LaserSensor",
        meta: {
          title: "激光传感器管理"
        }
      },
      {
        path: "vision",
        component: () => import("@/views/sensor/vision/index.vue"),
        name: "VisionSensor",
        meta: {
          title: "视觉传感器管理"
        }
      }
    ]
  },
  {
    path: "/manufacturer",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/manufacturer/index.vue"),
        name: "Manufacturer",
        meta: {
          title: "厂商管理",
          elIcon: "OfficeBuilding"
        }
      }
    ]
  },
  {
    path: "/recommendation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/recommendation/index.vue"),
        name: "Recommendation",
        meta: {
          title: "推荐系统",
          elIcon: "Star"
        }
      }
    ]
  },

  {
    path: "/oj",
    redirect: "/oj/home",
    component: OjLayout,
    name: "OJ平台",
    meta: {
      title: "OJ平台",
      elIcon: "Memo"
      // alwaysShow: true
    },
    children: [
      {
        path: "/oj",
        component: () => import("@/views/oj/index.vue"),
        name: "oj",
        meta: {
          title: "跳转oj"
        }
      },
      {
        path: "/oj/home",
        component: () => import("@/views/oj/question/QuestionsView.vue")
      },
      {
        path: "/oj/q",
        component: () => import("@/views/oj/question/index.vue")
      },
      {
        path: "/oj/add/question",
        component: () => import("@/views/oj/question/AddQuestionView.vue")
      },
      {
        path: "/oj/manage/question",
        component: () => import("@/views/oj/question/ManageQuestionView.vue")
      },
      {
        path: "/oj/update/question",
        name: "更新题目",
        component: () => import("@/views/oj/question/AddQuestionView.vue")
      },
      {
        path: "/oj/view/question",
        name: "做题",
        component: () => import("@/views/oj/question/ViewQuestionView.vue")
      }
    ]
  },
  {
    path: "/BI",
    component: Layout,
    redirect: "/BI/data",
    name: "BI",
    meta: {
      title: "智能BI",
      elIcon: "Histogram"
      // alwaysShow: true
    },
    children: [
      {
        path: "data",
        component: () => import("@/views/bi/analysis/index.vue"),
        name: "dataAnalysis",
        meta: {
          title: "数据分析"
        }
      },
      {
        path: "data_async",
        component: () => import("@/views/bi/analysis_async/index.vue"),
        name: "dataAnalysis_async",
        meta: {
          title: "数据分析(异步)"
        }
      },
      {
        path: "form",
        component: () => import("@/views/bi/form/index.vue"),
        name: "dataForm",
        meta: {
          title: "历史记录"
        }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/data",
    name: "user",
    meta: {
      title: "用户中心",
      elIcon: "UserFilled"
      // alwaysShow: true
    },
    children: [
      {
        path: "data",
        component: () => import("@/views/userCenter/admin/index.vue"),
        name: "userCenter",
        meta: {
          roles: ["admin"], // 或者在子导航中设置角色
          title: "用户中心"
        }
      },
      {
        path: "info",
        component: () => import("@/views/userCenter/user/index.vue"),
        name: "userInfo",
        meta: {
          title: "个人中心"
        }
      }
    ]
  },
  {
    path: "/api",
    component: Layout,
    redirect: "/api/square",
    name: "api",
    meta: {
      title: "api广场",
      elIcon: "SwitchFilled"
      // alwaysShow: true
    },
    children: [
      {
        path: "square",
        component: () => import("@/views/api/api_square/index.vue"),
        name: "square",
        meta: {
          title: "api广场"
        }
      },
      {
        path: "upload",
        component: () => import("@/views/api/upload/index.vue"),
        name: "upload",
        meta: {
          title: "上传api"
        }
      },
      {
        path: "detail/:apiId",
        component: () => import("@/views/api/api_square/detail.vue"),
        name: "api_detail",
        meta: {
          title: "api详情",
          hidden: true
        }
      }
      // {
      //   path: "info",
      //   component: () => import("@/views/userCenter/user/index.vue"),
      //   name: "userInfo",
      //   meta: {
      //     title: "个人中心"
      //   }
      // }
    ]
  },
  {
    path: "/hook-demo",
    component: Layout,
    redirect: "/hook-demo/use-fetch-select",
    name: "HookDemo",
    meta: {
      title: "hook 示例",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "use-fetch-select",
        component: () => import("@/views/hook-demo/use-fetch-select.vue"),
        name: "UseFetchSelect",
        meta: {
          title: "useFetchSelect"
        }
      },
      {
        path: "use-fullscreen-loading",
        component: () => import("@/views/hook-demo/use-fullscreen-loading.vue"),
        name: "UseFullscreenLoading",
        meta: {
          title: "useFullscreenLoading"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
