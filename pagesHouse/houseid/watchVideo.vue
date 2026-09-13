<template>
	<view>
		<u-navbar title="个人中心" @rightClick="rightClick" :autoBack="true">
		</u-navbar>
		<video :style="'width: 100%;height: '+height+'px;'" :src="video_info.video" :autoplay="true"
			:show-center-play-btn="false" :show-fullscreen-btn="false" :show-play-btn="false" :title="video_info.title"
			:controls="false"></video>
		<view class="flex-top-start text-size-n text-overflow-2"
			style="position: fixed;bottom: 0rpx;height: 150rpx;color: #FFF;background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3313725490196078) 79%, rgba(0, 0, 0, 0.5215686274509804) 100%);">
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
		components: {
			tmMenubars
		},
		data() {
			return {
				height: 0,
				video_info: {},
			};
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				console.log('leftClick');
			}
		},
		onLoad(option) {
			this.video_info = option;
			this.height = uni.getSystemInfoSync().windowHeight;
			console.log(this.height);
		},
		onShow() {

		}

	}
</script>