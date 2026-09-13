<template>
	<view class="home">
		<view class="pb-50 text grey ">
			<tm-menubars title="小区录入" iconColor="white"></tm-menubars>
			<tm-form @submit="submit" ref="formData" @request="success" method="post">
				<tm-sheet :shadow="24" :padding="[12,24]" :margin="[24,24]">
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">小区封面图</text><text
							class="text-grey text-size-xs px-10">(最多可以上传1张)</text>
					</view>
					<view class="py-32 mx-12">
						<!-- <tm-upload color="grey" :url="uploadurl" name="uploadImg" :filelist.sync="reqData.uploadImg"
							:max="1" :grid="4" auto-upload="true"></tm-upload> -->
						<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
							:maxCount="3"></u-upload>
					</view>
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text">
						<text class="text-size-n text-weight-b ">小区信息</text>
					</view>
					<tm-input name="title" required title="小区标题" v-model="reqData.title"></tm-input>
					<tm-input name="refPrice" required title="小区价格" input-type="digit" v-model="reqData.refPrice"
						suffix="万"></tm-input>
					<tm-pickers :default-value="reqData.status" :list="dict.type.tfw_property_status" rang-key="label"
						name="tags" @confirm="statusselect">
						<tm-input v-model="reqData.statusname" disabled required title="楼盘状态" placeholder="点击快速录入"
							name="tags"></tm-input>
					</tm-pickers>
					<tm-pickers :default-value="reqData.city" :list="privencelist" rang-key="extName"
						children-key="children" btn-color="bg-gradient-amber-lighten" @confirm="selectarea">
						<tm-input :border-bottom="false" required title="地区区域" placeholder="请选择城市区域" disabled
							right-icon="icon-angle-right"></tm-input>
					</tm-pickers>
					<view class="py-12 px-24 mx-12 round-3 border-b-1 grey text" :class="tmVuetify.black ? 'bk' : ''">
						<text class="text-size-n text-weight-b ">详细信息</text><text
							class="text-grey text-size-xs  px-10">(请如实填写)</text>
					</view>
					<tm-pickers :default-value="reqData.featuredTags" :list="dict.type.tfw_featured_tags"
						rang-key="label" name="tags" @confirm="tagselect">
						<tm-input v-model="reqData.tags" disabled required title="特色标签" placeholder="点击快速录入"
							name="tags"></tm-input>
					</tm-pickers>
					<tm-pickers :default-value="reqData.propertyType" @confirm="typeSelect($event,index)"
						:list="dict.type.tfw_property_type" rang-key="label" name="type">
						<tm-input v-model="reqData.propertyTypename" disabled required title=" 物业类型"
							placeholder="点击快速录入"></tm-input>
					</tm-pickers>
					<tm-pickers :default-value="reqData.type" @confirm="newoldSelect($event,index)"
						:list="dict.type.tfw_new_old" rang-key="label" name="newold">
						<tm-input v-model="reqData.typename" disabled required title="小区分类"
							placeholder="点击快速录入"></tm-input>
					</tm-pickers>
					<tm-pickers :default-value="reqData.propertyRights" @confirm="propertyRightsSelect($event,index)"
						:list="dict.type.tfw_loupan_propertyrights" rang-key="label" name="propertyRights">
						<tm-input v-model="reqData.propertyRightsname" disabled required title="所有权"
							placeholder="点击快速录入"></tm-input>
					</tm-pickers>

					<tm-input :vertical="true" required :height="150" input-type="textarea" bg-color="grey-lighten-5"
						:maxlength="200" title="小区描述" placeholder="请输入,不超过200字符" v-model="reqData.detail"></tm-input>
					<!-- 	<view class="mx-32 my-12 border-b-1  pb-12 flex-between" :class="tmVuetify.black ? 'bk' : ''">
						<text class="text-size-n ">是否为事故车</text>
						<tm-groupradio name="shiguche" @change="shiguchechange">
							<tm-radio :name="item.title" v-for="(item,index) in shifoushiguche" :key="index"
								v-model="item.checked" :label="item.title"></tm-radio>
						</tm-groupradio>
					</view> -->
					<!-- <view class="mx-32 my-24 border-b-1  pb-24 flex-between" :class="tmVuetify.black ? 'bk' : ''">
						<text class="text-size-n ">发布后是否立即上架</text>
						<view>
							<tm-switch v-model="reqData.shangjia"></tm-switch>
						</view>
					</view> -->
					<view class="px-24">
						<tm-button navtie-type="form" theme="bg-gradient-blue-accent" block>提交数据</tm-button>
						<view class="py-32 text-size-s text-grey text-align-center">请注意资料的上传，必填项。</view>
					</view>
				</tm-sheet>
			</tm-form>
		</view>
	</view>
</template>
<script>
	import UUpload from "@/pagesUser/uview-ui/components/u-upload/u-upload.vue";
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button.vue';
	import tmRadio from '@/pagesUser/tm-vuetify/components/tm-radio/tm-radio.vue';
	import tmGroupradio from '@/pagesUser/tm-vuetify/components/tm-groupradio/tm-groupradio.vue';
	// import tmGroupcheckbox from '../components/tm-groupcheckbox/tm-groupcheckbox.vue';
	// import tmCheckbox from '../components/tm-checkbox/tm-checkbox.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmSheet from '@/pagesUser/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmPickersCity from '@/pagesUser/tm-vuetify/components/tm-pickersCity/tm-pickersCity.vue';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers.vue';
	import tmUpload from '@/pagesUser/tm-vuetify/components/tm-upload/tm-upload.vue';

	import config from '@/config'
	import {
		handleTree
	} from '@/utils/util.js'
	import {
		addLpxq,
		getlist
	} from '@/api/houst.js'
	export default {
		dicts: ['tfw_featured_tags', 'tfw_property_type', 'tfw_new_old', 'tfw_property_status',
			'tfw_loupan_propertyrights'
		],
		components: {
			UUpload,
			tmForm,
			tmButton,
			tmRadio,
			tmGroupradio,
			tmInput,
			tmSheet,
			tmPickersCity,
			tmUpload,
			// tmCheckbox,
			// tmGroupcheckbox,
			tmPickers
		},
		data() {
			return {
				reqData: {
					coverfile: "",
					title: "",
					refPrice: "",
					tags: '',
					featuredTags: '',
					city: [],
					type: "",
					typename: '',
					status: "",
					statusname: "",
					propertyType: "",
					propertyTypename: "",
					propertyRights: "",
					propertyRightsname: "",
					detail: "",
					provinceCode: "",
					cityCode: "",
					areaCode: "",
					uploadurl: config.baseUrl + '/common/uploadQiNiu'
				},
				fileList1: [],
				privencelist: []

			}
		},
		onLoad(options) {
			getlist(3).then(res => {
				this.privencelist = handleTree(res.data, "id", "parentId");
				console.log(this.privencelist, "sssssssscs");
			})
		},
		onShow() {},
		mounted() {
			this.$nextTick(function() {})
		},
		methods: {
			selectarea(e) {
				console.log(e, "aaaaaaa");
				this.reqData.provinceCode = e[0].data.id;
				this.reqData.cityCode = e[1].data.id;
				this.reqData.areaCode = e[2].data.id;
			},
			// 删除图片
			deletePic(event) {
				console.log(event);
				this[`fileList${event.name}`].splice(event.index, 1)
				this.reqData.image.splice(event.index, 1)
				console.log(this.reqData.image);
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
							this.reqData.coverfile = JSON.parse(res.data).fileName;
							setTimeout(() => {
								resolve(b)
							}, 1000)
						}
					});
				})
			},

			submit(e) {
				console.log(e, "kkkkkkk");
				console.log(this.reqData, "lllllll");
				if (e === false) {
					uni.$tm.toast("请填写必填项。")
				} else {
					addLpxq(this.reqData).then(res => {
						console.log(res);
						if (res.code == 200) {
							this.reqData = {
								coverfile: "",
								title: "",
								refPrice: "",
								tags: '',
								featuredTags: '',
								city: [],
								type: "",
								typename: '',
								status: "",
								statusname: "",
								propertyType: "",
								propertyTypename: "",
								propertyRights: "",
								propertyRightsname: "",
								detail: "",
								provinceCode: "",
								cityCode: "",
								areaCode: "",
								uploadurl: config.baseUrl + '/common/uploadQiNiu'
							};
							uni.$tm.toast("添加成功")
						}
					})
				}
			},
			success(e) {
				uni.$tm.toast(e.msg)
			},
			tagselect(e) {
				this.reqData.tags = e[0].data.label;
				this.reqData.featuredTags = e[0].data.value
			},
			typeSelect: function(e, key) {
				this.reqData.propertyTypename = e[0].data.label
				this.reqData.propertyType = e[0].data.value
			},
			newoldSelect: function(e, key) {
				this.reqData.typename = e[0].data.label
				this.reqData.type = e[0].data.value
			},
			statusselect: function(e, key) {
				this.reqData.statusname = e[0].data.label
				this.reqData.status = e[0].data.value
			},
			propertyRightsSelect: function(e, key) {
				this.reqData.propertyRightsname = e[0].data.label
				this.reqData.propertyRights = e[0].data.value
			},

		}
	}
</script>
<!-- 1634715624lp9 -->
<style>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	/* 自定义piker */
	.hidden {
		display: none !important;
	}

	.picker {
		width: 100%;
		background-color: #fff;
		bottom: 0;
		width: 100%;
		display: flex;
	}

	.pikerTitle {
		background-color: #f9f9f9;
		display: flex;
		justify-content: space-between;
		padding: 0rpx 40rpx;
		height: 80rpx;
		align-items: center;
		font-size: 28rpx;
	}

	/* 请选择户型 */
	.choose {
		color: #acacac;
	}

	.confirm {
		color: #3fbaa6;
		font-size: 30rpx;
	}

	.zhuti {
		color: #3fbaa6 !important;
	}

	.top1 {
		border-top: 2rpx solid #3fbaa6;
	}

	picker-view {
		padding: 0rpx 40rpx;
	}

	/* 户型样式 */
	.color {
		background-color: #eeeeee;
	}

	.guige {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: fixed;
		background-color: #fff;
		width: 100%;
		bottom: 0;
		z-index: 10000;
	}

	.guige text:first-of-type {
		font-size: 26rpx;
		color: #cfcfcf;
	}

	.top {
		display: flex;
		flex-direction: column;
		height: 130rpx;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
	}

	.top text:last-of-type {
		font-size: 34rpx;
		margin-top: 10rpx;
		font-weight: 400;
		color: #333;
	}

	.pickerIiew {
		color: #333;
	}

	picker-view-column view {
		font-size: 36rpx;
	}



	.phone {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0rpx;
		align-items: center;
	}

	radio {
		margin-left: 20rpx;
	}

	.item input {
		border-bottom: 1rpx solid #ccc;
	}

	.phone1 {
		width: 300rpx;
		font-size: 30rpx;
		text-align: left;
		border-bottom: 1rpx solid #ccc;
		padding-left: 20rpx;
	}

	.phone1[placeholder] {
		font-size: 36rpx;
	}

	tm-input {
		width: 150rpx;
		height: 35px;
		text-align: center;
		font-size: 28rpx;
		border-radius: 7rpx;
	}

	.topq {
		padding-left: 22rpx;
		padding-right: 22rpx;
	}

	.topq tm-input {
		border: 1rpx solid #ccc;
	}

	.qingkuang {
		justify-content: space-between;
	}

	.margin {
		display: flex;
		margin: 20rpx 0rpx;
		margin-bottom: 10rpx;
	}
</style>