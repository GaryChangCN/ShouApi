<template>
	<div id="app">
		<div class="head">
			<i class="el-icon-arrow-left" v-show="backShow" @click="back"></i>
			<i v-show="!backShow"></i>
			<h1>海大新媒体</h1>
			<button @click="logout">logout</button>
			<i class="el-icon-share"></i>
		</div>
		<div id="view">
			<transition>
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
  import {mapMutations} from 'vuex';
    export default {
        name: 'app',
        data(){
          return {

          }
        },
        computed:{
          backShow:function(){
            if(this.$route.name=="index"){
              return false;
            }else{
              return true;
            }
          }
        },
        methods:{
          ...mapMutations({
            logout:'LOGOUT'
          }),
          back(){
            this.$router.go(-1);
          }
        },
        mounted(){
          var _this=this;
          console.log(_this.name);
        }
    }
</script>

<style lang="scss">
	* {
		font-family: "微软雅黑";
		padding: 0;
		margin: 0;
		border: 0;
	}
	
	.el-button {
		color: #8492A6;
	}
	
	#app {
		.head {
			width: 10rem;
			height: 1.2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #58B7FF;
			color: #fff;
			position: fixed;
			top: 0;
			h1 {
				font-size: 0.5rem;
				font-weight: 100;
			}
			i {
				font-size: 0.5rem;
				width: 0.6rem;
				padding: {
					left: 0.2rem;
					right: 0.2rem;
				}
			}
		}
		#view {
			margin-top: 1.2rem;
		}
	}
</style>