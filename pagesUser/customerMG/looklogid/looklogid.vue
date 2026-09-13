<template>
	<view>
		<tm-menubars title="带看详情" iconColor="white"></tm-menubars>
		<button v-if="form.confirmId" class="button" type="primary" @click="goto()"><text
				class="button-text">已确认带看确认时间:</text>{{form.confirmTime}}</button>
		<button v-else class="button" type="primary" @click="toggle()"><text class="button-text">带看确认二维码</text></button>
		<reportingHistoryForm :propsid="businessKey" v-if="businessKey"></reportingHistoryForm>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<image style="height: 250px;width: 250px;" :src="wxqrcode"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import UAlbum from "@/pagesUser/uview-ui/components/u-album/u-album.vue";
	import UStepsItem from "@/pagesUser/uview-ui/components/u-steps-item/u-steps-item.vue";
	import USteps from "@/pagesUser/uview-ui/components/u-steps/u-steps.vue";
	import reportingHistoryForm from '@/pagesUser/components/reporting-History-Form/reporting-History-Form.vue';
	import uniPopup from '@/pagesUser/components/uni-popup/components/uni-popup/uni-popup';
	import {
		historyFromData,
		getReporting,
		wxtest
	} from '@/api/houst.js'
	export default {
		components: {
			UAlbum,
			UStepsItem,
			USteps,
			reportingHistoryForm,
			uniPopup
		},
		dicts: ['tfw_look_type', 'tfw_yuye_type', 'tfw_time_type'],
		data() {
			return {
				type: 'center',
				businessKey: null,
				form: {},
				fromData: [],
				wxqrcode: null,
				autoId: null,
			}
		},
		methods: {
			goto() {
				this.$tab.navigateTo("/pagesUser/customerMG/looklogid/confirmbyid?autoId=" + this.autoId);
			},
			// 弹出层
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			// 带看二维码
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			imagepush(e) {
				let data = []
				e.forEach((item, index) => {
					data.push("https://static.tianfucd.com/" + item);
				});
				return data
			},
			getReporting() {
				getReporting(this.businessKey).then(response => {
					this.form = response.data;
					this.form.sourceTourists.customer = JSON.parse(this.form.sourceTourists.customer)

				});
			},
			historyFromData() {
				historyFromData(this.businessKey).then(response => {
					this.fromData = response.data;
					console.log(this.fromData, 'fromData')
				});
			},
		},
		onLoad(option) {
			if (option.id == '' || option.id == null) {} else {
				this.businessKey = option.id
				this.getReporting()
				this.historyFromData()
				let map = "autoId=" + option.autoId
				this.autoId = option.autoId
				wxtest({
					page: 'pagesUser/customerMG/looklogid/confirmbyid',
					scene: map
				}).then(res => {
					this.wxqrcode = "data:image/png;base64," + res
				})
			}
		},
	}
</script>

<style>

</style>