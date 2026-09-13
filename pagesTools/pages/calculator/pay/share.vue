<template>
	<view class="container">
		<tm-menubars title="房贷计算结果" iconColor="white" ></tm-menubars>
		
		
		<view class="container-page">
			<view class="" style="padding: 45rpx 30rpx;">
				<view class="poster">
					<l-painter ref="painter" v-if="debx.ringList.length > 0 && debj.ringList.length > 0">
					    <l-painter-view css="background: #FFF;height: 960rpx; width: 690rpx;">
							<l-painter-text
								css="position:absolute;width:690rpx;height:60rpx;color:#979797;fontSize:26rpx;backgroundColor:#F6F6F6;textAlign:center"
								:text="'当前计算结果使用利率:商贷基准利率'+(debx.rate * 100).toFixed(2)+'%'"/>
							<l-painter-text
								css="position:absolute;top:80rpx;width:690rpx;height:60rpx;fontSize:28rpx;textAlign:center"
								text="等额本息(每月还款)"/>
							<l-painter-view css="position:absolute;top: 130rpx;width: 690rpx;fontSize:28rpx;color:#333333;textAlign:center">
								<l-painter-text
									css="position:;color:#666666;color:#FA5B33;fontSize:100rpx;"
									:text="debx.monthPay" />
								<l-painter-text css="marginTop:75rpx;marginLeft:10rpx" :text="'元 共'+debx.months/12+'年'" />
							</l-painter-view>
							<l-painter-text
								css="position:absolute;top:260rpx;width:690rpx;color:#EB5149;fontSize:26rpx;textAlign:center"
								:text="'本金:'+debx.bx.b+' 利息:'+debx.bx.x"/>
							<l-painter-text
								css="position:absolute;top:300rpx;width:690rpx;color:#EB5149;fontSize:26rpx;textAlign:center"
								:text="debx.lineOne"/>
								
							<l-painter-view css="position:absolute;left: 34rpx;top: 362rpx;width: 622rpx;fontSize:28rpx;color:#333333;">
								<l-painter-text
									:text="debx.ringList[0].name + debx.ringList[0].value + '万'" />
								<l-painter-text
									css="position:absolute;right:-0rpx;color:#666666;"
									:text="debx.ringList[1].name + debx.ringList[1].value + '万'" />
							</l-painter-view>
							
							<l-painter-view css="position:absolute;left: 34rpx;top: 422rpx;width: 622rpx;fontSize:28rpx;color:#333333;">
								<l-painter-text
									:text="'支付利息 ' + debx.ringList[2].value + '万'" />
								<l-painter-text
									css="position:absolute;right:-0rpx;color:#666666;"
									:text="'贷还款总额 '+(Number(debx.ringList[2].value)+Number(debx.ringList[1].value)).toFixed(2) + '万'" />
							</l-painter-view>
							
							
							<l-painter-text
								css="position:absolute;top:490rpx;width:690rpx;height:60rpx;fontSize:28rpx;textAlign:center"
								text="等额本金(首期还款)"/>
							<l-painter-view css="position:absolute;top: 540rpx;width: 690rpx;fontSize:28rpx;color:#333333;textAlign:center">
								<l-painter-text
									css="position:;color:#666666;color:#FA5B33;fontSize:100rpx;"
									:text="debj.monthPay" />
								<l-painter-text css="marginTop:75rpx;marginLeft:10rpx" :text="'元 共'+debj.months/12+'年'" />
							</l-painter-view>
							<l-painter-text
								css="position:absolute;top:670rpx;width:690rpx;color:#EB5149;fontSize:26rpx;textAlign:center"
								:text="'本金:'+debj.bx.b+' 利息:'+debj.bx.x"/>
							<l-painter-text
								css="position:absolute;top:710rpx;width:690rpx;color:#EB5149;fontSize:26rpx;textAlign:center"
								:text="debj.lineOne"/>
								
							<l-painter-view css="position:absolute;left: 34rpx;top: 765rpx;width: 622rpx;fontSize:28rpx;color:#333333;">
								<l-painter-text
									:text="debj.ringList[0].name + debj.ringList[0].value + '万'" />
								<l-painter-text
									css="position:absolute;right:-0rpx;color:#666666;"
									:text="debj.ringList[1].name + debj.ringList[1].value + '万'" />
							</l-painter-view>
							
							<l-painter-view css="position:absolute;left: 34rpx;top: 820rpx;width: 622rpx;fontSize:28rpx;color:#333333;">
								<l-painter-text
									:text="'支付利息 ' + debj.ringList[2].value + '万'" />
								<l-painter-text
									css="position:absolute;right:-0rpx;color:#666666;"
									:text="'贷还款总额 '+(Number(debj.ringList[2].value)+Number(debj.ringList[1].value)).toFixed(2) + '万'" />
							</l-painter-view>
							
							<l-painter-view css="position:absolute;top: 900rpx;width: 690rpx;fontSize:24rpx;color:#999999;textAlign:center;">
								<l-painter-text
									text="*房贷计算结果仅供参考，请以实际缴纳金额结果为准。" />
								<l-painter-text
							</l-painter-view>
						</l-painter-view>
					</l-painter>
					<view class="footer-btn">
						<view class="" @tap="back">
							返回
						</view>
						<view class="save" @click="toSave">
							保存
						</view>
					</view>
					<!-- 生成的图片 -->
					<tm-maskFlow v-model="show_1" :close="false" :position="pos">
						<view class="poster-img">
							<text @click="closePopup"></text>
							<tm-images :previmage="false" class="image" @tap="previewImg" :src="path"></tm-images>
							<!-- #ifdef H5 -->
							<view class="">
								长按图片保存到手机
							</view>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<view class="">
								点击图片保存到手机
							</view>
							<!-- #endif -->
						</view>
					</tm-maskFlow>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	import LoanCaculate from "../../../components/calculator/LoanCaculate.js"
	import tmImages from '@/pagesTools/tm-vuetify/components/tm-images/tm-images.vue';
	import tmMaskFlow from '@/pagesTools/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	
	import lPainterView from '../../../components/l-painter-view/l-painter-view.vue';
	import lPainterText from '../../../components/l-painter-text/l-painter-text.vue';
	import lPainterImage from '../../../components/l-painter-image/l-painter-image.vue';
	import lPainterQrcode from '../../../components/l-painter-qrcode/l-painter-qrcode.vue';
	import lPainter from '../../../components/l-painter/l-painter.vue';
	export default {
		components: {
			tmImages,tmMaskFlow,
			lPainterView,lPainterText,lPainterImage,lPainter,lPainterQrcode
		},
		data() {
			return {
				debx:{
					lineOne: "每月还款额固定，所还总利息较多，适合收入稳定者。",
					ringList: [],
					houseTotalPrice: "",
					totalPrice: 0,
					loanMoney: 0,
					payMoney: 0,
					months: 0,
					monthPay: 0,
					rate: 0,
					monthDecMoney: 0,
				},
				debj:{
					
				},
				
				
				painterShow:false,
				show_1: false,
				path: '', //生成的图片地址
				pos: 'center',
				
			
			}
		},
		onLoad(option) {
			let that = this
			const data = JSON.parse(decodeURIComponent(option.data));
			that.setData({
				debx : {
					totalPrice : data.totalPrice * 10000,
					loanMoney : data.loanMoney * 10000,
					payMoney : data.payMoney,
					months : data.months,
					rate : data.rate
				},
				debj : {
					totalPrice : data.totalPrice * 10000,
					loanMoney : data.loanMoney * 10000,
					payMoney : data.payMoney,
					months : data.months,
					rate : data.rate
				}
			})
			that.caculateAcpi()
		},
		methods: {
			convertToChinaNum(num) {
			    var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
			    var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿'];//可继续追加更高位转换值
			    if(!num || isNaN(num)){
			        return "零";
			    }
			    var english = num.toString().split("")
			    var result = "";
			    for (var i = 0; i < english.length; i++) {
			        var des_i = english.length - 1 - i;//倒序排列设值
			        result = arr2[i] + result;
			        var arr1_index = english[des_i];
			        result = arr1[arr1_index] + result;
			    }
			    //将【零千、零百】换成【零】 【十零】换成【十】
			    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
			    //合并中间多个零为一个零
			    result = result.replace(/零+/g, '零');
			    //将【零亿】换成【亿】【零万】换成【万】
			    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
			    //将【亿万】换成【亿】
			    result = result.replace(/亿万/g, '亿');
			    //移除末尾的零
			    result = result.replace(/零+$/, '')
			    //将【零一十】换成【零十】
			    //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
			    //将【一十】换成【十】
			    result = result.replace(/^一十/g, '十');
			    return result;
			},
			back:function(){
				uni.navigateBack({
					delta:1
				})
			},
			previewImg() {
				let that = this
				// 预览图片
				console.log(that.path)
				uni.previewImage({
					"current": 0,
					"urls": [that.path],
					success: function(data) {
						console.log("success:",data);
					},
					fail: function(err) {
						console.log("err:",err);
					},
				});
			},
			closePopup() {
				this.show_1 = false;
				this.show_poster = false;
				this.painterShow = true;
			},
			toSave() {
				let that = this
				uni.showLoading({
					title: '海报生成中',
				})
				const painter = this.$refs.painter;
				painter.canvasToTempFilePath().then(res => {
					console.log(res)
					that.painterShow = false;
					that.path = res.tempFilePath;
					that.show_1 = true;
					that.show_poster = true;
					uni.hideLoading()
				});
			},
			caculateAcpi() {
				let that = this
				//等额本息
				that.debx.monthPay = LoanCaculate.Acpi(that.debx.rate, that.debx.loanMoney, that.debx.months)
				that.debx.bx = LoanCaculate.Acpi_bx(that.debx.rate, that.debx.loanMoney, that.debx.months)
				that.debx.totalPay = that.debx.monthPay * that.debx.months;
				that.debx.lineOne = "每月还款额固定,所还总利息较多"
				
				//console.log("月供",Math.ceil(monthPay));
				that.debx.monthPay = that.debx.monthPay.toFixed(2);
				
				//console.log("总还款",Math.ceil(totalPay));
				let totalInterest = that.debx.totalPay - that.debx.loanMoney;
				//console.log("总利息",Math.ceil(totalInterest));
				that.debx.houseTotalPrice = {
					name: "房款总价",
					value: (that.debx.totalPrice / 10000).toFixed(2)
				}
				const payMoneyText = this.convertToChinaNum((that.debx.payMoney*100000/that.debx.totalPrice).toFixed(0))
				const loanMoneyText = this.convertToChinaNum((that.debx.loanMoney*10/that.debx.totalPrice).toFixed(0))
				that.debx.ringList = [{
						name: "首付"+payMoneyText+"成",
						value: (~~that.debx.payMoney).toFixed(2),
						unit: "万元",
						color: "#6EBFFF"
					},
					{
						name: "贷款"+loanMoneyText+"成",
						value: (that.debx.loanMoney / 10000).toFixed(2),
						unit: "万元",
						color: "#FFDA7C"
					},
					{
						name: "支付利息",
						value: (totalInterest / 10000).toFixed(2),
						unit: "万元",
						color: "#FF70A0"
					}
				]
				
				
				//等额本金
				let monthPay = 0;
				let totalPay = 0;
				for (let month = 0; month < that.debj.months; month++) {
					monthPay = LoanCaculate.AverageCapital(that.debj.rate, that.debj.loanMoney, that.debj.months, month)
					totalPay += monthPay;
				}
				that.debj.totalPay = totalPay
				that.debj.monthPay = LoanCaculate.AverageCapital(that.debj.rate, that.debj.loanMoney, that.debj.months, 0)
				let nextmonthPay = LoanCaculate.AverageCapital(that.debj.rate, that.debj.loanMoney, that.debj.months, 1)
				that.debj.bx = LoanCaculate.AverageCapital_bx(that.debj.rate, that.debj.loanMoney, that.debj.months, 1)
				that.debj.monthDecMoney = (that.debj.monthPay - nextmonthPay).toFixed(2);
				that.debj.lineOne = `前期还款额较大,每月还款额递减 ${that.debj.monthDecMoney}`
				
				// console.log("月供",Math.ceil(that.debj.monthPay));
				that.debj.monthPay = that.debj.monthPay.toFixed(2);
				
				// console.log("总还款",Math.ceil(that.debj.totalPay));
				let totalInterest1 = that.debj.totalPay - that.debj.loanMoney;
				// console.log("总利息",Math.ceil(totalInterest1));
				that.debj.houseTotalPrice = {
					name: "房款总价",
					value: (that.debj.totalPrice / 10000).toFixed(2)
				}
				const payMoneyText1 = this.convertToChinaNum((that.debj.payMoney*100000/that.debj.totalPrice).toFixed(0))
				const loanMoneyText1 = this.convertToChinaNum((that.debj.loanMoney*10/that.debj.totalPrice).toFixed(0))
				that.debj.ringList = [{
						name: "首付"+payMoneyText1+"成",
						value: (~~that.debj.payMoney).toFixed(2),
						unit: "万元",
						color: "#6EBFFF"
					},
					{
						name: "贷款"+loanMoneyText1+"成",
						value: (that.debj.loanMoney / 10000).toFixed(2),
						unit: "万元",
						color: "#FFDA7C"
					},
					{
						name: "支付利息",
						value: (totalInterest1 / 10000).toFixed(2),
						unit: "万元",
						color: "#FF70A0"
					}
				]
				
				
				uni.showLoading({
					title: '加载中',
				})
				setTimeout(function() {
					that.painterShow = true;
					uni.hideLoading()
				}, 500);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container-page {
		height: 100vh;
		overflow-y: hidden;
		background-color: #8CC5FF;
		background-image: linear-gradient(#8CC5FF, #8CC5FF);

		.header-group {
			display: flex;
			background: #409EFF;
			border-top-right-radius: 15rpx;
			border-top-left-radius: 15rpx;

			.group {
				width: 50%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.container-body {
			background-color: #FFFFFF;
			padding-bottom: 30rpx;

			.container-body-head {
				background-color: #F6F6F6;
				font-size: 26rpx;
				color: #979797;
				text-align: center;
				line-height: 60rpx;
			}

			.container-body-title {
				font-size: 28rpx;
				text-align: center;
				padding: 30rpx 0 10rpx 0;
			}

			.repayment-money {
				text-align: center;

				.text1 {
					color: #FA5B33;
					font-size: 100rpx;
				}

				.text2 {
					font-size: 36rpx;
				}

				.text3 {
					font-size: 32rpx;
				}
			}

			.by-the-month {
				text-align: center;
				line-height: 60rpx;
				text-decoration: underline
			}

			.amount-tips {
				text-align: center;
				color: #EB5149;
				font-size: 26rpx;
			}

			.tabel {
				display: flex;
				padding: 20rpx 0;

				.tabel-one {
					width: 50%;
					text-align: center;
				}
			}

			.bottom-tips {
				margin-top: 30rpx;
				text-align: center;
				font-size: 22rpx;
				color: #979797;
			}

		}
	}

	.popup-body {
		max-height: 800rpx;
		overflow-y: auto;

		.popup-body-day {
			display: flex;
			padding: 15rpx 0;

			.popup-body-num {
				text-align: center;
				width: 50%;
			}

			.popup-body-amount {
				width: 50%;
				text-align: center;
			}
		}
	}

	.popup-body-head {
		display: flex;
		padding: 15rpx 0;
		background-color: #EBEBEB;

		.popup-body-num {
			text-align: center;
			width: 50%;
		}

		.popup-body-amount {
			width: 50%;
			text-align: center;
		}
	}

	.buttom-class {
		margin-top: 20rpx;
		border-radius: 30rpx;
		color: #FFFFFF;
		background: #409EFF
	}

	.right-bottom {
		border-radius: 0 15rpx 0 0;
	}

	.left-bottom {
		border-radius: 15rpx 0 0 0;
	}

	.center-left-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.center-right-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.btn {
		margin-top: 50rpx;
		display: flex;

		.reset {
			width: 40%;
			border-radius: 30rpx;
		}

		.save {
			width: 40%;
			border-radius: 30rpx;
			background-color: #67C23A;
			color: #FFFFFF;

			&::after {
				border: none !important;
			}
		}
	}
	.poster-img{
		width: 690rpx;
		height: 960rpx;
		position: absolute;
		top: 200rpx;
		left: 30rpx;
		
		text{
			background: url('https://s.yun-live.com/images/20210201/5c4ef9d86bc5eec90f2f915683d9db08.png') no-repeat;
			background-size: 100% 100%;
			display: inline-block;
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: -60rpx;
			right: 0;
		}
		.image{
			width: 690rpx;
			height: 960rpx;
		}
		view{
			font-size: 32rpx;
			font-family: PingFang-SC-Bold, PingFang-SC;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 32rpx;
			text-align: center;
			margin-top: 28rpx;
		}
	}
	.poster{
		.footer-btn{
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view{
				width: 319rpx;
				height: 66rpx;
				border-radius: 40rpx;
				border: 1px solid #4070FF;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4070FF;
				line-height: 66rpx;
				text-align: center;
			}
			.save{
				background: #4070FF;
				color: #FFFFFF;
			}
		}
	}
	.poster-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 32rpx 32rpx 0px 0px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		>view{
			width: 80rpx;
			height: 80rpx;
			position: relative;
			border-radius: 10rpx;
			border: 4rpx solid #fff;
			&.is-check{
				border: 4rpx solid #4070FF;
			}
			image{
				width: 100%;
				height: 100%;
			}
			view{
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				right: -15rpx;
				bottom: -15rpx;
				background: url('https://s.yun-live.com/images/20210201/311c01265c1aa508418f6bae10d67602.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>