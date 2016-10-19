<template>
  <div class="hello">
      <router-link :to="{path:'picker'}">
          <el-button type="success" >成功按钮</el-button>
      </router-link>
  </div>
</template>

<script>
    export default {
        name: 'hello',
        methods: {
            click: function() {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>