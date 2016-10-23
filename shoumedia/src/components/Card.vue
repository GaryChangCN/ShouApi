<template>
	<div id='card'>
		<el-tabs>
			<el-tab-pane label="当前余额">
				<button @click="test">click</button>
			</el-tab-pane>
			<el-tab-pane label="消费记录">
				me
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import {mapState} from 'vuex';
export default {
  name: "card",
  data () {
    return {
    };
  },
	mounted(){
	},
	computed: mapState(['md5','username']),
	methods:{
		test(){
			var _this=this;
			this.$http.get("http://192.168.1.188/api/"+_this.username+"/getcard/getbalance").then(function(res){
				 console.log(res);
			})
		}
	}
}
</script>
<style lang="scss">
	#card {
		.el-tabs__header>.el-tabs__item {
			width: 5rem;
			text-align: center;
		}
		.el-tabs__active-bar {
			width: 5rem;
		}
	}
</style>