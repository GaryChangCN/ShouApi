<template>
  <div id='card'>
    <el-tabs>
      <el-tab-pane label="当前余额">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{card.custname}}</span>
            <el-button style="float: right;" @click.native="info" type="primary">刷新</el-button>
          </div>
					<div class="text item">
						{{card.custtype}}
          </div>
					<div class="text item">
						{{card.deptname}}
          </div>
					<div class="text item">
						{{card.balance}}
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="消费记录">
        me
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
    import {
        mapState
    } from 'vuex';
    import CONFIG from '../lib/config';
    export default {
        name: "card",
        data() {
            return {
                card: {}
            };
        },
        mounted() {
					this.info();
        },
        computed: mapState(['md5', 'username']),
        methods: {
            info() {
                var _this = this;
                this.axios.get(CONFIG.API + _this.username + "/getcard/getbalance").then(function(res) {
                    _this.card = res.data.data;
                });
            }
        }
    }
</script>