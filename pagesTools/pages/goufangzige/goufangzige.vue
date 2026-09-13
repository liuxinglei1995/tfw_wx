<template>
	<view>
		<tm-menubars title="购房资格" iconColor="white" ></tm-menubars>
		<view class="px-15 py-15">
			<view class="ma-10" @tap="toPath('gfzc/gfzc')">
				<image class="main-image" src="https://cdn.tianfucd.com/images/applet/fgzc.png" mode="aspectFit"></image>
			</view>
			<view class="question-content">
				<view class="flex-start">
					<image @tap="toPath('haveHouse/haveHouse')" src="https://cdn.tianfucd.com/images/applet/gfzgcx.png" mode="aspectFit"></image>
					<image @tap="alert('暂未开放此功能！')" src="https://cdn.tianfucd.com/images/applet/wfjtzgcx.png" mode="aspectFit"></image>
				</view>
				<view class="common-question-title ma-10">
					常见问题
				</view>
				<view v-for="(item,index) in QA" @tap="QAClick(index)" class="question-item ma-10">
					<view class="item-title">
						<tm-tags size="xs" model="outlined">问</tm-tags>{{item.Q}}
					</view>
					<view class="item-text">
						<text v-for="(itemA,index) in item.A">{{itemA}}</text>
					</view>
				</view>
				<view class="read-more ma-10" @tap="toPath('more/more')">
					查阅详情>>
				</view>
			</view>
		</view>
		<tm-poup v-model="QAShow" :height="600" position="bottom">
			<view class="ma-20">
				<view @tap="closeClick">
					<tm-icons class="closeIcon" name="icon-times" :size="42"></tm-icons>
				</view>
				<view class="title">
					<tm-tags size="xs" model="fill">问</tm-tags>{{QA[showQa].Q}}
				</view>
				<view class="answer">
					<p v-for="(itemA,index) in QA[showQa].A">{{itemA}}</p>
				</view>
			</view>
		</tm-poup>
	</view>
</template>

<script>
	import tmTags from '@/pagesTools/tm-vuetify/components/tm-tags/tm-tags.vue';
	import tmPoup from '@/pagesTools/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmIcons from '@/pagesTools/tm-vuetify/components/tm-icons/tm-icons.vue';
	export default {
		
		components:{
			tmPoup,tmTags,tmIcons
		},
		data() {
			return {
				QAShow:false,
				showQa:0,
				QA:[
					{
						'Q':'社保“连续缴纳”如何界定？',
						"A":[
							'“连续缴纳”是指购房人在递件当月或者前一个月往前推24个月（或者12个月）连续不间断缴纳社保。针对换工作，个人缴纳社保的情况：',
							'① 通过24个月社保购房，首尾必须是公司缴纳，中间个人缴纳的社保不超过6个月。',
							'② 通过户籍+12个月社保购房，首尾必须是公司缴纳，中间个人缴纳的社保不超过3个月。'
						]
					},{
						'Q':'我能买几套？',
						"A":[
							'单身只能买一套；纯社保也只能买一套；户口两人以上家庭能买两套。集体土地上的住房不计入；共有产权的房屋计入；继承、遗赠、赠与计入；有住房离异未满两年的计入。'
						]
					},{
						'Q':'家庭成员怎么定义？',
						"A":[
							'是指夫妻双方及未满18周岁的子女，成年子女不计算在内。单身只能买一套；纯社保也只能买一套；户口两人以上家庭能买两套。集体土地上的住房不计入；共有产权的房屋计入；继承、遗赠、赠与计入；离异未满两年的计入。'
						]
					},{
						'Q':'无房家庭如何定义？',
						"A":[
							'1、购买的商品住房位于我市住房限购区域的，登记购房人须符合我市住房限购政策；',
							'2、登记购房者人及其家庭成员在本市行政区域内名下均无自由产权住房且自2016年10月1日以来无住房转让纪录。',
							'3、居民家庭包括：夫妻双方；夫妻双方及其未成年子女；离异（丧偶）父（母）和其未成年子女；达到法律婚龄未婚居民；购房登记时离异已满两年的单身居民；丧偶单身居民等。'
						]
					},{
						'Q':'最全成都限购政策解读',
						"A":[
							'包含成都市户籍购房、非成都市户籍购房、公司购房、个体工商购房、关键注意事项，查看详情——请点击。'
						]
					}
				]
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
		    return {
				title: '天府网',
		    }
		},
		methods: {
			/**
			 * 提示
			 * @param {Object} txt
			 */
			alert:function(txt){
				uni.showToast({
					icon:"none",
					title:txt
				})
			},
			/**
			 * 跳转页面
			 * @param {Object} path
			 */
			toPath: function(path){
				uni.navigateTo({
					url:path
				})
			},
			/**
			 * 点击问答
			 * @param {Object} id
			 */
			QAClick:function(id){
				this.QAShow = true
				this.showQa = id
			},
			/**
			 * 点击关闭
			 */
			closeClick:function(){
				this.QAShow = false
			}
		}
	}
</script>

<style>
.main-image {
    width: 100%;
    background: #1fb6ff;
    -webkit-box-shadow: 0 2rpx 6rpx 0 rgb(75 135 255 / 22%);
    box-shadow: 0 2rpx 6rpx 0 rgb(75 135 255 / 22%);
    border-radius: 20rpx;
    display: block;
	height: 300rpx;
}
.flex-start image{
	height: 270rpx;
	margin: 10rpx;
}
.question-content .common-question-title {
    font-size: 40rpx;
    font-weight: 700;
    color: rgba(0,0,0,.85);
    line-height: 60rpx;
}


.question-content .question-item {
    width: 100%;
    padding: 8rpx 7rpx;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1PX solid rgba(0,0,0,.07);
    border-width: 1PX;
}
.question-content .question-item .item-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 24rpx;
    color: rgba(0,0,0,.65);
    line-height: 38rpx;
    font-family: PingFangSC-Regular,PingFang SC;
}
.read-more{
	color: #2d8cf0;
	margin-top: 35rpx;
	font-size: 30rpx;
}
.closeIcon{
	position: relative;
	left: 660rpx;
}
.title{
	margin-bottom: 30rpx;
	display: -webkit-box;
}
.answer{
	color: rgba(0,0,0,.85);
	font-size: 28rpx;
	line-height: 46rpx;
	font-family: PingFangSC-Regular,PingFang SC;
	overflow: auto;
}
</style>
