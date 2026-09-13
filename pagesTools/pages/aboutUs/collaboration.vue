<template>
	<view>
		<tm-menubars title="异业入住" iconColor="white"></tm-menubars>
		<view class="formbox">
			<image class="bannerlogo" src="https://static.tianfucd.com/1708661442828.png">
			</image>
			<view class="formtitle">
				异业入住信息填写
			</view>
			<!-- 基础表单校验 -->
			<uni-forms label-width="100" ref="dklist" :modelValue="dklist">
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="dklist.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="手机号" required name="num">
					<uni-easyinput v-model="dklist.num" placeholder="请输入手机号" />
				</uni-forms-item>
				
				<uni-forms-item label="所在区域" required name="area">
					<uni-data-picker v-model="dklist.area" :localdata="privencelist"
						@change="onchange"></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="行业" required name="type">
					<uni-data-select v-model="dklist.type" :localdata="tfwlooktypeOptions"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="职务" required name="type">
					<uni-data-select v-model="dklist.type" :localdata="tfwlooktypeOptions"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="备注提醒" name="remark">
					<uni-easyinput v-model="dklist.remark" placeholder="请输入特殊备注" />
				</uni-forms-item>
			</uni-forms>
			<button
				style="background-color: #3c9cff;font-size: 16px; color: white;width:260rpx;height:80rpx;line-height: 80rpx;"
				@click="submit('dklist')">提交信息</button>
		</view>
	</view>
</template>

<script>
	import uniForms from '@/pagesTools/components/uni-forms/components/uni-forms/uni-forms';
	import uniFormsItem from '@/pagesTools/components/uni-forms/components/uni-forms-item/uni-forms-item';
	import uniDataSelect from '@/pagesTools/components/uni-data-select/components/uni-data-select/uni-data-select.vue';
	import uniEasyinput from "@/pagesTools/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	import uniDataPicker from "@/pagesTools/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue";
	import {
		getDicts
	} from "@/api/system/dict/data";
	import {
		handleSelectTree
	} from '@/utils/util.js'
	import {
		getlist
	} from '@/api/houst.js'
	export default {
		components: {
			uniForms,
			uniFormsItem,
			uniDataSelect,
			uniEasyinput,
			uniDataPicker
		},
		data() {
			return {
				tfwlooktypeOptions: [],
				privencelist: [],
				dklist: {},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					num: {
						rules: [{
							required: true,
							errorMessage: '请填写手机号码',
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = (
									/^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/
								); //手机号码
								if (!iphoneReg.test(value)) {
									callback('手机号码格式不正确，请重新填写')
								}
							}
						}]
					},
					type: {
						rules: [{
							required: true,
							errorMessage: '类型不能为空'
						}]
					},
					// area: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '地区不能为空'
					// 	}]
					// },
				}
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

			getDicts("tfw_loan_type").then(response => {
				this.tfwlooktypeOptions = this.dicts(response.data);
			});
			getlist(3).then(res => {
				this.privencelist = handleSelectTree(res.data, "id", "parentId", "children", "extName");
				console.log(this.privencelist, "sssssssscs");
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {


			this.$refs.dklist.setRules(this.rules)
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			dicts(e) {
				let data = []
				e.forEach((item, index) => {
					data.push({
						text: item.dictLabel,
						value: item.dictValue,
					});
				});
				return data
			},
		}
	};
</script>
<style>
	.formbox {
		padding: 40rpx 40rpx;
		box-sizing: border-box;
	}
	.bannerlogo {
		width: 100%;
		height: 400rpx;
		object-fit: cover;
	}
	.formtitle {
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 40rpx;
		background: linear-gradient(to right, #56c4ff, rgba(19, 194, 194, 1));
		border-radius: 8px;
		box-shadow: 0px 0px 8px 0px;
		font-family: 'Arial', sans-serif;
	}
</style>