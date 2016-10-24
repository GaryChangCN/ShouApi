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
        mapMutations
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
                            this.login({
                                login:true,
                                username:this.username,
                                password:this.password,
                                md5:res.data.md5,
                                studentName:res.data.name,
                                cookie:res.data.cookie
                            });
                            this.$router.go(-1);
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
            ...mapMutations({
                login:'LOGIN'
            })
        }
    }
</script>
