<template>
	<view class="">
		<tm-menubars title="我的预约" iconColor="white"></tm-menubars>
		<tm-sheet v-if="drafts.length>0" v-for="(item,index) in drafts" :key="item.id" @tap="goHouse(item.id)">
			<view class="flex-col">
				<view class="title">
					{{item.taskName}}
				</view>
				<view style="margin-top: 10rpx; display: flex;">
					<view style="margin-right:40rpx;"><dict-tag :options="dict.type.tfw_look_type"
							:value="item.type ? item.type : ''" /></view>
					<view>{{item.createName}}</view>
				</view>
				<view class="" style="margin-top: 10rpx;">
					创建时间：{{item.createTime}}
				</view>
				<view class="" style="margin-top: 10rpx;">
					看房时间：{{item.customerReportingTime}}
				</view>
			</view>
		</tm-sheet>
		<tm-empty v-if="drafts.length==0" label="暂无预约记录" icon="icon-sync-alt"></tm-empty>
	</view>
</template>

<script>
	import {
		lookafter
	} from '@/api/houst.js'
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTags from '@/pagesUser/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmDialog from '@/pagesUser/tm-vuetify/components/tm-dialog/tm-dialog.vue';
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmEmpty from '@/pagesUser/tm-vuetify/components/tm-empty/tm-empty.vue';
	export default {
		dicts: ['tfw_look_type'],
		components: {
			tmSheet,
			tmTags,
			tmDialog,
			tmIcons,
			tmEmpty
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				drafts: [],
				bh: '',
				ifdel: false,
				userid: "",
			}
		},
		onLoad() {
			this.userid = this.$store.state.user.userdata.userId
			this.getCollect();
			console.log(this.userid, "4444");
		},
		methods: {
			/**
			 * 跳转倒详情
			 * @param {Object} bh
			 */
			goHouse: function(e) {
				console.log(e,"ssssklkaldad");
				this.$tab.navigateTo('/pagesUser/customerMG/looklogid/looklogid?id=' + e)
			},
			/**
			 * 获取带看列表
			 */
			getCollect: function() {
				let that = this
				lookafter({
						appointmentUserId: this.userid,
					})
					.then(res => {
						console.log(res, "eeeeeeeeeeeeeeeeeeeeee");
						that.setData({
							drafts: res.rows
						})
					})
			},
		}
	};
</script>

<style>
	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
		color: #333333;
	}

	.time {
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.type {
		font-size: 32rpx;
		font-weight: 400;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}
</style>