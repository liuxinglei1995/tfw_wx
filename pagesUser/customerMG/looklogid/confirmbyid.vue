<template>
	<view>
		<tm-menubars title="确认带看" iconColor="white"></tm-menubars>
		<uni-card v-if="form">
			<view style="text-align: center;font-size: 18px;font-weight: 700;">赶集好房</view>
			<view style="text-align: center;font-size: 18px;font-weight: 700;">客户看房确认书</view>
			<view v-if="form.type == 1">
				<view>
					所有看房屋明细如下:
					<span v-for="(item, index) in form.loupanXqs" :key="index">
						{{ item.title }}小区id:{{ item.id }}</span>
				</view>
			</view>
			<view v-else>
				&nbsp;&nbsp;所有看房屋明细如下:
				<view v-for="(item, index) in form.houses" :key="index">
					{{ item.loupanXq.title }}:{{ item.building }}栋{{ item.unit}}单元{{ item.floor }}层{{ item.roomNum }}号
				</view>
			</view>
			<view>
				1、乙方将负责甲方的房屋租赁、购买中介服务，在服务过程中与甲方有关的事宜应给于协助；
			</view>
			<view>
				2、甲方在与上业主签订房屋租赁、买卖合同的同时支付乙方中介费，租赁业务收取签订物业首月租金的70%，买卖业务收取金额为合同约定成交价格的0.8%，（另：代办贷款服务费额外收取金额为2000元/户），相关费用于交付定金签合同同时一次性付清。
			</view>
			<view>
				3、 甲方未经乙方许可，不得通过任何途径直接或间接与房屋的产权人或代理人进行交易，否者视为甲方违约，甲方应赔付乙方违约金，金额为上述中介费的两倍：（此甲方亦包括与甲方有关联的第三人）
			</view>
			<view>
				4、 本确认书经甲乙双方确认，具有同等法律效力。
			</view>
			<view>
				5、 本确认书本着诚信、自愿的原则，如有纠纷按以上条款协商处理，也可向当地人民法院提起诉讼。
			</view>
		</uni-card>
		<button  v-if="form.confirmId" class="button" type="primary" ><text class="button-text">已确认</text></button>
		<button  v-else class="button" type="primary" @click="toggle()"><text class="button-text">确认</text></button>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<uni-popup-dialog cancelText="关闭" confirmText="同意" title="通知" content="点击确定代表您同意以上协议"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import uniPopup from '@/pagesUser/components/uni-popup/components/uni-popup/uni-popup';
	import uniPopupDialog from '@/pagesUser/components/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';
	import {
		confirmLook,
		getInfoByAutoId
	} from '@/api/houst.js'
	export default {
		components: {
			uniCard,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				autoId: null,
				form: null,
			}
		},
		methods: {
			dialogClose() {
				console.log('点击关闭')
			},

			dialogConfirm() {
				console.log('点击确认')
				confirmLook({
					autoId: this.autoId
				}).then(res => {
					if(res.code==200){
						uni.showToast({
						  icon: 'none',
						  title: res.msg
						})
						getInfoByAutoId(this.autoId).then(res => {
							this.form = res.data
						})
					}
				})
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
		},
		onLoad(e) {
			if (e.scene) {
				let str = decodeURIComponent(e.scene);
				let jsonStr = '{"' + str.replace(/=/g, '": "').replace(/&/g, '", "') + '"}';
				let jsonObj = JSON.parse(jsonStr);
				this.autoId = jsonObj.autoId
			}
			if (e.autoId) {
				this.autoId = e.autoId
			}
		},
		onShow() {
			getInfoByAutoId(this.autoId).then(res => {
				this.form = res.data
			})
		}
	}
</script>

<style>

</style>