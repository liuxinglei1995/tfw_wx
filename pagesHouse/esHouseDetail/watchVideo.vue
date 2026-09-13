<template>
	<view >
		<tm-menubars :fllowTheme="false" :transparent="true" :shadow="0" title="视频播放" fontColor="white" :showback="true"></tm-menubars>
		<video 
		:style="'width: 100%;height: '+height+'px;'"
		:src="'https://static.tianfucd.com/'+video_info.video" 
		:poster="'https://static.tianfucd.com/'+video_info.video+'?vframe/jpg/offset/5'"
		:autoplay="true"
		:show-center-play-btn="false"
		:show-fullscreen-btn="false"
		:show-play-btn="false"
		:title="video_info.title"
		:controls="false"
		></video>
		<view class="flex-top-start text-size-n text-overflow-2" style="position: fixed;bottom: 0rpx;height: 150rpx;color: #FFF;background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3313725490196078) 79%, rgba(0, 0, 0, 0.5215686274509804) 100%);">
			<view class="px-20">
				{{video_info.title}}
			</view>
		</view>
	</view>
</template>

<script>
	//tm-flowLayout
		import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
		export default {
			components:{tmMenubars},
			data() {
				return {
					video_info:{},
				};
			},
			onLoad(option) {
				let that = this
				that.setData({
					video_info : option
				})
				uni.getSystemInfo({
					success: function (res) {
						that.setData({
							height:res.windowHeight
						})
					}
				});
			},
			onShareAppMessage() {
				return {
				    title: this.video_info.title,
					content: this.video_info.title,
					imageUrl:"https://static.tianfucd.com/"+this.video_info.video+"?vframe/jpg/offset/5",
				    path: '/pagesHouse/esHouseDetail/watchVideo?video='+this.video_info.video+'&title='+this.video_info.title,
				}
			}
		}
</script>
