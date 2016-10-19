<template>
    <div id="index">
        <div class="info">
            <div class="canvas"></div>
            <router-link :to="{name:'login'}">login</router-link>
        </div>
    </div>
</template>
<script>
    import blockies from '../lib/blockies'

    export default {
        name: "index",
        data() {
            return {};
        },
        mounted: function() {
            var icon = blockies.create({
                seed: '',
                color: '#fff',
                bgcolor: '#58B7FF',
                size: 10,
                scale: '7'
            });
            this.$el.querySelector(".canvas").appendChild(icon);
        }
    }
</script>
<style>
    .info {
        width: 10rem;
        background-color: #58B7FF;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>