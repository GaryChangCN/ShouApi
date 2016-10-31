<template>
	<div id="index">
		<div class="info">
			<div class="canvas"></div>
			<div class="student">{{studentName}}</div>
		</div>
		<Function></Function>
		<div class="cover" v-show="!login">
			<router-link :to="{name:'login'}">
				<el-button>请先登录</el-button>
			</router-link>
		</div>
	</div>
</template>
<script>
    import blockies from '../lib/blockies';
    import Function from './Function'
    import {
        mapState,
        mapActions
    }
    from 'vuex';
    export default {
        name: "index",
        data() {
            return {
                studentName:''
            };
        },
        mounted: function() {
            var _this = this;
            this.local();
            if (!this.login) {}
            var icon = blockies.create({
                seed: _this.md5 ? _this.studentName + _this.md5 : '',
                color: '#fff',
                bgcolor: '#58B7FF',
                size: 10,
                scale: '7'
            });
            this.$el.querySelector(".canvas").appendChild(icon);
        },
        computed: mapState(['login', 'md5', 'studentName']),
        methods: {
            ...mapActions({
                local: 'loginFromLocal'
            })
        },
        components:{
            Function
        }
    };
</script>
<style lang="less" scoped>
	#index {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.info {
			width: 10rem;
			background-color: #58B7FF;
			height: 4rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			min-height: 140px;
			.canvas {
				margin-top: 1rem;
			}
			.student {
				font-size: 0.4rem;
				letter-spacing: 0.05rem;
				align-self: flex-end;
				color: #ffffff;
				padding-right: 0.2rem;
				padding-bottom: 0.1rem;
			}
		}
		.cover {
			width: 10rem;
			height: 100vh;
			position: fixed;
			top: 0;
			opacity: 0.8;
			background-color: #475669;
			z-index: 100;
			display: flex;
			justify-content: center;
			align-items: center;
			button {
				border-color: #fff;
				color: #fff;
				opacity: 1;
				background-color: transparent;
			}
		}
	}
</style>