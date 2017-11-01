import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Article from '../components/Article.vue'
import Success from '../components/Success.vue'
import Login from '../container/platform/system/user/Login.vue'
import Home from '../container/platform//Home.vue'
import Content from '../container/platform//Content.vue'

//用户管理
import AddUser from '../container/platform/system/user/AddUser.vue'
import User from '../container/platform/system/user/User.vue'
//日志管理
import Log from '../container/platform/system/log/Log.vue'
//食物管理
import Food from '../container/platform/goods/foods/Food.vue'
//import AddFood from '../container/platform/goods/foods/AddFood.vue'
//import EditFood from '../container/platform/goods/foods/EditFood.vue'

//分类管理
import FoodType from '../container/platform/goods/foodTypes/FoodType.vue'

Vue.use(Router)

// 编写路由集合
const routes = [{
		name: '',
		path: '/login',
		component: Login,
		 hidden: true

	},
	 {
        path: '/system',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',//图标样式class
        redirect: '/system/user',
        children: [
            { path: 'user', component: Content, name: '用户管理',redirect: '/system/user/list',
            	children:[
	            	{ path: 'list', component: User, name: '用户列表' },
            	] 
           },
           { path: 'log', component: Log, name: '日志管理'},
        ]
    },
      {
        path: '/goods',
        component: Home,
        name: '菜单管理',
        iconCls: 'fa fa-book',//图标样式class
        redirect: '/goods/foodType',
		children: [
            { path: 'food', component: Content, name: '食物管理',redirect: '/goods/food/list',
	            children: [
		            { path: 'list', component: Food, name: '食物列表' },
		            //{ path: 'addFood', component: AddFood, name:'新增食物' },
		            //{ path: 'editFood', component: EditFood, name:'修改食物' },
		        ]
	        },
            { path: 'foodType', component: Content, name: '分类管理',redirect: '/goods/foodType/list',
            	children: [
		            { path: 'list', component: FoodType, name: '分类列表' },
		        ]
            }
        ]
    },
	/*{
		name: 'Article',
		path: '/article',
		component: Home
	},
	{
		name: 'Success',
		path: '/success',
		component: Home
	}*/
]
// 导出路由集合
export default routes