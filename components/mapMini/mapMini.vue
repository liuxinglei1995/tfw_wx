<template>
	<view style="padding-left: 40rpx; padding-right: 40rpx;">
		<view @tap="toMap" :data-id="fangId">
			<tm-sheet :margin="[0,0]" :padding="[0,0]">
				<map id="myMap" style="width:100%;height:300rpx;" :markers="markers" :latitude="latitude"
					:longitude="longitude" :scale='scale'>
				</map>
				<view class="flex-around" style="font-size: 20rpx;color: #757575;">
					<view v-for="(item,index) in iconMeun" style="text-align: center;padding: 10rpx;">
						<view :class="'iconfont '+ item.icon" style="font-size: 40rpx;margin-bottom: 5rpx;"></view>
						<view>{{item.name}}</view>
					</view>
				</view>
			</tm-sheet>
		</view>
	</view>
</template>

<script>
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	var app = getApp();
	export default {
		data() {
			return {
				'iconMeun': [{
						'name': '公交',
						'icon': 'icon-Transportation-13'
					},
					{
						'name': '地铁',
						'icon': 'icon-ditie'
					},
					{
						'name': '学校',
						'icon': 'icon-daxue'
					},
					{
						'name': '医院',
						'icon': 'icon-yiyuan'
					},
					{
						'name': '银行',
						'icon': 'icon-021-bank'
					},
					{
						'name': '休闲娱乐',
						'icon': 'icon-jianshenfang'
					},
					{
						'name': '购物',
						'icon': 'icon-shangchang'
					},
				]
			};
		},
		components: {tmSheet},
		props: {
			markers:{
				type:Array,
				default:[{
					callout: {
						'content': '测试',
						'display': 'ALWAYS'
					},
					latitude: "39.980014",
					longitude: "116.313972",
					iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
					width: 20,
					height: 20
				}]
			},
			fangId:{
				type:Number,
				default:0
			},
			scale: {
				type: Number,
				default: 15
			}, 
			latitude: {
				type: Number,
				default: 39.980014
			},
			longitude: {
				type: Number,
				default: 116.313972
			},
			type: {
				type: Number,
				default: 1
			}
		},
		methods: {
			toMap:function(e){
				console.log(e,"dkaejdiwajdiawjdi")
				/**
				 * type:1新房，2二手房
				 */
				let url = ''
				switch(this.type){
					case 1:
						url = "/pagesHouse/map/map?id="+e.currentTarget.dataset.id
						break;
					case 2:
						url = "/pagesHouse/esMap/esMap?id="+e.currentTarget.dataset.id
						break;
					case 3:
						url = "/pagesHouse/zfMap/zfMap?id="+e.currentTarget.dataset.id
						break;
					default :
						url = "/pagesHouse/map/map?id="+e.currentTarget.dataset.id
						break;
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	};
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
</style>
