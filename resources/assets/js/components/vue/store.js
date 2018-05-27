import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        categories: [],
        selected: null,
    },
    actions: {

        asyncGetCategories({commit}) {
            axios.get(
                '/api/categories/'
            ).then((data) => {
                try {
                    commit('saveCategories', {
                        categories: data.data,
                    });
                } catch (e) {
                    console.log(data);
                }
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    mutations: {

        saveCategories(state, payload) {
            state.categories = payload.categories;
        },

        selectCategory(state, payload) {
            state.selected = payload.id;
        },

    },
});
