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
