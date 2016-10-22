<template>
	<div id='function'>
		<div class="item" @click="card">
			<i class="iconfont">&#xe609;</i>
			<span>一卡通</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe60a;</i>
			<span>课程表</span>
		</div>
		<div class="item"><i class="iconfont">&#xe60c;</i>

			<span>成绩</span>
		</div>
		<div class="item"><i class="iconfont">&#xe603;</i>
			<span>绩点</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe604;</i>
			<span>通讯录</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe606;</i>
			<span>新闻</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe605;</i>
			<span>形式政策</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe608;</i>
			<span>拼车</span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe602;</i>
			<span>
            失物
        </span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe601;</i>
			<span>
            树洞
        </span>
		</div>
		<div class="item">
			<i class="iconfont">&#xe600;</i>
			<span>互助</span>
		</div>
	</div>
</template>
<script>
    export default {
        name: "function",
        data() {
            return {};
        },
        methods: {
            card: function() {
                this.$router.push({
                    name: 'card'
                });
            },
            class: function() {
                this.$router.push({
                    name: 'class'
                });
            },
            score: function() {
                this.$router.push({
                    name: 'score'
                });
            },
            gpa: function() {
                this.$router.push({
                    name: 'gpa'
                });
            },
            address: function() {
                this.$router.push({
                    name: 'address'
                });
            }
        }
    }
</script>
<style lang="scss">
	#function {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		@mixin color() {
			border-left: 1px solid #E5E9F2;
		}
		.item {
			width: 3rem;
			height: 3.5rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #E5E9F2;
			flex-grow: 1;
			&:nth-child(1) {}
			&:nth-child(2) {
				@include color;
			}
			&:nth-child(3) {
				@include color;
			}
			&:nth-child(4) {}
			&:nth-child(5) {
				@include color;
			}
			&:nth-child(6) {
				@include color;
			}
			&:nth-child(7) {}
			&:nth-child(8) {
				@include color;
			}
			&:nth-child(9) {
				@include color;
			}
			&:nth-child(10) {}
			&:nth-child(11) {
				@include color;
			}
			&:last-child(2) {
				flex-grow: 2;
			}
			i {
				font-size: 1rem;
				color: #58B7FF;
				padding-top: 0.2rem;
			}
			span {
				font-size: 0.4rem;
				padding-top: 0.2rem;
				color: #8492A6;
			}
		}
	}
</style>