<template>
    <li>

        <a @click.prevent="selectCategory"
           :class="['item', {'is-active': active}]"
           href="#"
        >
            {{ category.name }}
            <span class="icon has-text-info menu-icon">
                <i v-if="hasChildren"
                   :class="['material-icons', {open}]"
                >keyboard_arrow_right</i>
            </span>
        </a>

        <transition name="fade">
            <ul v-if="hasChildren"
                v-show="open"
                class="wrap_list">
                <menu-item
                        v-for="child in category.children"
                        :category="child"
                        :key="child.id"
                        :depth="depth + 1"
                />
            </ul>
        </transition>

    </li>
</template>

<script>
    import {mapState} from 'vuex';
    import MenuItem from './MenuItem'

    export default {
        name: "MenuItem",
        props: {
            category: {
                type: Object,
                default: {},
            },
            depth: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                open: false,
            }
        },
        components: {
            MenuItem,
        },
        computed: {
            ...mapState({
                selected: state => state.selected,
            }),
            hasChildren() {
                return this.category.children && this.category.children.length;
            },
            icon() {
                return this.open ? 'keyboard_arrow_down' : 'keyboard_arrow_right';
            },
            active() {
                return this.category.id === this.selected;
            }
        },
        methods: {
            selectCategory() {
                this.toggle();
                this.synchronise();
            },
            toggle() {
                if (this.hasChildren) {
                    this.open = !this.open;
                } else {
                    this.$store.commit('selectCategory', {
                        id: this.category.id,
                    });
                }
            },
            synchronise() {
                if (this.depth > 1) {
                    window.React.setState({
                        categoryId: this.category.id,
                        vueAction: true,
                    });
                }
            },
        },
    }
</script>
