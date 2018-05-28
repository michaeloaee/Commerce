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
            this.$store.dispatch('asyncGetCategories');
        },
    }
</script>
