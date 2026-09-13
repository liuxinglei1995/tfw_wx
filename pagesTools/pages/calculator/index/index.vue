<template>
	<view class="content">
		<tm-menubars title="房贷计算器" iconColor="white" ></tm-menubars>
		<calculator :bgcColor="'#FFF'" :btnColor="'#409EFF'"  @submit='submit'></calculator>
	</view>
</template>

<script>
	import calculator from '../../../components/calculator/index.vue'
	export default {
		components: {
			calculator
		},
		data() {
			return {
			}
		},
		onLoad() {

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
			submit(obj, type) {
				uni.navigateTo({
					url: type === 1 ? '../all-pay/index?data=' + encodeURIComponent(JSON.stringify(obj)) : '../pay/index?data=' + encodeURIComponent(JSON.stringify(obj))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs-line{
		background-color: #409EFF !important;
	}
	.active{
		color: #409EFF !important;
	}
	.wx-radio-input.wx-radio-input-checked::before {
	  border-radius: 50%; /* 圆角 */
	  width: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  height: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  line-height: 45rpx;
	  text-align: center;
	  font-size: 28rpx; /* 对勾大小 30rpx */
	  color: #fff; /* 对勾颜色 白色 */
	  background: #409EFF;
	  transform: translate(-50%, -50%) scale(1);
	  -webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>
