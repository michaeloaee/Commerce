<template>

    <transition name="fade">
        <aside v-if="hasCategories" class="menu left-menu">
            <ul class="menu-list">
                <menu-item
                        v-for="category in categories"
                        :category="category"
                        :key="category.id"
                        :depth="1"
                />
            </ul>
        </aside>
    </transition>

</template>

<script>
    import {mapState} from 'vuex';
    import MenuItem from './MenuItem'

    export default {
        name: "Menu",
        components: {
            MenuItem,
        },
        computed: {
            ...mapState({
                categories: state => state.categories,
            }),
            hasCategories() {
                return this.categories.length;
            }
        },
        created() {
            this.$store.dispatch('asyncGetCategories').then(() => {
                if (/\/category/.test(window.location.pathname)) {
                    const categoryId = Number(window.location.pathname.split('/').pop());
                    this.selectCategory(categoryId);
                    this.openMenu(categoryId);
                }
            });
        },
        methods: {
            selectCategory(categoryId) {
                this.$store.commit('selectCategory', {
                    id: categoryId,
                });
            },
            openMenu(categoryId) {
                this.$store.commit('toggleMenu', {
                    id: categoryId,
                });
            },
            synchroniseFromProduct() {
                const categoryId = Number(window.location.pathname.split('/').pop());
                window.React.setState({
                    categoryId: categoryId,
                    vueAction: false,
                });
                this.$store.commit('selectCategory', {
                    id: categoryId,
                });
                this.openMenu(categoryId);
            }
        },
    }
</script>
