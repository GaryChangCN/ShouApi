<template>
	<div id="login">
		<div class="title">login </div>
		<el-input placeholder="请输入学号" v-model.trim="username">
			<template slot="prepend">帐号</template>
		</el-input>
		<el-input placeholder="请输入密码" v-model.trim="password" type="password">
			<template slot="prepend">密码</template>
		</el-input>
		<div>
			<el-button @click.native="submit">
				登录
			</el-button>
		</div>
	</div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: "component_name",
        data() {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            submit: function() {
                var f = new FormData();
                f.append('username', this.username);
                f.append('password', this.password);
                this.$http.post('http://192.168.1.188/api/login', f).then(function(res) {
                    if (res.ok) {
                        if (!res.data.err) {
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                showClose:"true"
                            });
                            this.login();
                        }else{
                            this.$message({
                                message:'登录失败',
                                type:"error",
                                showClose:"true"
                            })
                        }
                    }
                })
            },
            ...mapActions([
                'login'
            ])
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