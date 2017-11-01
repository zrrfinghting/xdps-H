import {GETTREE, GETBYID,FOODTYPELIST} from './mutation_types'
	  
export default {
		[GETTREE](state,data) {
			state.foodTypeTree = data;
		},
		[GETBYID](state,data) {
			state.foodTypeById = data;
		},
		[FOODTYPELIST](state,data) {
			state.foodTypeList = data;
		}
}
