import {get, post, del} from '../../api/api'
import {GETTREE, GETBYID,FOODTYPELIST} from './mutation_types'
export default {
	//获取分类树
	getFoodTypeTree({commit},params) {
		return new Promise((resolve, reject) => {
			get('category/getTrees',params)
	        .then(res => {
	        	commit(GETTREE, res);
	            resolve(res);
	        })
	    });
	},
	//获取分类列表
	getFoodType({commit},params) {
		return new Promise((resolve, reject) => {
			get('category/getTrees',params)
	        .then(res => {
	        	commit(GETTREE, res);
	            resolve(res);
	        })
	    });
	},
	//通过typeId获取
	getFoodTypeById({commit},params) {
		return new Promise((resolve, reject) => {
			get('category/getCategoryById',params)
	        .then(res => {
	        	commit(GETBYID, res);
	            resolve(res);
	        })
	    });
	},
	//通过id删除
	deleteFoodTypeById({commit},params) {
		console.log(params)
		return new Promise((resolve, reject) => {
			del('category/deleteById',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//修改分类
	editFoodType({commit},params) {
		return new Promise((resolve, reject) => {
			post('category/editCategory',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	//新增分类
	addFoodType({commit},params) {
		console.log(params)
		return new Promise((resolve, reject) => {
			post('category/addCategory?level='+params.level,params.foodType)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
}
