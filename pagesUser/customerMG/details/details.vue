<template>
	<view>
		<tm-menubars title="客源详情" iconColor="white"></tm-menubars>
		<view>
			<view>
				<div class="container">
					<p class="title">
						<dict-tag :options="dict.type.tfw_wtly" :value="resData.source" />
						<dict-tag :options="dict.type.tfw_wtlx" :value="resData.type" />
					</p>
					<p class="price" v-if="resData.type == 2 || resData.type == 3">
						{{ resData.rentingPriceMin ?
						        resData.rentingPriceMin : "--" }}元--{{
						resData.rentingPriceMax ? resData.rentingPriceMax : "--" }}元
					</p>
					<p class="price" v-if="resData.type == 1 || resData.type == 3">
						{{ resData.purchasePriceMin ?
						        resData.purchasePriceMin : "--"
						      }}万--{{ resData.purchasePriceMax ? resData.purchasePriceMax : "--" }}万
					</p>
					<p class="description" v-if="resData.type == 2 || resData.type == 3">
						{{ resData.rentingAreaMin ?
						          resData.rentingAreaMin : "--" }}㎡--{{
						resData.rentingAreaMax ? resData.rentingAreaMax : "--" }}㎡
						<dict-tag :options="dict.type.tfw_fuxing"
							:value="resData.rentingRoom ? resData.rentingRoom.split(',') : []" />
					</p>
					<p class="description" v-if="resData.type == 1 || resData.type == 3">
						{{ resData.purchaseAreaMin ?
						            resData.purchaseAreaMin : "--" }}㎡--{{
						  resData.purchaseAreaMax ? resData.purchaseAreaMax : "--" }}㎡
						<dict-tag :options="dict.type.tfw_fuxing"
							:value="resData.purchaseRoom ? resData.purchaseRoom.split(',') : []" />
					</p>
					<!-- <b class="offer">委托日期:{{resData.createTime}}</b> -->
					<!-- <b class="offer">最后跟进:{{resData.followTime?resData.followTime:""}}</b> -->
					<b
						class="offer">需求区域:{{ resData.area ? resData.area.split(",")[1] + resData.area.split(",")[2] : "" }}/{{ resData.remarks?resData.remarks:"" }}</b>
					<b class="offer">客源所属人:{{resData.nickName}}</b>
					<div v-for="(customer,index) in resData.customer" :key="index">
						<a class="subscribe-button" @click="call(customer.value)">拨打{{customer.name}}电话</a>
					</div>
					<div class="ribbon-wrap">
						<div class="ribbon">客源详情!</div>
					</div>
				</div>
			</view>
			<view>
				<u-tabs style="z-index: 32;" :list="list1" @click="click" :activeStyle="{
            color: '#6558d3',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }"></u-tabs>
				<!-- 跟进-->
				<view v-if="sticky">
					<button class="button" @click="getfollowListF">
						刷新
					</button>
					<view v-for="(item,index) in followList" :key="index">
						<uni-card>
							<view>
								<dict-tag :options="dict.type.tfw_gjmd" :value="item.type" />
								<u-album v-if="item.image" :maxCount="1" :urls="item.image"></u-album>
								<u-parse :content="item.content"></u-parse>
								<view style="display: flex;">
									<view style="margin-right: 30rpx;">
										{{item.deptName}}:{{ item.nickName }}
									</view>
									{{ item.createTime ? item.createTime : '尚无跟进时间'}}
								</view>
							</view>
						</uni-card>
					</view>
					<u-loadmore :status="status" />
				</view>
				<!-- 带看-->
				<view v-else>
					<button  class="button" @click="getlookafterF">刷新</button>
					<view v-for="(item,index) in lookLogList" @click="golooklogid(item.id,item.autoId)">
						<uni-card>
							<view>
								<dict-tag :options="dict.type.tfw_look_type" :value="item.type ? item.type : ''" />
								带看人:{{item.createName}}
								<br />
								<view v-if="item.confirmId">
									已经确认带看，确认时间:{{item.confirmTime}}
								</view>
								创建时间:{{item.createTime}}
								<br />
								带看时间:{{item.customerReportingTime}}
							</view>
						</uni-card>
					</view>
					<u-loadmore :status="logstatus" />
				</view>
				<view class="footer2 flex-center">
					<button class="btn2" @tap="showAdd">添加跟进</button>
					<button class="btn3" @tap="goaddlook(eId)">添加带看</button>
				</view>
			</view>
			<tm-poup style="z-index: 9999;" v-model="addShow" :height="1000" position="bottom">
				<view class="text-size-lg text-weight-b text-align-center py-30">
					房源跟进
				</view>
				<tm-form @submit="submit" ref="formData" @request="success" method="post">
					<tm-pickers :default-value="reqData.typeName" @confirm="typeSelect" :list="dict.type.tfw_gjmd"
						rang-key="label" name="type">
						<tm-input v-model="reqData.typeName" disabled required title="跟进类型"
							placeholder="请选跟进类型"></tm-input>
					</tm-pickers>
					<tm-input name="content" title="跟进内容" v-model="reqData.content"></tm-input>
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="3"></u-upload>
					<tm-button navtie-type="form">提交数据</tm-button>
				</tm-form>

			</tm-poup>

		</view>
	</view>
</template>

<script>
	import UUpload from "@/pagesUser/uview-ui/components/u-upload/u-upload.vue";
	import ULoadmore from "@/pagesUser/uview-ui/components/u-loadmore/u-loadmore.vue";
	import UParse from "@/pagesUser/uview-ui/components/u-parse/u-parse.vue";
	import UAlbum from "@/pagesUser/uview-ui/components/u-album/u-album.vue";
	import UTabs from "@/pagesUser/uview-ui/components/u-tabs/u-tabs.vue";

	import tmTags from "@/pagesUser/tm-vuetify/components/tm-tags/tm-tags.vue"
	import tmIcons from '@/pagesUser/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmPagination from '@/pagesUser/tm-vuetify/components/tm-pagination/tm-pagination.vue';
	import tmPoup from '@/pagesUser/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmForm from '@/pagesUser/tm-vuetify/components/tm-form/tm-form.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	import tmPickers from '@/pagesUser/tm-vuetify/components/tm-pickers/tm-pickers';
	import tmButton from '@/pagesUser/tm-vuetify/components/tm-button/tm-button';
	import uniCard from "@/pagesUser/components/uni-card/components/uni-card/uni-card.vue";
	import config from '@/config'

	import {
		getTourists,
		listFollow,
		addFollow,
		lookafter
	} from '@/api/houst.js'

	export default {
		dicts: ['tfw_wtly', 'tfw_wtlx', 'tfw_fuxing', 'tfw_gjmd', 'tfw_look_type'],
		components: {
			UUpload,
			ULoadmore,
			UParse,
			UAlbum,
			UTabs,
			tmTags,
			tmIcons,
			tmPagination,
			tmPoup,
			tmForm,
			tmInput,
			tmPickers,
			tmButton,
			uniCard
		},
		data() {
			return {
				//上传图片列表
				fileList1: [],
				reqData: {
					content: null,
					typeName: null,
					type: null,
					image: []
				},
				sticky: true,
				isLastPage: null,
				islLogLastPage: null,
				status: 'loadmore',
				logstatus: 'loadmore',
				// 总条数
				total: 0,
				followList: [],
				lookLogList: [],
				list1: [{
					name: '跟进',
				}, {
					name: '带看',
				}],
				eId: null,
				resData: null,
				followQueryParams: {
					pageNum: 1,
					pageSize: 5,
					eId: null,
				},
				logQueryParams: {
					pageNum: 1,
					pageSize: 5,
					customerId: null,
				},
				addShow: false,
			}
		},
		onReachBottom() {
			if (this.sticky) {
				if (this.isLastPage) {
					this.status = 'nomore'
				} else {
					this.followQueryParams.pageNum++;
					this.status = 'loading';
					setTimeout(() => {
						this.getfollowList()
					}, 500)
				}
			} else {
				console.log(this.logQueryParams);
				if (this.islLogLastPage) {
					this.logstatus = 'nomore'
				} else {
					this.logQueryParams.pageNum++;
					this.logstatus = 'loading';
					setTimeout(() => {
						this.getlookafter()
					}, 500)
				}
			}

		},
		onLoad(option) {
			if (option.id == '' || option.id == null) {} else {
				this.eId = option.id
				this.followQueryParams.eId = option.id
				this.reqData.eId = option.id
				this.logQueryParams.customerId = option.id
				this.getMandateInfo()
				this.getfollowList()
				this.getlookafter()
			}
		},
		methods: {
			goaddlook(e) {
				this.$tab.navigateTo('/pagesUser/customerMG/addlook?id=' + e)
			},
			golooklogid(e, autoId) {
				this.$tab.navigateTo('/pagesUser/customerMG/looklogid/looklogid?id=' + e + '&autoId=' + autoId)
			},
			getfollowListF() {
				this.followQueryParams.pageNum = 1
				this.followQueryParams.pageSize = 5
				this.followList = []
				this.getfollowList()
			},
			getlookafterF() {
				this.logQueryParams.pageNum = 1
				this.logQueryParams.pageSize = 5
				this.lookLogList = []
				this.getlookafter()
			},

			getlookafter() {
				lookafter(this.logQueryParams).then(res => {
					this.islLogLastPage = res.lastPage
					this.lookLogList = this.lookLogList.concat(res.rows);
					if (this.islLogLastPage) {
						this.logstatus = 'nomore'
					}
				})
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
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				console.log(event, "sssss");
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

							let b = JSON.parse(res.data).url;

							this.reqData.image = this.reqData.image.concat(JSON.parse(res.data)
								.fileName);
							setTimeout(() => {
								resolve(b)
							}, 1000)
						}
					});
				})
			},

			typeSelect(e) {
				this.reqData.typeName = e[0].data.label
				this.reqData.type = e[0].data.value
			},
			submit(e) {
				this.reqData.image = this.reqData.image.join(",")
				addFollow(this.reqData).then(res => {
					this.addShow = false
					this.getMandateInfo()
					this.followQueryParams.pageNum = 1
					this.followQueryParams.pageNum = 5
					this.followList = []
					this.getfollowList()
				})

			},
			/**
			 * 添加跟进
			 */
			showAdd: function() {
				this.addShow = true
			},
			//拨打电话
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			getMandateInfo() {
				getTourists(this.eId).then(res => {
					this.resData = res.data
					this.resData.customer = JSON.parse(this.resData.customer)
				})
			},
			// 获取跟进
			getfollowList() {
				listFollow(this.followQueryParams).then(res => {
					this.isLastPage = res.lastPage
					this.followList = this.followList.concat(res.rows);
					this.total = res.total;
					for (var i = 0; i < this.followList.length; i++) {
						console.log(this.followList[i]);
						if (this.followList[i].image) {
							var imagelist = this.followList[i].image.split(",")
							for (var i2 = 0; i2 < imagelist.length; i2++) {
								imagelist[i2] = "https://static.tianfucd.com/" + imagelist[i2]
							}
							this.followList[i].image = imagelist
						}
					}
					if (this.isLastPage) {
						this.status = 'nomore'
					}
				});
			},
			click(item) {
				if (item.name == "跟进") {
					this.sticky = true
				} else {
					this.sticky = false
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #F0F0F0;
	}

	.footer2 {
		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		background-color: #f7f7f7;
		z-index: 200;
		font-size: 12px;
		justify-content: space-between;
	}

	.footer2 button {
		margin: 0 !important;
		height: 100%;
		width: 100%;
		line-height: 100rpx !important;
		font-weight: unset;
		color: white;
		border-radius: 0;
		font-size: 28rpx;
	}

	.footer2 button:active {
		filter: brightness(90%);
	}

	.btn2 {
		background-color: rgb(255, 188, 57);
	}

	.btn3 {
		background-color: #38579b;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: left;
		color: #333333;
	}

	.time {
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}

	.type {
		font-size: 32rpx;
		font-weight: 400;
		text-align: left;
		color: #333333;
		letter-spacing: 0px;
	}


	.container {
		/* width: 300px; */
		padding: 15px;
		background: #ffffff;
		text-align: center;
		border: 1px solid #000;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.container .title {
		display: flex;
		justify-content: center;
	}

	.container .title label {
		font-size: 2rem;
		font-weight: 500;
		color: #333;
		text-align: center
	}

	.container .price {
		color: #6558d3;
		font-weight: 700;
		font-size: 2.2rem;
		margin: 10px 0;
	}

	.container .description {
		color: #3b3b3b;
		font-size: 1.1rem;
		margin: 10px 0 10px;
	}

	.container .offer {
		display: block;
		color: #555;
		font-size: 1rem;
		margin-top: 10px;
	}

	.subscribe-button {
		display: inline-block;
		padding: 5px 0;
		background-color: #6558d3;
		color: #fff;
		text-decoration: none;
		border: 1px solid #000;
		border-radius: 30px;
		font-size: 1.2rem;
		margin-top: 20px;
		width: 50%;
		font-weight: 500;
		transition: 0.2s ease;
	}

	.subscribe-button:hover {
		opacity: .85;
	}

	.ribbon-wrap {
		width: 80px;
		height: 80px;
		position: absolute;
		top: -20px;
		left: 50px;
		pointer-events: none;
	}

	.ribbon {
		width: 200px;
		font-size: 0.8rem;
		text-align: center;
		padding: 4px 0;
		border: 1px solid #000;
		background: #6558d3;
		color: #fff;
		position: absolute;
		transform: rotate(-45deg);
		right: -10px;
		top: 55%;
	}


	.button {
		/* typography */
		width: 100%;
		font-size: 20px;
		font-weight: 600;
		font-family: monospace;
		text-transform: uppercase;
		letter-spacing: 1px;

		/* ui */
		border: none;
		cursor: pointer;
		display: inline-block;
		margin-top: 10px ;
		border-radius: 8px;
		background: #6558d3;
		color: #fff;
		box-shadow: 0 0 0 3px #2f2e41, 0 6px 0 #2f2e41;
		transition: all 0.1s ease, background 0.3s ease;
	}

	.button:active {
		box-shadow: 0 0 0 3px #2f2e41, 0 4px 0 #2f2e41;
		transform: translateY(2px);
	}
</style>