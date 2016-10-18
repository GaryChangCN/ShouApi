<template>
    <div id="login">
        <div class="title">login </div>
        <el-input placeholder="请输入学号" v-model.trim="username">
            <template slot="prepend">帐号</template>
</el-input>
<el-input placeholder="请输入密码" v-model.trim="password">
    <template slot="prepend">密码</template>
</el-input>
<el-button>登录</el-button>
</div>
</template>
<script>
    export default {
        name: "component_name",
        data() {
            return {
                username: '',
                password: ''
            };
        }
    }
</script>
<style lang="scss">
    #login {
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-input {
            width: 8rem;
            margin-bottom: 0.5rem;
        }
        .title {
            color: #58b7ff;
            font-size: 1.5rem;
            margin: {
                top: 2rem;
                bottom: 1rem;
            }
        }
        button {
            color: #8492A6;
        }
    }
</style>