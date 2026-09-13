<template>
	<view style="height: 100%;">
		<signil></signil>
	
	</view>
</template>

<script>
	import signil from "./signIn.vue"
	import set from "./set.vue"
	import TimeRecord from "./timeRecord.vue"

	export default {
		components: {
			signil,
			set,
			TimeRecord,
			
		},
		data() {
			return {
			}
		},
		onReady() {

		},
		onShow() {

		},
		methods: {
			dingweiBtn: function() {
				// 防抖操作
				const self = this;
				//频繁点击的时候销毁上一个定时器
				clearTimeout(self.tiems);
				//当没有频繁点击后，最后执行的定时器
				self.tiems = setTimeout(() => {
					self.dingwei()
				}, 1000)
			},
		
		}
	}
</script>

<style>

</style>