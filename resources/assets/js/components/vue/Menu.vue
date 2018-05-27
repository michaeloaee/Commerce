<template>

    <transition name="fade">
        <ul v-if="hasCategories" class="wrap_list">
            <menu-item
                    v-for="category in categories"
                    :category="category"
                    :key="category.id"
                    :depth="1"
            />
        </ul>
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
