<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>
        <div id="view">
            <transition>
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style>
    html {
        font-family: "微软雅黑";
    }
    
    * {
        padding: 0px;
        margin: 0px;
        border: 0px;
    }
    
    .__cov-progress {
        position: fixed;
        top: 0;
    }
    
</style>