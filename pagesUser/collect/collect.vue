<template>
	<view class="">
		<tm-menubars title="我的关注" iconColor="white"></tm-menubars>
		<tm-sheet v-if="drafts != ''" v-for="(item,index) in drafts" :key="item.id"  @tap="goHouse(item.fang_id)">
			<view class="flex-between">
				<image style="width: 300rpx;margin-right: 30rpx;" :src="'https://www.tianfucd.com'+item.img" mode="widthFix"></image>
				<view class="title">
					{{item.title}}
				</view>
			</view>
			<view style="margin-top: -50rpx;width: 100%;position: relative;top: -10rpx;left: 560rpx;" @click.stop="bh = item.bh,ifdel=true">
				<tm-icons size="32" color="red" name="icon-delete-fill"></tm-icons>
			</view>
		</tm-sheet>
		<tm-empty v-if="drafts == ''" label="暂无收藏房源" icon="icon-sync-alt"></tm-empty>
		<tm-dialog confirmText="确定删除" cancelText="取消" @confirm="delDrafts" v-model="ifdel" content="该操作不可逆,是否确认删除!" theme="split"></tm-dialog>
	</view>
</template>

<script>
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTags from '@/pagesUser/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmDialog from '@/pagesUser/tm-vuetify/components/tm-dialog/tm-dialog.vue';
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmEmpty from '@/pagesUser/tm-vuetify/components/tm-empty/tm-empty.vue';
	export default{
		components:{tmSheet,tmTags,tmDialog,tmIcons,tmEmpty},
		data() {
			return {
				page:1,
				pageSize:100,
				drafts:[],
				bh:'',
				ifdel:false
			}
		},
		onLoad() {
			this.getCollect();
		},
		methods: {
			/**
			 * 跳转倒编辑页
			 * @param {Object} bh
			 */
			goHouse:function(bh){
				uni.navigateTo({
					url:"../shop/input/secondHousing?bh="+bh
				})
			},
			/**
			 * 获取草稿列表
			 */
			getCollect: function(){
				let that = this
				that.$apis.getCollect({
					page:that.page,
					pageSize:that.pageSize
				})
				.then(res => {
					that.setData({
						page:that.page + 1,
						drafts:res
					})
				})
			},
			/**
			 * 删除草稿
			 */
			delDrafts:function(){
				let that = this
				let bh = that.bh
				that.$apis.delDrafts({
					bh:bh
				})
				.then(res => {
					uni.showToast({
						icon:"success",
						title:"删除成功"
					})
				})
			}
		}
	};
</script>

<style>
	.title{font-size: 36rpx;font-weight: bold;text-align: left;color: #333333;
	}
	.time{font-size: 24rpx;font-weight: 400;text-align: left;color: #999999;}
	.type{font-size: 32rpx;font-weight: 400;text-align: left;color: #333333;letter-spacing: 0px;}
</style>
