<template>
	<view class="">
		<tm-menubars title="房源跟进" iconColor="white"></tm-menubars>
		<rxl-timeline v-if="list.length > 0">
			<rxl-timeline-item v-for="(item,index) in list" :key="index" :timestamp="item.time" :size="20" :showTail="true" color="#4CAF50">
				<tm-icons slot="icon" size="36" color="grey" name="icon-clock"></tm-icons>
				<view slot="body">
					<view style="color:#000000">
						{{item.title}}
						<view style="color: #555555;font-size: 28rpx;" class="pt-20">
							{{item.content}}
						</view>
					</view>
				</view>
			</rxl-timeline-item>
		</rxl-timeline>
		<view class="footer2 flex-center">
			<button class="btn2 red" @tap="showManage">管理跟进</button>
			<button class="btn3 green" @tap="showAdd">添加跟进</button>
		</view>
		<tm-poup v-model="addShow" :height="1000" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				房源跟进
			</view>
			
			<tm-form @submit="submit" ref="formData" @request="success" method="post">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="mx-32 my-12 border-b-1  pb-12 flex-col">
						<text class="text-size-n ">跟进方式</text>
						<tm-groupradio name="shiguche" @change="shiguchechange">
							<tm-radio :name="item.title" v-for="(item,index) in shifoushiguche" :key="index" v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view>
					
					<tm-input :adjust-position="true" :vertical="true" required :height="150" input-type="textarea" bg-color="grey-lighten-5" :maxlength="200"  title="跟进内容" placeholder="请输入,不超过200字符"  v-model="reqData.beizu" ></tm-input>
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
					</view>
				</tm-sheet>
			</tm-form>
		</tm-poup>
		<tm-poup v-model="manageShow" :height="1000" position="bottom">
			<view class="text-size-lg text-weight-b text-align-center py-30">
				跟进管理
			</view>
			
			<tm-empty v-if="myFollows.length == 0"></tm-empty>
			<tm-sheet v-else v-for="(item,index) in myFollows" :key="index">
				<view class="title flex-between">
					{{item.name}} 
					<text class="time">{{item.gjsj}}</text>
				</view>
				<view class="my-15 type">
					[ {{item.type}} ]
					<text class="pl-20">{{item.texts}}</text>	
				</view>
				<view style="margin-top: -50rpx;width: 100%;position: relative;top: -10rpx;left: 560rpx;" @click.stop="followId = item.id,ifdel=true">
					<tm-icons size="32" color="red" name="icon-delete-fill"></tm-icons>
				</view>
			</tm-sheet>
		</tm-poup>
		<tm-dialog confirmText="确定删除" cancelText="取消" @confirm="delFollowUp" v-model="ifdel" content="该操作不可逆,是否确认删除!" theme="split"></tm-dialog>
	</view>
</template>

<script>
	import getDateTime from '@/utils/getdateTime.js';
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue'
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue'
	import tmTimeline from '@/tm-vuetify/components/tm-timeline/tm-timeline.vue'
	import tmForm from '@/tm-vuetify/components/tm-form/tm-form.vue'
	import tmInput from '@/tm-vuetify/components/tm-input/tm-input.vue'
	import tmGroupradio from '@/tm-vuetify/components/tm-groupradio/tm-groupradio.vue'
	import tmRadio from '@/tm-vuetify/components/tm-radio/tm-radio.vue'
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue'
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue'
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue'
	import tmDialog from '@/tm-vuetify/components/tm-dialog/tm-dialog.vue'
	export default {
		components:{tmDialog,tmIcons,tmSheet,tmTimeline,tmPoup,tmForm,tmInput,tmGroupradio,tmButton,tmRadio,tmEmpty},
		data() {
			return{
				list:[
					
				],
				shifoushiguche:[
					{title:"去电",checked:null},
					{title:"来电",checked:null},
					{title:"看房",checked:null},
					{title:"勘察",checked:null},
					{title:"来访",checked:null},
					{title:"拜访",checked:null},
				],
				siteConfigs:uni.getStorageSync('siteConfigs'),
				
				reqData:{
					beizu:""
				},
				myFollows:[],
				
				addShow:false,
				manageShow:false,
				ifdel:false
			}
		},
		onLoad(option) {
			let that = this
			if(option.bh == '' || option.bh == null){
				
			}else{
				that.setData({
					houstbh : option.bh
				})
				that.getAgentShopInfo(option.bh)
			}
		},
		methods:{
			delFollowUp:function(e){
				let that = this
				let followId = that.followId
				that.$apis.delFollowUp({
					id:followId
				})
				.then(res => {
					uni.showToast({
						icon:"success",
						title:"成功"
					})
					that.getAgentShopInfo(that.houstbh,true)
					this.manageShow = false
				})
			},
			showManage:function(e){
				let that = this
				that.$apis.getMyFollowUp({
					bh:that.houstbh
				}).then(res => {
					that.setData({
						myFollows : res,
						manageShow:true
					})
				})
			},
			submit:function(e){
				let that = this
				let reqData = this.reqData
				reqData['bh'] = that.houstbh
				
				that.$apis.addFollowUp({
					'bh' : reqData['bh'],
					'followType' : reqData['followType'],
					'beizu' : reqData['beizu']
				}).then(res => {
					uni.showToast({
						icon:"success",
						title:"成功"
					})
					that.getAgentShopInfo(that.houstbh,true)
					this.addShow = false
				})
			},
			shiguchechange:function(e){
				let that = this
				let reqData = that.reqData
				if(e[0].checked){
					reqData['followType'] = e[0].name
				}
			},
			/**
			 * 添加跟进
			 */
			showAdd:function(){
				this.addShow = true
			},
			goShare:function(id){
				uni.navigateTo({
					url:"../../pagesTools/pages/shopShare/shopShare?id="+id
				})
			},
			change(e){
				let that = this
				that.setData({
					shopType:this.list[e],
					page:1,
					houstList:[],
					loadmoreShow:false,
					loadmore:true,
				})
				that.getShopHouseList()
			},
			/**
			 * 获取跟进列表
			 * @param {Object} bh
			 */
			getAgentShopInfo : function(bh,clean){
				let that = this
				var list = (clean==false)?that.list:[]
				that.$apis.getFollowUp({
					fangBh:bh
				}).then(res => {
					if(res.length == 0){
						list.push({
							title:'文方天府网',
							content:'该房源暂无任何跟进',
							time:getDateTime.dateTimeStr('y-m-d h:i'),
							color:"green",
							borderColor:'green',
							icon:'',
							size:36
						})
					}else{
						for(var i = 0 ; i < res.length ; i++){
							let gj = {
								title:res[i]['name']+' ['+res[i]['type']+']',
								content:res[i]['texts'],
								time:res[i]['gjsj'],
								color:"green",
								borderColor:'green',
								icon:'',
								size:36
							}
							list.push(gj)
						}
					}
					that.setData({
						list:list
					})
				})
			},
		}
	}
</script>

<style>
	.footer2 {
	    position: fixed;
	    bottom: 0px;
	    display: flex;
	    align-items: center;
	    box-sizing: border-box;
	    width: 100%;
	    height: 50px;
	    background-color: #f7f7f7;
	    z-index: 200;
	    font-size: 12px;
	    justify-content: space-between;
	}
	.footer2 button {
		margin: 0 !important;
		height: 100%;
		width: 100%;
		line-height: 100rpx !important;
		font-weight: unset;
		color: white;
		border-radius: 0;
		font-size: 28rpx;
	}
	.footer2 button:active {
		filter: brightness(90%);
	}
	
	.btn2 {
		background-color: rgb(255, 188, 57);
	}
	
	.btn3 {
		background-color: #27bbb2;
	}
	.title{font-size: 36rpx;font-weight: bold;text-align: left;color: #333333;
	}
	.time{font-size: 24rpx;font-weight: 400;text-align: left;color: #999999;}
	.type{font-size: 32rpx;font-weight: 400;text-align: left;color: #333333;letter-spacing: 0px;}
</style>
