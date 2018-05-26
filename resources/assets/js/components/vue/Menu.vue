<template>
    <ul class="wrap_list">
        <li @click="click">Category 1</li>
    </ul>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                categoryId: 1,
            }
        },
        created() {
        },
        methods: {
            categorySynchronise() {
                window.React.setState({
                    categoryId: this.categoryId,
                    remote: true,
                });
            },
            click() {
                this.categorySynchronise();
            }
        }
    }
</script>
