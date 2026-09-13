<template>
	<view class="lwming_ClockIn">
		<tm-menubars title="个人中心" iconColor="white"></tm-menubars>
		<view class="ClockIn_conten">
			<view class="container">
				<view class="header">
					<view class="header_Type" @click="Tabs_Type" :class="{ choose: activeType === false }">公司打卡</view>
					<view class="header_Type" @click="Tabs_Type" :class="{ choose: activeType === true }">外勤打卡</view>
				</view>
				<!-- 公司打卡 -->
				<view class="item_In" v-if="activeType === false">
					<view class="address">{{ ClockInObj.address }}</view>
					<img class="img" v-if="IS_Range === true" src="./static/OK.png" alt="">
					<img class="img" v-else src="./static/warn.png" alt="">
					<view class="IS_Range" :class="{ IS_Range_No: IS_Range === false }">{{ IS_Range_Content }}</view>
				</view>
				<!-- 出差打卡 -->
				<view class="item_In" v-else>
					<view class="address" @click="GetChooseLocation">{{ ClockInObj.street }}</view>
					<view class="address">{{ ClockInObj.Details }}</view>
				</view>
				<map :latitude="lat_current" :longitude="lng_current" :markers="covers" scale="16" :circles="circles"
					v-if="mapflag"></map>
				<!-- 打卡按钮 -->
				<view class="item_Button" :class="[showstatus=='签到' ? 'item_Button_Click' : '']">
					<view class="ring" @click="Submit">
						<view class="time">{{ time }}</view>
						<view class="time" v-if="activeType">外勤打卡</view>
						<view class="time" v-else>{{showstatus}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :value="value" @change="gotoothen" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
			border>
			<u-tabbar-item text="打卡" icon="home"></u-tabbar-item>
			<u-tabbar-item text="打卡记录" icon="photo"></u-tabbar-item>
		</u-tabbar>
		<!-- 备注拍照 -->
		<view class="remarkBigWarp" v-show="IsChange">
			<view class="remarkWarp">
				<view class="remarkWarpBox">
					<textarea value="" placeholder="填写备注" class="textTile" v-model="keycode" :auto-focus="autoBool" />
					<view class="photoBox">
						<uploadImg @click="getImgList"></uploadImg>
					</view>
				</view>
				<view class="btnWrap">
					<view class="cancel" style="color: #333;" @click="quxiaoFunc">取消</view>
					<view class="cancel" @click="quedingFunc">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UTabbar from "@/pagesTools/uview-ui/components/u-tabbar/u-tabbar.vue";
	import UTabbarItem from "@/pagesTools/uview-ui/components/u-tabbar-item/u-tabbar-item.vue";
	import uNavbar from "@/pagesTools/uview-ui/components/u-navbar/u-navbar.vue";
	import uploadImg from './components/uploadImg/uploadImg.vue';
	import {
		listByData
	} from "@/api/houst.js"
	export default {
		components: {
			UTabbarItem,
			UTabbar,
			uploadImg,
			uNavbar
		},
		data() {
			return {
				mapflag: false,
				userInfo: {},
				value: 0,
				IsChange: false, //控制“添加备注”
				autoBool: false, //textarea自动聚焦
				keycode: '', //输入框的值
				conBoll: true,
				ImgArr: [],
				covers: [],
				circles: [],
				activeType: false,
				time: '',
				ClockInObj: {
					street: '',
					Details: '',
					IsSuccess: false,
					address: '' //打卡类型
				},
				lat_current: 0, //当前位置
				lng_current: 0, //当前位置
				lat_In: 0, //设定公司打卡中心点
				lng_In: 0, //设定公司打卡中心点
				Distance_In: 0.005, //公司打卡半径范围
				Distance_Out: 0.020, //外勤打卡半径范围
				IS_Range: true, //是否在范围内
				IS_Range_Out: true, //外勤打卡是否在范围内
				IS_Range_Content: '你已在打卡范围内',
				showstatus: "签到"
			};
		},

		onShow() {
			var now = new Date();
			// 获取当前小时数和分钟数
			var hours = now.getHours();
			var minutes = now.getMinutes();
			if (hours > 12) {
				this.showstatus = "签退"
			}
			listByData().then(res => {
				console.log(res, 'res')
				if (res.rows.length > 0) {
					if (res.rows[0].signOutTime) {
						this.showstatus = "已签退"
					} else if(!res.rows[0].signInTime) {
						this.showstatus = "签到"
						if (hours > 12) {
							this.showstatus = "签退"
						}
					} else {
						this.showstatus = "签退"
					}
				}
			})
			//获取设定好的地址坐标（经纬度）
			this.userInfo = this.$store.state.user.userdata
			this.circles = [{
				latitude: this.userInfo.dept.lat,
				longitude: this.userInfo.dept.lon,
				radius: 200,
				fillColor: '#00ffff2a',
				color: '#00ffff2a',
				strokeWidth: 0
			}]
			this.lng_In = this.userInfo.dept.lon;
			this.lat_In = this.userInfo.dept.lat;
			this.mapflag = true;
			this.getMaxLongitudeLatitude();
			// 获取当前时间
			setInterval(() => {
				var date = new Date();
				var hour = date.getHours();
				var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
				this.time = hour + ':' + minute;
			}, 1000);


		},
		onLoad() {
			this.GetCurrentAddress();
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			gotoothen(name) {
				console.log(name);
				this.value = name;
				if (name === 1) {
					uni.redirectTo({
						url: "./timeRecord"
					})
				} else if (name === 2) {
					uni.redirectTo({
						url: "./set"
					})
				}
			},
			Submit() {
				let type = 0;
				let address = '';
				if (this.activeType) {
					//出差打卡
					type = 5;
					address = this.ClockInObj.address;
					uni.navigateTo({
						url: "/pagesTools/pages/camera/watermark/watermark?name=" + this.userInfo.nickName +
							"&type=" + type
					})
				} else {
					//公司打卡
					type = 0;
					address = this.ClockInObj.Details;
					if (this.IS_Range === false) {
						type = 1;
					}
					if (this.showstatus == "已签退") {
						this.showToast_Tips('您已签退', 'none');
						return
					}
					uni.navigateTo({
						url: "/pagesTools/pages/camera/watermark/watermark?name=" + this.userInfo.nickName +
							"&type=" + type
					})
				}
				// this.ClockInObj.IsSuccess = true;
				// uni.showLoading({
				// 	title: '打卡中...'
				// });

				// let obj = {
				// 	ChockInPosition: address, //打卡位置
				// 	PositionType: type, //打卡类型
				// 	Remark: this.keycode,
				// 	PhotoUrl: this.ImgArr
				// };
				// console.log(obj, "44444");
				// uniCloud
				// 	.callFunction({
				// 		name: 'ClockIn-add',
				// 		data: obj
				// 	})
				// 	.then(res => {
				// 		setTimeout(() => {
				// 			this.ClockInObj.IsSuccess = false;
				// 			this.showToast_Tips('打卡成功', 'success');
				// 			uni.hideLoading();
				// 		}, 1500);
				// 	});
			},

			//选择地址
			GetChooseLocation() {
				uni.chooseLocation({
					success: res => {
						this.ClockInObj.street = res.name;
						this.ClockInObj.Details = res.address;
						// this.OutMaxLongitudeLatitude(res);
						this.getMaxLongitudeLatitude(res);
					}
				});
			},

			//拍照传来的图片信息数据
			getImgList(data) {
				this.ImgArr = data;
			},

			//提示
			showToast_Tips(title, icon) {
				uni.showToast({
					title: title,
					duration: 5000,
					icon: icon
				});
			},
			//点击确定
			quedingFunc() {
				if (this.keycode != '') {
					setTimeout(() => {
						this.IsChange = false;
						this.conBoll = false;
					}, 300);
				} else {
					this.showToast_Tips('请输入内容', 'none');
				}
			},

			// 点击取消
			quxiaoFunc() {
				setTimeout(() => {
					this.IsChange = false;
				}, 300);
			},

			//添加备注功能
			AddRemarks() {
				this.IsChange = !this.IsChange;
				this.autoBool = true;
			},

			//获取当前地址
			GetCurrentAddress() {
				uni.showLoading({
					title: '加载中'
				});
				let _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						_this.lat_current = res.latitude;
						_this.lng_current = res.longitude;
						_this.getMaxLongitudeLatitude();
						let Position = {
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: 'https://cdn.tianfucd.com/images/applet/icon/map/my.png',
						};
						_this.covers.push(Position);
						const apiKey = "21c9c2162ccb4f1eee01382ca85832c6"; // 必须与上方加载密钥一致
						const url = `https://api.tianditu.gov.cn/geocoder?postStr={'lon':${_this.lng_current},'lat':${_this.lat_current},'ver':1}&type=geocode&tk=${apiKey}`;
						uni.request({
						    url: url, //仅为示例，并非真实接口地址。
						    success: (res) => {
								let Res_Data = res.data.result;
								_this.ClockInObj.street = Res_Data.addressComponent.address;
								_this.ClockInObj.Details = Res_Data.addressComponent.poi;
								_this.ClockInObj.address = Res_Data.addressComponent.address + '(' +
									Res_Data.addressComponent.poi + ')';
								setTimeout(() => {									uni.hideLoading();
								}, 1000);
						    },
						});
						
						// let URL = 'https://apis.map.qq.com/ws/geocoder/v1/?location=';
						// let key =
						// 	'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'; //你申请的开发者密钥（Key）  一般放在后台获取过来
						// let getAddressUrl = URL + _this.lat_current + ',' + _this.lng_current +
						// 	`&key=${key}`;
						// wx.request({
						// 	url: getAddressUrl,
						// 	success: result => {0
						// 		let Res_Data = result.data.result;
						// 		_this.ClockInObj.street = Res_Data.address;
						// 		_this.ClockInObj.Details = Res_Data
						// 			.formatted_addresses.recommend;
						// 		_this.ClockInObj.address = Res_Data.address + '(' +
						// 			Res_Data.formatted_addresses.recommend + ')';
						// 		setTimeout(() => {
						// 			uni.hideLoading();
						// 		}, 1000);
						// 	}
						// });
					}
				});

			},

			//公司地址范围限制
			getMaxLongitudeLatitude(res) {
				let L = 0,
					T = 0,
					Max_L = 0,
					Max_T = 0;
				if (this.activeType) {
					//公司外勤打卡
					L = this.lng_current; //当前经度
					T = this.lat_current; //当前纬度
					if (res !== undefined) {
						Max_L = res.longitude; //选择的位置 中心点
						Max_T = res.latitude; //选择的位置  中心点
					}
					let X_T = Max_T - T;
					let X_L = Max_L - L;
					let X_square = Math.pow(X_T, 2);
					let Y_square = Math.pow(X_L, 2);
					let XY_square = X_square + Y_square;
					let Limit_R = Math.sqrt(XY_square);
					if (Limit_R >= this.Distance_Out) {
						this.IS_Range_Out = false;
						// this.showToast_Tips('请选择合适的范围打卡', 'none');
					} else {
						this.IS_Range_Out = true;
					}
				} else {
					//公司地址范围限制
					L = this.lng_current; //当前经度
					T = this.lat_current; //当前纬度
					Max_L = this.lng_In; //选择的位置 中心点
					Max_T = this.lat_In; //选择的位置  中心点
					let X_T = Max_T - T;
					let X_L = Max_L - L;
					let X_square = Math.pow(X_T, 2);
					let Y_square = Math.pow(X_L, 2);
					let XY_square = X_square + Y_square;
					let Limit_R = Math.sqrt(XY_square);
					if (Limit_R <= this.Distance_In) {
						this.IS_Range = true;
						this.IS_Range_Content = '你已在打卡范围内';
					} else {
						this.IS_Range = false;
						this.IS_Range_Content = '你已超出公司打卡范围，外勤打卡';
					}
				}
			},

			Tabs_Type() {
				this.activeType = !this.activeType;

			}
		}
	};
</script>

<style lang="scss">
	.lwming_ClockIn {
		height: 100vh;

		.ClockIn_conten {
			height: 100vh;
			opacity: 0.9;
		}

		map {
			// height:50%;
			flex: 1;
			width: 100%;
			z-index: 100;
		}

		.header {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 15rpx 0;

			&_Type {
				// width: 40%;
				font-size: 28rpx;
				color: #333;
				text-align: center;
				position: relative;
				padding-bottom: 25rpx;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					width: 75%;
					height: 3px;
					background-color: #fff;
					transform: scale3d(0, 1, 1);
					transform-origin: center;
					transition: all 0.5s;
				}

				&.choose {
					color: #1890ff;

					&::before {
						transform: scale3d(1, 1, 1);
						background-color: #1890ff;
					}
				}
			}
		}

		.container {
			height: 100%;
			position: relative;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;

			.item_In {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				padding: 20rpx 20rpx 20rpx 20rpx;


				.img {
					width: 90rpx;
					height: 90rpx;
					object-fit: cover;
					padding: 30rpx 0;
				}

				.address {
					padding: 8rpx 0;
				}

				.IS_Range {
					font-size: 34upx;
					font-weight: 600;
					padding: 20upx 0;
				}

				.IS_Range_No {
					color: #ff4949;
				}

				.Add_Notes {
					margin-top: 100upx;
					font-size: 26upx;
				}

				.contet_box {
					width: 100%;
					margin: 20rpx auto;

					.txt {
						margin-bottom: 20rpx;
						width: 90%;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #444;
					}

					.img_box_right {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						.image_ {
							margin: 0 15rpx;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							object-fit: cover;
						}
					}
				}
			}

			.item_Button {
				position: absolute;
				bottom: 20%;
				width: 200rpx;
				height: 200rpx;
				text-align: center;
				border-radius: 50%;
				color: #ffffff;
				font-size: 32rpx;
				z-index: 100;
				background-image: linear-gradient(125deg, #e4ffcd, #029fff, #0166ff, #e4ffcd);
				background-size: 400%;
				animation: bganimation 15s infinite;
				display: flex;
				justify-content: center;
				align-items: center;

				@keyframes bganimation {
					0% {
						background-position: 0% 50%;
					}

					50% {
						background-position: 100% 50%;
					}

					100% {
						background-position: 0% 50%;
					}
				}
			}

			.item_Button_Click {
				color: #ffffff;
				background-image: linear-gradient(125deg, #ff4e50, #00c75d, #ff4e50, #e4ffcd);
			}
		}
	}

	.remarkBigWarp {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		top: 0;
		left: 0;

		.remarkWarp {
			width: 90%;
			background-color: #ffffff;
			position: absolute;
			top: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 100;
			border-radius: 16rpx;

			.remarkWarpBox {
				width: 90%;
				margin: 0 auto;
				padding: 10rpx 0;

				.textTile {
					width: 100%;
					height: 150rpx;
					caret-color: #4cd964;
				}

				.photoBox {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}
			}

			.btnWrap {
				display: flex;
				color: #4cd964;
				width: 100%;
				border-top: 1rpx solid #cccccc;

				.cancel {
					width: 100%;
					text-align: center;
					padding: 20rpx 0;
					font-size: 30rpx;
					letter-spacing: 2rpx;
				}

				.cancel:active {
					background-color: rgba(0, 0, 0, 0.2);
					transition: all 0.2s ease-in;
				}
			}
		}
	}
</style>