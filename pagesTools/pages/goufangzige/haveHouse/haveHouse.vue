<!-- 心灵保健 -->
<template>
	<view class="contaier" :style="{ minHeight: getHeight + 'px' }">
		<tm-menubars title="购房资格" iconColor="white" ></tm-menubars>
		<view class="radius shadow-warp bg-white margin-top relative">
			<view class="userHeard cu-avatar lg round" style="background-image:url(http://cdn.zhoukaiwen.com/logo.png);"></view>
			<view v-show="hasData">
				<view class="animation-reverse" :class="animation" data-class="slide-rights" v-if="DataList[num].serialNumber">
					<view class="mentalTitle text-xl text-black text-bold">
						<text>{{ num > 1 && DataList[1]['selected'] == 'F' ? DataList[num].serialNumber -1 : DataList[num].serialNumber || '' }}</text>
						<text>、</text>
						<text>{{ DataList[num].title || '' }}</text>
					</view>
					
					<tm-sheet :shadow="6"  v-for="(item, index) in DataList[num].itemList" :class="{mentalListActive : DataList[num]['selected'] == item.number}" @tap="Toggle(index,item.number)">
						{{ item.number || '' }}
						{{ item.answer || '' }}
					</tm-sheet>
					
				</view>
				
		
				<view class="explainMain">本测试仅提供参考，不会作为最终依据</view>
			</view>
			
			<view v-if="num>0" class="go-back" @tap="upQ">
				<image src="https://imgcdn.huanjutang.com/assets/img/20191209/5dedc42517cf9.png" mode=""></image>
				上一题
			</view>
		
			<view v-show="noData">
				<tm-sheet :shadow="24" :maxHeight="400" :padding="[32, 24]">
					<view class="zg">
						您有：{{showQY}} 的资格！
					</view>
					<view class="flex-between">
						<tm-button plan theme="pink" @click="ag" :round="24" >再试一次</tm-button>
					</view>
					<view class="explainMain">本测试仅提供参考，不会作为最终依据</view>
				</tm-sheet>
				<tm-sheet :shadow="24" :maxHeight="400" :padding="[32, 24]">
					<view class="title">
						您选择的答案
					</view>
					<view class="qa" v-for="(item, index) in DataList" v-if="item.selected != 0">
						<view class="q">
							<text>{{ index > 1 && DataList[1]['selected'] == 'F' ? DataList[index].serialNumber -1 : DataList[index].serialNumber || '' }}</text>
							<text>、</text>
							{{item.title}}
						</view>
						<view class="a"  v-for="(itemA, index) in item.itemList" v-if="itemA.number == item.selected">
							答： {{itemA.answer}}
						</view>
					</view>
				</tm-sheet>
			</view>
		</view>
	</view>
</template>

<script>
	import tmSheet from '@/pagesTools/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmButton from '@/pagesTools/tm-vuetify/components/tm-button/tm-button.vue';
	export default {
		components:{
			tmSheet,tmButton
		},
		data() {
			return {
				getHeight: '',
				loading: false,
				animation: '',
				noData: false,
				hasData: true,
				showQY:"",
				// 数据
				num: 0,
				DataList: [{
						serialNumber: '1',
						selected:'0',
						name: '',
						title: '家庭类型？',
						itemList: [{
								number: 'A',
								answer: '单身家庭[成年未婚、丧偶、离异的单身居民]'
							},
							{
								number: 'B',
								answer: '两人及以上家庭[夫妻双方、离异父（母）和其未成年子女、丧偶父（母）和其未成年子女、夫妻双方及其未成年子女的居民]'
							}
						]
					},
					{
						serialNumber: '2',
						selected:'0',
						name: '',
						title: '户口所在地？',
						itemList: [{
								number: 'A',
								answer: '高新南区'
							},
							{
								number: 'B',
								answer: '天府新区'
							},
							{
								number: 'C',
								answer: '高新西区、锦江区、青羊区、金牛区、武侯区、成华区'
							},
							{
								number: 'D',
								answer: '龙泉驿区、新都区、温江区、双流区、郫都区'
							},
							{
								number: 'E',
								answer: '青白江区、简阳市、都江堰市、彭州市、邛崃市、崇州市、金堂县、新津区、大邑县、蒲江县'
							},
							{
								number: 'F',
								answer: '外地户口'
							}
						]
					},
					{
						serialNumber: '3',
						selected:'0',
						name: '',
						title: '已落户多久？',
						itemList: [{
								number: 'A',
								answer: '不到24个月'
							},
							{
								number: 'B',
								answer: '24个月以上'
							}
						]
					},
					{
						serialNumber: '4',
						selected:'0',
						name: '',
						title: '社保缴纳最后一月所在区域？',
						itemList: [{
								number: 'A',
								answer: '高新南区'
							},
							{
								number: 'B',
								answer: '天府新区'
							},
							{
								number: 'C',
								answer: '高新西区、锦江区、青羊区、金牛区、武侯区、成华区'
							},
							{
								number: 'D',
								answer: '龙泉驿区、新都区、温江区、双流区、郫都区'
							},
							{
								number: 'E',
								answer: '青白江区、简阳市、都江堰市、彭州市、邛崃市、崇州市、金堂县、新津区、大邑县、蒲江县'
							},
							{
								number: 'F',
								answer: '没有社保'
							}
						]
					},
					{
						serialNumber: '5',
						selected:'0',
						name: '',
						title: '您的社保在成都连续缴纳了几年？',
						itemList: [{
								number: 'A',
								answer: '不到1年'
							},
							{
								number: 'B',
								answer: '1-2年'
							},
							{
								number: 'C',
								answer: '2年以上'
							}
						]
					},
					{
						serialNumber: '6',
						selected:'0',
						name: '',
						title: '您的家庭大成都范围内有几套房产？',
						itemList: [{
								number: 'A',
								answer: '0套'
							},
							{
								number: 'B',
								answer: '1套'
							},
							{
								number: 'C',
								answer: '2套及以上'
							}
						]
					},
				],

			};
		},
		onLoad() {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.getHeight = res.windowHeight;
				}
			});
			setTimeout(function() {
				that.loading = true;
			}, 300);

			this.getData();
		},
		methods: {
			getData() {
				this.progress = 0;
			},
			Toggle(index,number) {
				let that = this
				let num = that.num
				let DataList = that.DataList
				DataList[num]['selected'] = number
				that.setData({
					DataList:DataList,
					animation:'animation-slide-left'
				})
				setTimeout(() => {
					if(num == 1 && DataList[1]['selected'] == 'F'){
						that.setData({
							num : 3
						})
					}else if(num == 3){
						if(DataList[3]['selected'] == 'F'){
							that.result()
						}
						that.setData({
							num : num + 1
						})
					}else if(num == 4){
						if(DataList[2]['selected'] == 'B' || (DataList[2]['selected'] == 'A' && DataList[4]['selected'] != 'A')){
							that.setData({
								num : num + 1
							})
						}else{
							that.result()
						}
					}else if(num == 5){
						that.result()
					}else{
						that.setData({
							num : num + 1
						})
					}
					 //翻第二页
					that.animation = '';
				}, 600);
			},
			result:function(){
				let that = this
				let DataList = that.DataList
				var result = ''
				if(DataList[2]['selected'] == 'B' || (DataList[2]['selected'] == 'A' && DataList[4]['selected'] != 'A')){
					//满足社保与户籍条件
					if((DataList[1]['selected'] == 'A' && DataList[0]['selected'] == 'A' && DataList[5]['selected'] == 'A') || (DataList[1]['selected'] == 'A' && DataList[0]['selected'] == 'B' && DataList[5]['selected'] != 'C')){
						DataList[1].itemList.forEach(function(item,index){
							if(index > 0 && index < 4){
								result = result + item.answer + '、'
							}else if(index = 4){
								result = result + item.answer
							}
						})
					}else if((DataList[1]['selected'] == 'B' && DataList[0]['selected'] == 'A' && DataList[5]['selected'] == 'A') || (DataList[1]['selected'] == 'B' && DataList[0]['selected'] == 'B' && DataList[5]['selected'] != 'C')){
						DataList[1].itemList.forEach(function(item,index){
							if(item.answer != "高新南区"){
								if(index > 0 && index < 4){
									result = result + item.answer + '、'
								}else if(index = 4){
									result = result + item.answer
								}
							}
						})
					}else if((DataList[1]['selected'] == 'C' && DataList[0]['selected'] == 'A' && DataList[5]['selected'] == 'A') || (DataList[1]['selected'] == 'C' && DataList[0]['selected'] == 'B' && DataList[5]['selected'] != 'C')){
						DataList[1].itemList.forEach(function(item,index){
							if(item.answer != "高新南区"){
								if(index > 0 && index < 4){
									result = result + item.answer + '、'
								}else if(index = 4){
									result = result + item.answer
								}
							}
						})
					}else if((DataList[1]['selected'] == 'D' && DataList[0]['selected'] == 'A' && DataList[5]['selected'] == 'A') || (DataList[1]['selected'] == 'D' && DataList[0]['selected'] == 'B' && DataList[5]['selected'] != 'C')){
						DataList[1].itemList.forEach(function(item,index){
							if(item.number != "A" && item.number != "B"){
								if(index > 0 && index < 4){
									result = result + item.answer + '、'
								}else if(index = 4){
									result = result + item.answer
								}
							}
						})
					}else{
						result = DataList[1].itemList[4]['answer']
					}
				}else{
					result = DataList[1].itemList[4]['answer']
				}
				that.setData({
					num : 0,
					hasData : false,
					noData : true,
					showQY:result
				})
			},
			ag:function(){
				let that = this
				that.setData({
					num : 0,
					hasData : true,
					noData : false,
					showQY:''
				})
			},
			upQ:function(){
				let that = this
				let num = that.num
				let DataList = that.DataList
				if(this.num > 0){
					DataList[num]['selected'] = 0
					that.setData({
						DataList:DataList
					})
					if(num == 3 && DataList[1]['selected'] == 'F'){
						that.setData({
							num : 1
						})
					}else{
						that.setData({
							num : num - 1
						})
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../animation.css';
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.title{
		font-size: 38rpx;
		color: rgba(0,0,0,.85);
		font-weight: 700;
		padding-bottom: 32rpx;
		line-height: 53rpx;
	}
	.rect {
		width: 480rpx;
		// height: 520rpx;
		border-radius: 20rpx;
		padding: 25rpx 25rpx 80rpx 25rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.closeImg {
		width: 100%;
		height: 200rpx;
		margin: 10rpx auto 30rpx;

		image {
			height: 200rpx;
		}
	}

	.cu-bar .cu-avatar:first-child {
		margin-left: -11px;
	}

	.cu-bar {
		height: 90rpx !important;
	}


	.explainMain {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		text-align: center;
		color: #999999;
		margin-top: 30rpx;
	}

	.userHeard {
		position: absolute;
		left: 50%;
		top: -50rpx;
		margin-left: -50rpx;
	}

	.mentalTitle {
		background: url(https://cdn.tianfucd.com/images/applet/qabg.png) 50%/100% 100% no-repeat;
		width: 100%;
		padding: 53rpx 53rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 53rpx;
		font-size: 48rpx;
		font-weight: 700;
		color: #fff !important;
		line-height: 74rpx;
		margin-bottom: 16rpx;
	}

	.mentalListActive {
		border: 1px solid #0081ff;
	}

	.contaier {
		background-color: #f2f2f2;

		.explain {
			width: 750rpx;
			// position: absolute;
			bottom: 40rpx;
			font-size: 24rpx;
			margin: 10rpx 0 40rpx 0;
			text-align: center;
			color: #999999;

			.integral {
				font-size: 30rpx;
				margin-bottom: 15rpx;
				color: #333333;
			}
		}
	}
	.go-back {
	    text-align: left;
	    background: none;
	    border: none;
	    color: #2d8cf0;
	    padding: 40rpx 53rpx 0;
	    font-weight: 700;
	}
	
	.go-back{
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    font-size: 37rpx;
	    line-height: 53rpx;
	}
	.go-back image {
	    margin-right: 13rpx;
	    display: inline-block;
	    width: 45rpx;
	    height: 30rpx;
	}
	.q {
	    padding-bottom: 20rpx;
	    font-size: 30rpx;
	    color: #606266;
	}
	.a{
		font-size: 30rpx;
		color: rgba(0,0,0,.65);
		line-height: 50rpx;
		padding-bottom: 20rpx;
		font-family: PingFangSC-Regular,PingFang SC;
	}
	.zg{
		margin-bottom: 26rpx;
		font-size: 32rpx;
		color: #000;
		font-weight: 700;
		line-height: 50rpx;
	}
</style>
