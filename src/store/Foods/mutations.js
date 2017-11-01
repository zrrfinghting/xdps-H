import {GETBYPAGE, GETBYID} from './mutation_types'
	  
export default {
		[GETBYPAGE](state,data) {
			state.foodList = data;
		},
		[GETBYID](state, data) {
			state.foodDataById = data;	
		}
}
