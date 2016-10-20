<template>
	<div id="app">
		<div id="view">
			<transition>
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'app'
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
	/*.el-message-box {
		width: 8rem;
		background-color: transparent;
	}
	
	.el-message-box>div {
		text-align: center !important;
	}*/
</style>