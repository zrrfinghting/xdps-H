import {get,post, del} from '../../api/api'
import {ADDFOOD, GETBYPAGE, REMOVEFOOD, GETBYID,BATCHREMOVEFOOD} from './mutation_types'
export default{
	addFood({commit},params){
		return new Promise((resolve, reject) => {
			post('food/addFood',params)
	        .then(res => {
	            resolve(res);
	        })
	   });
	},
	editFood({commit},params) {
		return new Promise((resolve, reject) => {
			post('food/editFood',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	getByPage({commit},params) {
		
		return new Promise((resolve, reject) => {
			get('food/getByPage',params)
	        .then(res => {
	        	commit(GETBYPAGE, res);
	            resolve(res);
	        })
	    });
	},
	
	removeBook({commit},params) {
		return new Promise((resolve, reject) => {
			del('food/deleteByIds',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
	
	getById({commit},params) {
		return new Promise((resolve, reject) => {
			get('food/getFoodById',params)
	        .then(res => {
	        	commit(GETBYID, res);
	            resolve(res);
	        })
	    });
	},
	
	getByCategoryIdAndKeyword({commit},params) {
		return new Promise((resolve, reject) => {
			get('food/getByCategoryIdAndKeyword',params)
	        .then(res => {
	        	commit(GETBYPAGE, res);
	            resolve(res);
	        })
	    });
	},
	/*changeState({commit},params) {
		return new Promise((resolve, reject) => {
			post('food/changeState',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	}*/
}
