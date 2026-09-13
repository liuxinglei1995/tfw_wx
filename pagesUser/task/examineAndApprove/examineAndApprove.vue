<template>
	<view>
		<tm-menubars title="审批"></tm-menubars>
		<view v-if="open">
			<reportingHistoryForm v-if="open" :propsid="businessKey"></reportingHistoryForm>
			<view>
				<view v-for="(domain, index) in form.formData" :key="index">
					<view v-if="domain.flag">
						<text class="label">{{ domain.controlLable }}</text>
						<view class="step-row">
							<view v-if="'radio' == domain.controlType">
								<radio-group v-model="domain.controlValue" @change="changeradio(domain.controlLable)">
									<radio v-for="(defaults, indexd) in domain.controlDefault.split('--__--')"
										:key="indexd" :value="indexd" :checked="indexd==0?true:false">
										{{ defaults }}
									</radio>
								</radio-group>
							</view>
							<view v-else-if="'input' == domain.controlType">
								<input v-model="domain.controlValue" />
							</view>
							<view v-else-if="'textarea' == domain.controlType">
								<textarea v-model="domain.controlValue"></textarea>
							</view>
							<view v-else-if="'imageupload' == domain.controlType">
								<!-- 自定义的 image-upload 组件，确保引入和使用正确 -->
								<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1"
									multiple :maxCount="3"></u-upload>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view style="height: 30rpx;width:120rpx; border-radius:16rpx;background-color:orangered; margin: 40rpx;padding: 10rpx;color: white;text-align: center;"
				@click="nextTick">
				继续下一步
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formDataShow,
		formDataSave
	} from '@/api/houst.js'
	import reportingHistoryForm from '@/pagesUser/components/reporting-History-Form/reporting-History-Form.vue';
	import uniForms from '@/pagesUser/components/uni-forms/components/uni-forms/uni-forms';
	import uniFormsItem from '@/pagesUser/components/uni-forms/components/uni-forms-item/uni-forms-item';
	import Upload from "@/pagesUser/uview-ui/components/u-upload/u-upload.vue";
	import config from '@/config'
	export default {
		components: {
			reportingHistoryForm,
			uniForms,
			uniFormsItem,
			Upload,
		},
		data() {
			return {
				definitionKey: null,
				businessKey: null,
				businessName: null,
				id: null,
				form: {},
				open: false,
				fileList1: [],
			}
		},
		onLoad(e) {
			let row = JSON.parse(e.data)
			this.reset()
			this.definitionKey = row.definitionKey;
			this.businessKey = row.businessKey;
			this.businessName = row.name
			this.id = row.id;
			formDataShow(row.id).then(response => {
				let datas = response.data;
				let formData = []
				if (datas) {
					console.log(datas, "156464");
					for (let i = 0; i < datas.length; i++) {
						let strings = datas[i].split('--__!!')
						let controlValue = null
						let controlDefault = null
						let radiochecked = false
						switch (strings[1]) {
							case 'radio':
								controlValue = 0;
								controlDefault = strings[4]
								break;
								// default:
						}
						formData.push({
							controlId: strings[0],
							controlType: strings[1],
							controlLable: strings[2],
							controlIsParam: strings[3],
							controlValue: controlValue,
							controlDefault: controlDefault,
							flag: true,
						})

					}
				}
				this.form.formData = formData;
				console.log(this.form);
				this.open = true;
			});
		},
		methods: {
			// 表单重置
			reset() {
				this.definitionKey = '',
					this.businessKey = '',
					this.form = {
						formData: [],
					};
			},
			// 新增图片
			async afterRead(event) {
				console.log(event, "sssss");
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.baseUrl + '/common/uploadQiNiu', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log(res, "2222222");
							let b = JSON.parse(res.data).url;
							console.log(b, "33333");
							this.form.formData[0].controlValue = JSON.parse(res.data).fileName;
							setTimeout(() => {
								resolve(b)
							}, 1000)
						}
					});
				})
			},

			// 删除图片
			deletePic(event) {
				console.log(event);
				this[`fileList${event.name}`].splice(event.index, 1)
				this.reqData.image.splice(event.index, 1)
				console.log(this.reqData.image);
			},
			//提交下一步
			nextTick() {
				console.log(this.form.formData,
					"11111111123313");
				formDataSave(this.id, this.form.formData).then(response => {
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						uni.hideLoading();
						uni.$emit('refreshData');
						uni.navigateBack({
							delta: 1
						})
					}, 1000);
				});
			},
			changeradio(e) {
				if (e == "是否成交") {
					for (let index = 0; index < this.form.formData.length; index++) {
						if (this.form.formData[index].controlLable != "是否成交") {
							this.form.formData[index].flag = !this.form.formData[index].flag
						}
					}
				}
			},
		}
	}
</script>

<style>

</style>