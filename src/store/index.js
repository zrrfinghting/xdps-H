import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import user from './User';
import log from './Log';
import foodTypes from './FoodTypes'
import foods from './Foods'

export default new Vuex.Store({
    modules: {
        user,
        log,
        foodTypes,
        foods,
    }
});