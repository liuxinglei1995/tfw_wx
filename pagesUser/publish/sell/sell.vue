<template>
	<view class="container">
		<tm-menubars title="委托出房" iconColor="white" ></tm-menubars>
		<view class="content">
			<text class="info">你想出售还是出租？</text>

			<view class="items">
				<text v-for="(item, index) in buyClass" :key="index" @tap="classChoose" :data-index="index" class="round-3"
					:class="'item ' + (currentClassChoose==index?'color':'')">{{item}}</text>
			</view>
			<text class="info">你想{{classTxt}}哪的房子</text>
			<view class="items">
				<tm-pickersCity @confirm="areaSelect" :default-value="areaSelected" style="width: 100%;" btn-color="success">
					<view class="sear-select">
						<view class="text">
							<tm-icons :size="34" name="icon-position-fill" color="#3fbaa6" style="margin-right: 15rpx;"></tm-icons>
							<input v-if="areaText" type="text" :disabled="true" :value="areaText" placeholder="点击录入位置信息" />
							<input v-else type="text" :disabled="true" placeholder="点击录入位置信息" />
						</view>
					</view>
				</tm-pickersCity>
			</view>
			<text class="info">你想{{classTxt}}的房屋类型？</text>
			<view class="middle">
				<text v-for="(item, index) in houseType" :key="index" @tap="typeSelect" :data-index="index" :data-s="item" class="round-3"
					:class="'item ' + (type==index?'color':'')">{{item}}</text>
			</view>
			<text class="info">房屋所在小区？</text>
			<view class="search">
				<input :value="residence" @input="input" placeholder="请输入小区名称">
			</view>
		</view>
		<button @tap="detail" class="btn" hover-class="none">下一步</button>
	</view>
</template>

<script>
	import tmPickersCity from '@/pagesUser/tm-vuetify/components/tm-pickersCity/tm-pickersCity.vue';
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue'
	export default {
		components:{tmPickersCity,tmIcons},
		data() {
			return {
				currentClassChoose:0,
				areaSelected:[],
				areaText:'',
				type: 0,
				buyClass: ["出售", "出租"],
				classTxt:'出售',
				fwlx:'住宅',
				imags: "/static/static/img/bg/wtmf.png",
				houseType: ['住宅', '写字楼', '商铺'],
				residence: ""
			};
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			input(e) {
				this.setData({
					residence: e.detail.value
				});
			},
			/**
			 * 类型选择
			 * @param {Object} e
			 */
			classChoose: function (e) {
				const that = this;
				const index = e.target.dataset.index
				that.setData({
					currentClassChoose:index,
					classTxt : index == 0 ? '出售' : '出租'
				})
			},
			/**
			 * 位置选择
			 * @param {Object} e
			 */
			areaSelect:function(e){
				let that = this
				that.setData({
					areaSelected:e,
					areaText:e[0]+'-'+e[1]+'-'+e[1]
				})
			},

			detail() {
				if (this.areaSelected.length < 3 || this.areaText == '') {
					uni.showToast({
						title: "请正确选择区域信息",
						icon: "none"
					});
					return;
				}
				if (this.residence.length < 3) {
					uni.showToast({
						title: "请正确输入小区名称",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: '/pagesUser/publish/sell/detail/detail?type='+this.classTxt+'&addr='+this.areaSelected+'&fwlx='+this.fwlx+'&xq='+this.residence
				});
			},

			typeSelect(e) {
				this.setData({
					type: e.currentTarget.dataset.index,
					fwlx:e.currentTarget.dataset.s
				});
			}
		}
	};
</script>
<style>
	image {
		width: 100%;
		height: 300rpx;
		margin-bottom: 10rpx;
	}

	.content {
		padding: 20rpx 40rpx;
	}

	.info {
		background-color: #fff !important;
		color: #000000 !important;
		position: relative;
		font-weight: bold;
		font-size: 34rpx;
	}

	.color {
		background-color: #00AAFF !important;
		color: white;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
		margin-top: 40rpx;
	}

	.item {
		padding: 10rpx 20rpx;
		background-color: #f4f4f4;
		font-size: 28rpx;
		font-weight: 400;
		width: 115rpx;
		height: 45rpx;
		line-height: 50rpx;
		float: left;
		margin-right: 19rpx;
		margin-bottom: 25rpx;
		text-align: center;
	}

	.item:active {
		filter: brightness(90%);
	}

	.item:nth-child(4n) {
		margin-right: 0rpx;
	}

	.middle {
		margin-top: 40rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
		border: 1rpx solid #ccc;
	}

	input {
		width: 80%;
		padding-left: 20rpx;
	}

	.icon-xingtaiduICON {
		color: #c1c1c1;
		margin: 0rpx 20rpx;
	}

	input[placeholder] {
		font-size: 28rpx;
	}

	.btn {
		width: 90% !important;
		border-radius: 50rpx;
		font-weight: normal;
		background-color: #3fbaa6;
		color: white;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.btn:active {
		filter: brightness(90%);
	}

	.sear-select {
		border: 1px solid #e3e3e3;
		border-radius: 10rpx;
		background: #fff;
		opacity: 0.8;
		width: 84%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sear-select {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #000;
		font-size: 28upx;
		border: 1upx solid #f1f1f1;
		border-radius: 10upx;
		box-shadow: 0 0 8upx 2upx #f1f1f1;
	}

	.sear-select .text {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding-left: 20upx;
		font-weight: bold;
	}
</style>
