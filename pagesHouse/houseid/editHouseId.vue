<template>
	<view>
		<tm-menubars title="快捷修改" iconColor="white"></tm-menubars>
		<!-- 基础表单校验 -->
		<uni-forms label-width="100" ref="valiForm" :rules="rules" :modelValue="valiFormData">
			<uni-forms-item label="售价" required name="sellingPrice" v-if="valiFormData.type==1 || valiFormData.type==3">
				<uni-easyinput v-model="valiFormData.sellingPrice" placeholder="请输入售价">
					<template #right>
						<view style="background-color: #00aaff">万</view>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="租金" required name="rental" v-if="valiFormData.type==2 || valiFormData.type==3">
				<uni-easyinput v-model="valiFormData.rental" placeholder="请输入租金">
					<template #right>
						<view style="background-color: #00ff22">元</view>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="房源状态" required name="state">
				<uni-data-select v-model="valiFormData.state"
					:localdata="dictFind.dictUniSelect(dict.type.tfw_state)"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="上架状态" required name="status">
				<uni-data-select v-model="valiFormData.status"
					:localdata="dictFind.dictUniSelect(dict.type.tfw_listing_status)"></uni-data-select>
			</uni-forms-item>
		</uni-forms>
		<button class="bottom-button " type="primary" @click="submit('valiForm')">提交</button>
	</view>
</template>

<script>
	import uniForms from '@/pagesHouse/components/uni-forms/components/uni-forms/uni-forms';
	import uniFormsItem from '@/pagesHouse/components/uni-forms/components/uni-forms-item/uni-forms-item';
	import uniEasyinput from "@/pagesHouse/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	import uniDataSelect from "@/pagesHouse/components/uni-data-select/components/uni-data-select/uni-data-select.vue";
	import {
		updateFangyuan
	} from "@/api/houst";
	export default {
		dicts: ['tfw_listing_status', 'tfw_state'],
		components: {
			uniForms,
			uniFormsItem,
			uniEasyinput,
			uniDataSelect
		},
		data() {
			return {
				// formsflag:false,
				valiFormData: {
					id: null,
					sellingPrice: null,
					rental: null,
					type: null,
					status: null,
					state: null,
				},
				// 校验规则
				rules: {
					rental: {
						rules: [{
							required: true,
							errorMessage: '租金不能为空'
						}, {
							format: 'number',
							errorMessage: '租金只能输入数字'
						}]
					},
					sellingPrice: {
						rules: [{
							required: true,
							errorMessage: '售价不能为空'
						}, {
							format: 'number',
							errorMessage: '售价只能输入数字'
						}]
					},
					state: {
						rules: [{
							required: true,
							errorMessage: '房源状态不能为空'
						}]
					},
					status: {
						rules: [{
							required: true,
							errorMessage: '上架状态不能为空'
						}]
					}
				},
			}
		},
		onLoad(e) {
			let data = e
			console.log('this.2222222222222222222', e);

			this.valiFormData.id = data.id
			if (data.sellingPrice != "undefined") {
				this.valiFormData.sellingPrice = data.sellingPrice
			}
			if (data.rental != "undefined") {
				this.valiFormData.rental = data.rental
			}
			this.valiFormData.type = data.type
			this.valiFormData.status = data.status
			this.valiFormData.state = data.state
			console.log('this.valiFormData', this.valiFormData);
			// this.formsflag=true
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('this.valiFormData', this.valiFormData);
					updateFangyuan(this.valiFormData).then(response => {
						uni.$emit('refreshData');
						this.$tab.navigateBack();
					})
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'error',

					})
				})
			},
		}
	}
</script>

<style>
	.bottom-button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>