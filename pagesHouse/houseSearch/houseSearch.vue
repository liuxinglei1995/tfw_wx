<template>
	<view>
		<tm-menubars title="房源搜索" iconColor="white" ></tm-menubars>
		<!-- 搜索与城市选择入口 -->
		<view class="sear-select">
			<view class="left">
				<tm-pickers class="adr"  @confirm="select" :default-value="selected"  :list="['新房','二手房','商铺','写字楼','租房']">
					{{selected[0]}}
					<tm-icons name="icon-angle-down" :size="26" color="#999" style="margin-left: 10rpx;"></tm-icons>
				</tm-pickers>
				<view class="text">
					<tm-icons name="icon-search" :size="34" color="#999" style="margin-right: 15rpx;"></tm-icons>
					<input type="text" :value="inputVal" @input="searchChange" confirm-type="搜索" @confirm="goSearch" placeholder="你想住在哪?" />
				</view>
			</view>
		</view>
		<view v-if="history" class="searchHis" >
			<view class="flex-between">
				<view class="hisTit">
					搜索历史
				</view>
				<!-- <view class="">
					清空
				</view> -->
			</view>
		</view>
		<view class="searchHis" >
			<tm-button @tap="selectSear(item)" v-if="history" v-for="(item,index) in history" text theme="white"  >{{item}}</tm-button>
		</view>
	</view>
</template>

<script>
	import tmPickers from '@/tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
	var app = getApp();
	export default {
		components:{tmPickers,tmIcons,tmButton},
		data: () => ({
			inputVal:'',
			selected:['二手房'],
			history:'',
		}),
		onShow() {
			var history = uni.getStorageSync('houseSearch')
			this.history = history
		},
		methods: {
			select : function(name){
				let that = this
				const selected = []
				const url = ''
				selected[0] = name["0"]['data']
				that.setData({
					selected : selected
				})
			},
			searchChange:function(e){
				this.inputVal = e.detail.value
			},
			selectSear:function(e){
				this.inputVal = e
				this.goSearch()
			},
			goSearch:function(){
				let that = this
				let selected = that.selected
				if(that.inputVal == ''){
					uni.showToast({
						icon:'none',
						title:'搜索内容不能为空'
					})
				}else{
					let searchVal = that.inputVal
					let url = ''
					switch(selected[0]){
						case'新房':
							url = '/pagesHouse/newhouse/newhouse?input_val='+searchVal
							break;
						case'商铺':
							url = '/pagesHouse/eshouse/eshouse?wylx=商铺&input_val='+searchVal
							break;
						case'写字楼':
							url = '/pagesHouse/eshouse/eshouse?wylx=写字楼&input_val='+searchVal
							break;
						case'租房':
							url = '/pagesHouse/rentHouse/rentHouse?input_val='+searchVal
							break;
						default :
							url = '/pagesHouse/eshouse/eshouse?input_val='+searchVal
							break;
					}
					var history = uni.getStorageSync('houseSearch')
					var historyAll = [] ;
					if(history == null || history == ''){
						historyAll.unshift(searchVal)
						uni.setStorageSync('houseSearch',historyAll)
					}else{
						history.forEach(function(itemHis,index){
							if(index < 40 && itemHis == searchVal) history.splice(index,1)
							else if(index > 40) history.splice(index,1)
						})
						history.unshift(searchVal)
						uni.setStorageSync('houseSearch',history)
					}
					uni.navigateTo({
						url: url
					});
				}
			}
		}
	}
</script>

<style>
	.sear-select {
		margin-left: 8%;
		margin-right: 8%;
		margin-top: 30rpx;
		border: 1px solid #e3e3e3;
		border-radius: 10rpx;
		z-index: 2;
		background: #fff;
		opacity: 0.8;
		width: 84%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.searchHis{
		margin-left: 8%;
		margin-right: 8%;
		margin-top: 30rpx;
	}
	.hisTit{
		font-size: 42rpx;
		font-weight: bold;
	}
	.hisCon{
		padding: 20rpx 30rpx;
		background-color: #bdbdbd;
	}
	.sear-select .left {
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
	
	
	.sear-select .left .text {
		width: 75%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding-left: 20upx;
	}
	
	.sear-select .left .adr {
		width: 180upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1upx solid #acacac;
		flex-shrink: 0;
		font-weight: bold;
	}
</style>
