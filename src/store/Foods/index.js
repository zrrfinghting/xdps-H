import actions from './actions';
import mutations from './mutations';
import getters from './getters';
//初始化状态
const state = {
	foodList: [],
	foodDataById: {},
}
export default {
    state,
    getters,
    actions,
    mutations
}