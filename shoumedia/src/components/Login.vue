<template>
	<div id="login">
		<div class="title">login </div>
		<el-input placeholder="请输入学号" v-model.trim="username">
			<template slot="prepend">帐号</template>
		</el-input>
		<el-input placeholder="请输入密码" v-model.trim="password">
			<template slot="prepend">密码</template>
		</el-input>
		<div>
			<el-button @click.native="login">
				登录
			</el-button>
		</div>
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
        },
        methods: {
            login: function() {
                var f=new FormData();
                f.append('username','1357227');
                f.append('password','087452');
                this.$http.post('http://192.168.1.188/api/login',f).then(function(res){
                   console.log(res.ok);
                   this.$message({
                       message:'登录成功',
                       type:'success'
                   })
                })
            }
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