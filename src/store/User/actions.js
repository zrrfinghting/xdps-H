import {USERLIST,USERINFO} from './types'
import {get,post,del} from '../../api/api'

export default{
	//登录
	requestLogin({commit},params){
		return new Promise((resolve, reject) => {
			post('user/login',params)
	        .then(res => {
	            resolve(res);
	        })
	    });
	},
		//获取所有用户
	getUserList({commit},params){
		return new Promise((resolve, reject) => {
			get('user/getByPage',params)
	        .then(res => {
	        	commit(USERLIST, res)
	            resolve(res);
	        })
	    });
	},
	
	//获取用户信息
	getUser({commit},params){
		return new Promise((resolve, reject) => {
			get('user/getUserById',params)
	        .then(res => {
	        	commit(USERINFO, res)
	            resolve(res);
	        })
	    });
	},
}
