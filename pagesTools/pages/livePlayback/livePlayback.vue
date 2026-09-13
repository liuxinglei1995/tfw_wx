<template>
	<view  v-if="passAudit == '0'">
		<tm-menubars :fllowTheme="false" :shadow="0" title="精彩讲解" color="white" theme="white" :showback="true"></tm-menubars>
		<tm-search placeholder="请输入关键词进行搜索" v-model="keyword" bgColor="white" insertColor="grey"  :showRight="false" >
		</tm-search>
		<view class="pa-32 ">
			<tm-flowLayout @click="itemClick" ref="wafll">
				<template  v-slot:left="{hdata}">
					<view class="round-3 shadow-2 overflow white">
						<view style="position: relative;">
							<tm-images :previmage="false" :src="hdata.item.image"></tm-images>
							<tm-icons size="122" name="icon-playcircle-fill" color="black"
								style="position: absolute;top: 50%;left: 50%;margin-top: -61rpx;margin-left: -61rpx;opacity: 0.53;"></tm-icons>
							<view class="pa-10 text-size-s" style="position: absolute;bottom: 0px;background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6313725490196078) 79%, rgba(0, 0, 0, 0.5215686274509804) 100%);">
								<view class="text-overflow-2 text-white">
									<text>{{hdata.item.title}}</text>
								</view>
							</view>
							<view class="pl-10" style="position: absolute;top: 10rpx;color: #FFF;">
								<tm-icons size="24" name="icon-training" color="white" style="margin: auto;"></tm-icons>
								<text style="margin-left: 10rpx;font-size: 20rpx;">{{hdata.item.watched}}</text>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{hdata}">
					<view class="round-3 shadow-2 overflow white">
						<view style="position: relative;">
							<tm-images :previmage="false" :src="hdata.item.image"></tm-images>
							<tm-icons size="122" name="icon-playcircle-fill" color="black"
								style="position: absolute;top: 50%;left: 50%;margin-top: -61rpx;margin-left: -61rpx;opacity: 0.53;"></tm-icons>
							<view class="pa-10 text-size-s" style="position: absolute;bottom: 0px;background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6313725490196078) 79%, rgba(0, 0, 0, 0.5215686274509804) 100%);">
								<view class="text-overflow-2 text-white">
									<text>{{hdata.item.title}}</text>
								</view>
							</view>
							<view class="pl-10" style="position: absolute;top: 10rpx;color: #FFF;">
								<tm-icons size="24" name="icon-training" color="white" style="margin: auto;"></tm-icons>
								<text style="margin-left: 10rpx;font-size: 20rpx;">{{hdata.item.watched}}</text>
							</view>
						</view>
					</view>
				</template>
			</tm-flowLayout>
			<tm-flotbutton @click="toTopPage" size="n" color="white" font-color="grey" icon="icon-angle-up" :offset="[30,70]"></tm-flotbutton>
		</view>
	</view>
	<view v-else>
		<tm-menubars :fllowTheme="false" :shadow="0" title="404" color="white" theme="white" :showback="true"></tm-menubars>
		<view class="noData" style="margin-top: 200rpx;" v-if="isShow == false || networkType == 'none'">
			<noData :custom="true"><view class="title" @tap="update()">404</view></noData>
		</view>
	</view>
</template>

<script>
		var dateUtils = require('../../../library/util.js').dateUtils;
	//tm-flowLayout
		import tmFullView from "@/pagesTools/tm-vuetify/components/tm-fullView/tm-fullView.vue"
		import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
		import tmSearch from "@/pagesTools/tm-vuetify/components/tm-search/tm-search.vue"
		import tmActionSheet from "@/pagesTools/tm-vuetify/components/tm-actionSheet/tm-actionSheet.vue"
		import tmButton from "@/pagesTools/tm-vuetify/components/tm-button/tm-button.vue"
		import tmFlotbutton from "@/pagesTools/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue"
		import tmFlowLayout from "@/pagesTools/tm-vuetify/components/tm-flowLayout/tm-flowLayout.vue"
		import tmIcons from "@/pagesTools/tm-vuetify/components/tm-icons/tm-icons.vue"
		import tmLoadding from "@/pagesTools/tm-vuetify/components/tm-loadding/tm-loadding.vue"
		import tmImages from "@/pagesTools/tm-vuetify/components/tm-images/tm-images.vue"
		import tmTags from "@/pagesTools/tm-vuetify/components/tm-tags/tm-tags.vue"
		import tmMenu from "@/pagesTools/tm-vuetify/components/tm-menu/tm-menu.vue"
		
		import noData from "@/components/noData/noData.vue"
		export default {
			components:{tmFullView,tmMenubars,tmSearch,tmActionSheet,tmButton,
			tmFlotbutton,tmFlowLayout,tmIcons,tmLoadding,tmTags,tmMenu,tmImages,noData
			},
			data() {
				return {
					keyword:'',
					page:1,
					pageSize:8,
					isLoad:true,
					passAudit : uni.getStorageSync('passAudit')=="0"?uni.getStorageSync('passAudit'):"1",
					isShow: false,
				};
			},
			onLoad() {
				this.livePlaybackList();
			},
			onReachBottom() {
				if(this.isLoad){
					this.livePlaybackList();
				}
			},
			onPullDownRefresh() {
				//调用全局网络状态检测
				this.$unit.getNetWorkStatus();
				setTimeout(() => {
					uni.stopPullDownRefresh();
					this.getList();
				}, 1000);
			},
			methods: {
				/**
				 * 获取回放列表
				 */
				livePlaybackList(){
					let that = this
					if(that.passAudit == 1) return;
					that.$apis.livePlaybackList({
						page:that.page,
						pageSize:that.pageSize
					}).then(res => {
						var list2 = [];
						for(let i=0;i<res.length;i++){
							let h = Math.floor(Math.random()*400);
							if(h<200) h=150;
							list2.push({
								image:`https://static.tianfucd.com/${res[i]['videofile']}?vframe/jpg/offset/1`,
								title:res[i].title,
								watched:res[i].watched,
								id:res[i]['id']
							})
						}
						if(res.length == that.pageSize){
							that.setData({
								page:that.page+1
							})
						}else{
							that.isLoad = false
						}
						this.$nextTick(function(){
							this.$refs.wafll.pushData(list2)
						})
					})
				},
				toTopPage(){
					uni.pageScrollTo({
						scrollTop:0
					})
				},
				itemClick(e){
					uni.navigateTo({
					    url: 'play?id='+e.item.id
					});
				},
			},
		}
</script>
