<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            isRouterAlive: true,
        };
    },
    components: {},
    provide() {
        return {
            reload: this.reload, //全局挂载
            demo:"haha"
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => { //组件渲染完成调用的一个函数
                this.isRouterAlive = true;
            });
        },
    },
};
</script>

<style>
</style>

