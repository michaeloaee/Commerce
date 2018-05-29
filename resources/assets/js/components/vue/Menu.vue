<template>

    <transition name="fade">
        <aside v-if="hasCategories" class="menu is-mobile left-menu">

            <!-- Mobile btn -->
            <i class="material-icons mobile-menu-btn"
               @click="toggleMobileMenu"
            >menu</i>

            <ul class="menu-list" :class="{hideMobileMenu}">
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
                hideMobileMenu: state => state.hideMobileMenu,
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
            synchroniseFromProduct(categoryId) {
                window.React.setState({
                    categoryId: categoryId,
                    vueAction: false,
                });
                this.$store.commit('selectCategory', {
                    id: categoryId,
                });
                this.openMenu(categoryId);
            },
            toggleMobileMenu() {
                this.$store.commit('toggleMobileMenu');
            },
        },
    }
</script>
