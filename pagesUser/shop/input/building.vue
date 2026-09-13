<template>
	<view >
		<tm-menubars title="楼盘录入" iconColor="white"></tm-menubars>
		<view class="pb-50 text grey ">
			<ourLoading :active="loadingShow" text="加载中..." />
			<tm-form v-if="step == 1 && loadingShow == false" @submit="submit" ref="formData" @request="success" method="post" url="">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">楼盘基础信息设置</text>
					</view>
					<tm-input name="tit" required title="楼盘标题" placeholder="楼盘标题" v-model="reqData.tit"></tm-input>
					<tm-input name="xq" @click="goMap" disabled required title="楼盘名称" placeholder="点击快速录入" v-model="reqData.xq"></tm-input>
					<tm-input name="xqzb" @click="goMap" disabled required title="楼盘坐标" placeholder="点击快速录入" v-model="reqData.xqzb"></tm-input>
					<tm-input name="city" @click="goMap" disabled required title="楼盘区域" placeholder="点击快速录入" v-model="reqData.city"></tm-input>
					<tm-input name="xqadd" @click="goMap" disabled required title="具体位置" placeholder="点击快速录入" v-model="reqData.xqadd"></tm-input>
					
					
					
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">楼盘销售属性</text>
					</view>
					<tm-input name="gtmj" required title="公摊面积" input-type="digit" v-model="reqData.gtmj" suffix="㎡"></tm-input>
					<tm-input name="qjmj" required title="区间面积" input-type="digit" v-model="reqData.qjmj" suffix="㎡"></tm-input>
					<tm-input name="money1" required title="参考均价" input-type="digit" v-model="reqData.money1" suffix="元 / ㎡"></tm-input>
					<tm-input name="fxiaoj" required title="分销佣金" input-type="digit" v-model="reqData.fxiaoj" suffix="%"></tm-input>
					
					
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">楼盘售房资料</text>
					</view>
					<view class="mx-32 my-24 border-b-1  pb-24 flex-between">
						<text class="text-size-n " style="min-width: 140rpx;">装修情况</text>
						<view>
							<tm-groupcheckbox name="zxqk" v-model="reqData.zxqk">
								<tm-checkbox :name="item.id" v-for="(item,index) in checkList.furnish" :key="index" :label="item.title" v-model="item.checked"></tm-checkbox>
							</tm-groupcheckbox>
						</view>
					</view>
					<view class="mx-32 my-24 border-b-1  pb-24 flex-between">
						<text class="text-size-n " style="min-width: 140rpx;">户型情况</text>
						<view>
							<tm-groupcheckbox name="huxing">
								<tm-checkbox :name="item.id" v-for="(item,index) in huxing" :key="index" :label="item.title" v-model="item.checked"></tm-checkbox>
							</tm-groupcheckbox>
						</view>
					</view>
					<view class="mx-32 my-24 border-b-1  pb-24 flex-between">
						<text class="text-size-n " style="min-width: 140rpx;">物业类型</text>
						<view>
							<tm-groupcheckbox name="wylx">
								<tm-checkbox :name="item.id" v-for="(item,index) in checkList.wylxs" :key="index" :label="item.title" v-model="item.checked"></tm-checkbox>
							</tm-groupcheckbox>
						</view>
					</view>
					<view class="mx-32 my-24 border-b-1  pb-24 flex-between">
						<text class="text-size-n " style="min-width: 140rpx;">物业特色</text>
						<view>
							<tm-groupcheckbox name="wytsid">
								<tm-checkbox :name="item.id" v-for="(item,index) in checkList.wytss" :key="index" :label="item.title" v-model="item.checked"></tm-checkbox>
							</tm-groupcheckbox>
						</view>
					</view>
					<view class="mx-32 my-24 border-b-1  pb-24 flex-between">
						<text class="text-size-n " style="min-width: 140rpx;">楼盘交通</text>
						<view>
							<tm-groupcheckbox name="jiaot">
								<tm-checkbox :name="item.id" v-for="(item,index) in jiaotong" :key="index" :label="item.title" v-model="item.checked"></tm-checkbox>
							</tm-groupcheckbox>
						</view>
					</view>
					
					
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">楼盘状态</text>
					</view>
					<view class="mx-32 my-12 border-b-1  pb-12 flex-between" >
						<text class="text-size-n ">上架状态</text>
						<tm-groupradio name="ifxj">
							<tm-radio :name="item.title" v-for="(item,index) in shangjia" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view>
					<view class="mx-32 my-12 border-b-1  pb-12 flex-between" >
						<text class="text-size-n ">楼盘状态</text>
						<tm-groupradio name="lpzt">
							<tm-radio :name="item.title" v-for="(item,index) in loupanStatus" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
						<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
					</view>
					<tm-button @click="saveDraft" block theme="pink">保存草稿</tm-button>
				</tm-sheet>
			</tm-form>
			
			
			<tm-form v-if="step == 2 && loadingShow == false" @submit="submit" ref="formData" @request="success" method="post" url="">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">楼盘详情</text>
					</view>
					<tm-input name="tit" required title="售楼电话" placeholder="请输入售楼电话" v-model="reqData.tit"></tm-input>
					<tm-input name="xq" required title="职业顾问" placeholder="请输入职业顾问" v-model="reqData.xq"></tm-input>
					<tm-input name="xqzb" required title="售楼地址" placeholder="请输入售楼地址" v-model="reqData.xqzb"></tm-input>
					<tm-input name="city" required title="开发商" placeholder="请输入开发商" v-model="reqData.city"></tm-input>
					
					<tm-pickersDate :show-detail="{year:true,month:false,day:false,hour:false,min:false,sec:false}" :default-value="reqData.chuchangtime">
						<tm-input name="chuchangtime" required title="预售许可证" placeholder="请选择预售许可证时间" disabled :value="reqData.chuchangtime" right-icon="icon-angle-right"></tm-input>
					</tm-pickersDate>
					
					<tm-pickersDate :default-value="reqData.chuchangtime">
						<tm-input name="chuchangtime" required title="开盘时间" placeholder="请选择开盘时间" disabled :value="reqData.chuchangtime" right-icon="icon-angle-right"></tm-input>
					</tm-pickersDate>
					
					<tm-pickersDate :default-value="reqData.chuchangtime">
						<tm-input name="chuchangtime" required title="交房时间" placeholder="请选择交房时间" disabled :value="reqData.chuchangtime" right-icon="icon-angle-right"></tm-input>
					</tm-pickersDate>
					
					
					
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">建筑信息</text>
					</view>
					<tm-col color="blue text-size-xs" :grid="9">
						<tm-input name="gtmj" required title="占地面积" input-type="digit" v-model="reqData.gtmj"></tm-input>
					</tm-col>
					<tm-col color="text-weight-b text-size-xs" :grid="3" style="line-height: 102rpx;">
						<view style="width: 100%;height: 60rpx;margin: 21rpx 0;line-height: 60rpx;" class="flex-around round-a-25 green">
							<view @click="landAreaUnit = '㎡'" :class="landAreaUnit == '亩'?'round-l-25 grey':'round-l-25'" style="width: 50%;height: 100%;">
								㎡
							</view>
							<view @click="landAreaUnit = '亩'" :class="landAreaUnit == '㎡'?'round-r-25 grey':'round-r-25'" style="width: 50%;height: 100%;">
								亩
							</view>
						</view>
					</tm-col>
					
					<tm-col color="blue text-size-xs" :grid="9">
						<tm-input name="gtmj" required title="建筑面积" input-type="digit" v-model="reqData.gtmj"></tm-input>
					</tm-col>
					<tm-col color="text-weight-b text-size-xs" :grid="3" style="line-height: 102rpx;">
						<view style="width: 100%;height: 60rpx;margin: 21rpx 0;line-height: 60rpx;" class="flex-around round-a-25 green">
							<view @click="buildAreaUnit = '㎡'" :class="buildAreaUnit == '亩'?'round-l-25 grey':'round-l-25'" style="width: 50%;height: 100%;">
								㎡
							</view>
							<view @click="buildAreaUnit = '亩'" :class="buildAreaUnit == '㎡'?'round-r-25 grey':'round-r-25'" style="width: 50%;height: 100%;">
								亩
							</view>
						</view>
					</tm-col> 
					
					<tm-input name="qjmj" required title="总户数" input-type="digit" v-model="reqData.qjmj" suffix="户"></tm-input>
					<tm-input name="money1" required title="容积率" input-type="digit" v-model="reqData.money1" suffix="%"></tm-input>
					<tm-input name="fxiaoj" required title="绿化率" input-type="digit" v-model="reqData.fxiaoj" suffix="%"></tm-input>
					<tm-input name="fxiaoj" required title="车位数" input-type="digit" v-model="reqData.fxiaoj" ></tm-input>
					<tm-input name="fxiaoj" required title="车位比" input-type="digit" v-model="reqData.fxiaoj" ></tm-input>
					
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">物业信息</text>
					</view>
					<tm-input name="fxiaoj" required title="物业公司" input-type="digit" v-model="reqData.fxiaoj" ></tm-input>
					<tm-input name="fxiaoj" required title="物业费" input-type="digit" v-model="reqData.fxiaoj" suffix="元"></tm-input>
					<tm-input name="fxiaoj" required title="入口" input-type="digit" v-model="reqData.fxiaoj" placeholder="如：5个车位入口14个小门"></tm-input>
					<tm-input :vertical="true" required :height="150" input-type="textarea" bg-color="grey-lighten-5" :maxlength="200"  title="卫生服务" placeholder="如：物业保洁 定时打扫"  v-model="reqData.beizu" ></tm-input>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
						<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
					</view>
					<tm-button @click="saveDraft" block theme="pink">保存草稿</tm-button>
				</tm-sheet>
			</tm-form>
		</view>
	</view>
</template>
<script>
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmRadio from '@/pagesUser/tm-vuetify/components/tm-radio/tm-radio.vue';
	import tmGroupradio from '@/pagesUser/tm-vuetify/components/tm-groupradio/tm-groupradio.vue';
	import tmCheckbox from '@/pagesUser/tm-vuetify/components/tm-checkbox/tm-checkbox.vue';
	import tmGroupcheckbox from '@/pagesUser/tm-vuetify/components/tm-groupcheckbox/tm-groupcheckbox.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmCol from '@/pagesUser/tm-vuetify/components/tm-col/tm-col.vue';
	import tmPickersDate from '@/pagesUser/tm-vuetify/components/tm-pickersDate/tm-pickersDate.vue';
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	export default {
		components: {tmForm,tmButton,tmRadio,tmGroupradio,tmCheckbox,tmGroupcheckbox,tmInput,tmCol,tmPickersDate,tmSheet},
		data() {
			return {
				step:1,
				loadingShow:true,
				landAreaUnit:'亩',
				buildAreaUnit:'亩',
				reqData:{
					xq:'',//楼盘名
					tit:'',//楼盘标题
					xqzb:'',//楼盘坐标
					city:'',//楼盘区域
					xqadd:'',//楼盘详细位置
					gtmj:'',//公摊面积
					qjmj:'',//区间面积
					money1:'',//参考均价
					fxiaoj:'',//分销佣金
					zxqk:'',//装修情况
					huxing:'',//户型情况
					wylx:'',//物业类型
					wytsid:'',//物业特色
					jiaot:'',//楼盘交通
					lpzt:'',//楼盘状态
					ifxj:'',//是否下架
				},
				checkList:{
					'furnish':[],
					'wylxs':[],
					'wytss':[]
				},
				huxing:[
					{id:1,title:"一居室",checked:false},
					{id:2,title:"二居室",checked:false},
					{id:3,title:"三居室",checked:false},
					{id:4,title:"四居室",checked:false},
					{id:5,title:"五居室",checked:false}
				],
				jiaotong:[
					{id:1,title:"近公交",checked:false},
					{id:2,title:"近地铁",checked:false},
				],
				shangjia:[
					{id:0,title:"上架",checked:true},
					{id:1,title:"下架",checked:false}
				],
				loupanStatus:[
					{id:0,title:"在售",checked:true},
					{id:1,title:"代售",checked:false},
					{id:2,title:"售完",checked:false}
				]
			}
		},
		onLoad() {
			
		},
		onShow() {
			let that = this
			let checkList = that.checkList
			if(checkList['furnish'].length == 0){
				that.$apis.getInputBuild({})
				.then(res => {
					checkList = res
					that.setData({
						checkList:checkList,
						loadingShow:false
					})
				})
			}
			
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			if(JSON.stringify(currPage.$vm.locaData) != "{}" && JSON.stringify(currPage.$vm.locaData) != undefined){
				let json = currPage.$vm.locaData;
				let reqData = that.reqData
				reqData.xq = json.title
				reqData.xqzb = json.location.lng+","+json.location.lat
				reqData.city = json.ad_info.province+","+ json.ad_info.city +","+json.ad_info.district
				reqData.xqadd = json.address
				that.setData({
					reqData:reqData
				})
			}
			
		},
		methods: {
			/**
			 * 跳转到地图选点
			 */
			goMap:function(){
				uni.navigateTo({
					url:"./buildMap"
				})
			},
			obTstr2:function() {
				
			},
			saveDraft:function(e){
				uni.showToast({
					icon:"none",
					title:"功能开发中"
				})
			},
			submit:function(e){
				let that = this
				let reqData = e
				var huxing = []
				for(var i = 0; i < (reqData.huxing).length; i++){
					huxing.push(reqData.huxing[i].value)
				}
				e.huxing = huxing.toString();
				
				var zxqk = []
				for(var i = 0; i < (reqData.zxqk).length; i++){
					zxqk.push(reqData.zxqk[i].value)
				}
				e.zxqk = zxqk.toString();
				
				var wylx = []
				for(var i = 0; i < (reqData.wylx).length; i++){
					wylx.push(reqData.wylx[i].value)
				}
				e.wylx = wylx.toString();
				
				var wytsid = []
				for(var i = 0; i < (reqData.wytsid).length; i++){
					wytsid.push(reqData.wytsid[i].value)
				}
				e.wytsid = wytsid.toString();
				
				var jiaot = []
				for(var i = 0; i < (reqData.jiaot).length; i++){
					jiaot.push(reqData.jiaot[i].value)
				}
				e.jiaot = jiaot.toString();
				
				e.lpzt = reqData.lpzt[0].index;
				
				e.ifxj = reqData.ifxj[0].index;
				
				e.step = that.step;
				that.$apis.addBuild(e)
				.then(res => {
					that.setData({
						step:2,
						bh:res['bh']
					})
				})
			}
		}
	}
</script>
<!-- 1634715624lp9 -->
<style>

</style>
