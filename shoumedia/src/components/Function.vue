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
<style >
	
</style>