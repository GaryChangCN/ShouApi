<template>
	<div id="app">
    <div class="process">
      <div class="process-go" v-show="!hide"  v-bind:style="{width:process}"></div>
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
  import {mapMutations,mapActions,mapState} from 'vuex';
    export default {
        name: 'app',
        data(){
          return {
            process:0,
            hide:false
          }
        },
        computed:{
          backShow:function(){
            if(this.$route.name=="index"){
              return false;
            }else{
              return true;
            }
          },
          ...mapState(['process','hide'])
        },
        methods:{
          ...mapMutations({
            logout:'LOGOUT'
          }),
          ...mapActions(['processBegin','processEnd']),
          back(){
            this.$router.go(-1);
          },
					logoutSure(){
						var _this=this;
						_this.$confirm("确定退出登陆？","提示",{
							type:"info"
						}).then(function(){
							 _this.logout();
						});
					}
        },
        mounted(){
        }
    }
</script>
