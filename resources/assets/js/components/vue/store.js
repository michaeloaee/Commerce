import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        categories: [],
        selected: null,
        lftList: [],
        rgtList: [],
    },
    actions: {

        asyncGetCategories({commit}) {
            return new Promise((resolve) => {
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
                    resolve();
                }).catch((error) => {
                    console.log(error);
                });
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

        resetMenu(state) {
            state.lftList = [];
            state.rgtList = [];
        },

        toggleMenu(state, payload) {
            let rootLft,
                rootRgt,
                childLft,
                childRgt;
            const iterate = (items, depth = 0) => {
                items.map((item) => {
                    if (item.id === payload.id) {
                        childLft = item.lft;
                        childRgt = item.rgt;
                        throw true;
                    }
                    if (!depth) {
                        rootLft = item.lft;
                        rootRgt = item.rgt;
                    }
                    if (item.children.length) {
                        iterate(item.children, depth + 1);
                    }
                });
            };
            try {
                iterate(state.categories);
            } catch (e) {
                state.lftList = [rootLft, childLft];
                state.rgtList = [rootRgt, childRgt];
            }
        },

    },
});
