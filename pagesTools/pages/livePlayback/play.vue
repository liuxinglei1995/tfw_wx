<template>
	<view v-if="passAudit == '0'">
		<tm-menubars :fllowTheme="false" :transparent="true" :shadow="0" title="视频播放" fontColor="white" :showback="true"></tm-menubars>
		
		<video 
		:style="'width: 100%;height: '+height+'px;'"
		:src="'https://static.tianfucd.com/'+video_info.videofile" 
		:autoplay="true"
		:show-center-play-btn="true"
		:show-fullscreen-btn="false"
		:show-play-btn="true"
		:title="video_info.title"
		:controls="true"
		></video>
		
		<tm-images
			src="https://static.tianfucd.com/img/logo/logo_video.png"
			style="position: fixed;top: 150rpx;left: 30rpx;width: 200rpx;"
		></tm-images>
		<view class="flex-top-start text-size-n text-overflow-2" style="position: fixed;bottom: 120rpx;color: #FFF;">
			<view class="px-20">
				{{video_info.title}}
			</view>
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
	//tm-flowLayout
		import tmMenubars from "@/pagesTools/tm-vuetify/components/tm-menubars/tm-menubars.vue"
		import tmImages from "@/pagesTools/tm-vuetify/components/tm-images/tm-images.vue"
		import noData from "@/components/noData/noData.vue"
		export default {
			components:{tmMenubars,tmImages,noData},
			data() {
				return {
					video_info:{},
					isShow: false,
					passAudit : uni.getStorageSync('passAudit')=="0"?uni.getStorageSync('passAudit'):"1",
				};
			},
			onLoad(option) {
				let that = this
				if(!option.id){
					uni.redirectTo({
					    url: 'livePlayback'
					});
				}else{
					uni.getSystemInfo({
						success: function (res) {
							that.setData({
								height:res.windowHeight
							})
						}
					});
					that.setData({
						id : option.id
					})
					that.livePlaybackInfo()
				}
			},
			methods: {
				livePlaybackInfo(){
					let that = this
					that.$apis.livePlaybackInfo({
						id:that.id
					}).then(res => {
						that.setData({
							video_info:res
						})
					})
				}
			},
		}
</script>
