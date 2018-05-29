<template>
    <li>

        <a @click.prevent="selectCategory"
           :class="['item', {'is-active': active}]"
           href="#"
        >
            {{ category.name }}
            <span class="icon has-text-info menu-icon">
                <i v-if="hasChildren"
                   :class="['material-icons', {open: open || opened}]"
                >keyboard_arrow_right</i>
            </span>
        </a>

        <transition name="fade">
            <ul v-if="hasChildren"
                v-show="open || opened"
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
                lft: [],
                rgt: [],
            }
        },
        components: {
            MenuItem,
        },
        computed: {
            ...mapState({
                selected: state => state.selected,
                lftList: state => state.lftList,
                rgtList: state => state.rgtList,
            }),
            hasChildren() {
                return this.category.children && this.category.children.length;
            },
            active() {
                return this.category.id === this.selected;
            },
            // Открываем меню при заходе на страницу
            opened() {
                if (this.lft.length || this.rgt.length) {
                    this.open = this.category.rgt <= this.rgt[0] &&
                        this.category.rgt >= this.rgt[1] &&
                        this.category.lft >= this.lft[0] &&
                        this.category.lft <= this.lft[1];
                }
            },
        },
        watch: {
            // Временно сохраняем Lft в текущем scope, чтобы при клике не схлопнуть меню
            lftList() {
                if (this.lftList.length) {
                    this.lft = this.lftList;
                }
            },
            // Временно сохраняем Rgt в текущем scope, чтобы при клике не схлопнуть меню
            rgtList() {
                if (this.rgtList.length) {
                    this.rgt = this.rgtList;
                }
            },
        },
        methods: {
            selectCategory() {
                this.toggle();
                this.synchroniseCategory();
            },
            resetBranch() {
                this.lft = [];
                this.rgt = [];
                this.$store.commit('resetMenu');
            },
            toggle() {
                // При клике сбрасываем branch, т.к. хранить состояние больше не нужно
                if (this.lft.length || this.rgt.length) {
                    this.resetBranch();
                }
                if (this.hasChildren) {
                    this.open = !this.open;
                } else {
                    this.$store.commit('selectCategory', {
                        id: this.category.id,
                    });
                    this.$store.commit('toggleMobileMenu');
                }
            },
            synchroniseCategory() {
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
