<template>
    <div id="app">
        <hello></hello>
        <p>{{count}}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
    </div>
</template>
<script>
    import Hello from './components/Hello';
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
    export default {
        components:{
            Hello
        },
        computed:{
            ...mapState(['count'])
        },
//        computed:mapState(['count']),
        // computed:mapGetters({
        //     count:'doCount'
        // }),
        // computed:{
        //     ...mapGetters({
        //         count:'doCount'
        //     })
        // },
        methods:{
            ...mapMutations(['decrement']),
            ...mapActions({
                increment:'doIncrement'
            })
        }
    }
</script>
<style>
    html {
        height: 100%;
    }
    
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    #app {
        color: #2c3e50;
        margin-top: -100px;
        max-width: 600px;
        font-family: Source Sans Pro, Helvetica, sans-serif;
        text-align: center;
    }
    
    #app a {
        color: #42b983;
        text-decoration: none;
    }
    
    .logo {
        width: 100px;
        height: 100px
    }
</style>