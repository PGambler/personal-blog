/**
 * 页面路由的统一管理
 * 该路由器为避免手动配置系统路由与菜单管理，将系统菜单与路由页面进行了映射
 * 此时你需指定所需路由文件所在目录，并为你的菜单组件添加title字段以用于显示，
 * 系统将自动完成菜单与路由页面间的映射并返回一个路由器
 * 该路由器包含两个参数：
 * routerList  menuList
 * 结构：
 * routerList  [{path: .., name: .., component: ..}, ...]
 * menuList  [{path: .., name: .., title: .., ?submenu: [...]}, ...]
 * 在你拿到路由器后，你可通过router.options.menuList获取菜单，最后进行你的路由配置
 * @author hentai 2019-09-06
 * @version 1.0
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Home from "@/components/Home";
// import BlogList from "@/components/blog/BlogList";
// import EssayPanel from "@/components/EssayPanel";
// import Setting from "@/components/Setting";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/",
    component: resolve => require(["@/components/Home"], resolve),
    children: [{
      path: "/",
      name: "blog",
      component: resolve => require(["@/components/blog/BlogList"], resolve)
    }, {
      path: "/essay/:blog",
      name: "essay",
      component: resolve => require(["@/components/EssayPanel"], resolve)
    }]
  },
  {
    path: "*",
    name: "404",
    component: resolve => require(["@/components/404"], resolve)
  },
  {
    path: "/setting",
    name: "setting",
    component: resolve => require(["@/components/Setting"], resolve)
  }
  ]
})
