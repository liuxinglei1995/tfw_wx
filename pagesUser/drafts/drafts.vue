<template>
	<view class="home">
		<tm-menubars title="草稿箱" iconColor="white"></tm-menubars>
		<tm-tabs v-model="activeIndex" @change="protectionSelect" :list="Flist" height="60" align="center" range-key="title"></tm-tabs>
		<uni-card v-for="(item,index) in drafts" :key="item.id" 
			:title="item.title ? item.title : '暂无标题'"
			:extra="item.createdAt"
			@tap="goInput(item.id)">
			<view class="my-15 type">
				<view style="display: flex; justify-content: flex-start;">
					<dict-tag :options="dict.type.tfw_status" :value="item.status" />
				</view>
				<view style="display: flex; justify-content: flex-start;">
					<view v-for="(c,d) in item.type" :key="d" style="margin-right: 20rpx;">
						<dict-tag :options="dict.type.tfw_rent_sale" :value="c" />
					</view>
				</view>
				{{item.xqname}}
				<text class="pl-20">{{item.building}}栋{{item.unit}}单元{{item.floor}}楼{{item.roomNum}}号</text>
			</view>
			<view style="margin-top: -50rpx;width: 100%;position: relative;top: -10rpx;left: 560rpx;"
				@click.stop="del_id = item.id,ifdel=true">
				<tm-icons size="32" color="red" name="icon-delete-fill"></tm-icons>
			</view>
		</uni-card>
		<tm-dialog confirmText="确定删除" cancelText="取消" @confirm="delDrafts" v-model="ifdel" content="该操作不可逆,是否确认删除!"
			theme="split"></tm-dialog>
	</view>
</template>

<script>
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTags from '@/pagesUser/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmDialog from '@/pagesUser/tm-vuetify/components/tm-dialog/tm-dialog.vue';
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmTabs from '@/pagesUser/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import {
		listFangyuan,
		delMyFangyuan
	} from '@/api/houst.js'

	export default {
		dicts: ['tfw_property_type', 'tfw_rent_sale', 'tfw_status'],
		components: {
			tmSheet,
			tmTags,
			tmDialog,
			tmIcons,
			tmTabs
		},
		data() {
			return {
				page: 1,
				pageSize: 100,
				drafts: [],
				del_id: '',
				ifdel: false,
				activeIndex:0,
				Flist:[ '草稿箱','审核中', '审核失败'],
				queryData: {
					status: 3
				},
			}
		},
		onShow() {
			this.getDrafts()
		},
		methods: {
			protectionSelect:function(f){
				let that = this
				console.log(f)
				if(f === 0) {
					that.queryData.status = 3
					that.getDrafts()
				}
				if(f === 1) {
					that.queryData.status = 4
					that.getDrafts()
				}
				if(f === 2) {
					that.queryData.status = 5
					that.getDrafts()
				}
			},
			/**
			 * 跳转倒编辑页
			 * @param {Object} bh
			 */
			goInput: function(id) {
				uni.navigateTo({
					url: "../shop/input/secondHousing?bh=" + id
				})
			},
			/**
			 * 获取草稿列表
			 */
			getDrafts: function() {
				let that = this
				that.queryData.page = that.page;
				that.queryData.pageSize = that.pageSize;
				that.queryData.userId = this.$store.state.user.userdata.userId
				listFangyuan(that.queryData)
				.then(res => {
					console.log(res, "pppp");
					that.setData({
						page: that.page + 1,
						drafts: res.rows
					})
				})
			},
			/**
			 * 删除草稿
			 */
			delDrafts: function() {
				let that = this
				let del_id = that.del_id
				let arr = []
				arr.push(del_id)
				delMyFangyuan(arr)
					.then(res => {
						that.setData({
							page: 1
						})
						this.getDrafts()
						uni.showToast({
							icon: "success",
							title: "删除成功"
						})
					})
			}
		}
	};
</script>

<style>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}
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