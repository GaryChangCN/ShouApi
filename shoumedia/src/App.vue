<template>
	<div id="app">
    <div class="processBar" v-show="!processBar.hide">
      <div class="process-bg"></div>
      <div class="process-go"  v-bind:style="{width:processBar.process}"></div>
    </div>
		<div class="head">
			<i class="el-icon-arrow-left" v-show="backShow" @click="back"></i>
			<!--<i v-show="!backShow"></i>-->
			<i v-show="!backShow" @click="logoutSure" class="el-icon-close"></i>
			<h1>海大新媒体</h1>
			<i class="el-icon-share"></i>
		</div>
    <div id="test">
      <button @click="processBegin">start</button>
      <button @click="processEnd">end</button>
    </div>
		<div id="view">
			<transition>
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
    import {
        mapMutations,
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: 'app',
        data() {
            return {
                process: 0,
                hide: false
            }
        },
        computed: {
            backShow: function() {
                if (this.$route.name == "index") {
                    return false;
                } else {
                    return true;
                }
            },
            ...mapState({
                processBar: state => state.processBar
            })
        },
        methods: {
            ...mapMutations({
                logout: 'LOGOUT'
            }),
            ...mapActions(['processBegin', 'processEnd']),
            back() {
                this.$router.go(-1);
            },
            logoutSure() {
                var _this = this;
                _this.$confirm("确定退出登陆？", "提示", {
                    type: "info"
                }).then(function() {
                    _this.logout();
                });
            }
        },
        mounted() {
            var _this = this;
            this.$router.beforeEach(function(to, from, next) {
                _this.processBarBegin();
                next();
            });
            this.$router.afterEach(function() {
                _this.processBarEnd();
            });
        }
    }
</script>