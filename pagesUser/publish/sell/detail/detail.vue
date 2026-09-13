<template>
	<view>
		<tm-menubars title="信息完善" iconColor="white" ></tm-menubars>
		<view class="container">
			<text class="info">你的房屋基本情况</text>
			<view class="margin qingkuang topq">
				<input @input="dongInput" maxlength="5" placeholder="几栋">
				<input @input="danyuanInput" maxlength="5" placeholder="几单元">
				<input @input="louInput" maxlength="5" placeholder="几楼">
				<input @input="haoInput" maxlength="5" placeholder="几号">
			</view>
			<text class="info">户型</text>
			<text class="info info1">朝向</text>
			<text class="info info1">楼层</text>

			<!-- 户型 -->
			<view @tap="picker1" class="margin base">
				<view v-if="huxing!=0" class="left">
					<view class="left1 le">
						{{formData.piker[0].three[huxing[0]]}}{{formData.piker[0].three1[huxing[1]]}}{{formData.piker[0].three2[huxing[2]]}}
					</view>
					<view class="left1 le">{{formData.piker[1].three_1[chaoxiang]}}</view>
					<view class="left1">{{formData.piker[2].three_2[louceng[0]]}}/{{formData.piker[2].treee_3[louceng[1]]}}
					</view>
				</view>
				<view v-else style=" color: #878787;">请选择</view>
				<text class="icon-you"></text>
			</view>
			<text class="info">面积</text>

			<view class="margin">
				<view class="item">
					<input @input="inputArea" placeholder="请输入面积" maxlength="5">
					<view class="m">m²</view>
				</view>
			</view>

			<text class="info">{{txt1}}</text>

			<view class="margin">
				<view class="item">
					<input @input="inputSell" maxlength="5" placeholder="请输入价格">
					<text class="m">{{txt2}}</text>
				</view>
			</view>
			<text class="info">联系人信息</text>
			<view class="phone">
				<input @input="nameInput" class="phone1" placeholder="请输入称呼">
				<view>
					<radio-group @change="sexSelect">
						<radio value="1" checked>先生</radio>
						<radio value="0">女士</radio>
					</radio-group>
				</view>
			</view>
			<text class="info">手机号</text>
			<input @input="numberInput" maxlength="11" class="phone1" placeholder="请输入手机号">
			<text class="info">推荐人</text>
			<view class="phone">
				<tm-input :border-bottom="false" :value.sync="referrer_name" placeholder="请输入推荐人姓名"  :vertical="true" border-color="grey-lighten-1"></tm-input>
			</view>
			<text class="info">推荐人所在项目</text>
			<view class="phone">
				<tm-input :border-bottom="false" :value.sync="referrer_project" placeholder="请输入推荐人所在项目"  :vertical="true" border-color="grey-lighten-1"></tm-input>
			</view>
			<text class="info">推荐人手机号</text>
			<tm-input :border-bottom="false" inputType="number" :value.sync="referrer_phone" placeholder="请输入推荐人手机号"  :vertical="true" border-color="grey-lighten-1"></tm-input>
			<button @tap="next" class="btn" hover-class="none">下一步</button>
		</view>
		<!-- maske -->
		<view :class="'marke ' + (piker1?'':'hidden')"
			style="width:100%; height: 100%; background-color: #333; opacity: 0.5; z-index: 100;position: fixed; top: 0;bottom: 0;left: 0;right: 0;">
		</view>
		<!-- piker1 -->
		<view :class="'guige ' + (piker1?'':'hidden')">
			<view class="picker">
				<view v-for="(item, index) in formData.piker" :key="index" @tap="choose1" :data-index="index"
					:class="'top ' + (titleIndex==index?'color':'')">
					<text>{{item.one}}</text>
					<text :class="index==titleIndex?'zhuti':''" style="font-size: 30rpx;">{{item.two}}</text>
				</view>
			</view>
			<view class="pikerTitle">
				<text @tap="cancel1" class="cancel">取消</text>
				<text class="choose">请选择{{titleIndex==0?'户型':titleIndex==1?'朝向':'楼层'}} </text>
				<text @tap="confirm1" class="confirm">确认</text>
			</view>
			<picker-view :class="titleIndex==0?'':'hidden'" style=" width: 100%; height: 450rpx;box-sizing: border-box;"
				:value="value" @change="bindchange1">
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[0].three" :key="index" class="pickerIiew"
						style="line-height: 50px;text-align:center;">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[0].three1" :key="index" class="pickerIiew"
						style="line-height: 50px;text-align: center;">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[0].three2" :key="index" class="pickerIiew"
						style="line-height: 50px;text-align: center;">{{item}}</view>
				</picker-view-column>
			</picker-view>
			<!-- 第一项 -->
			<picker-view :class="titleIndex==1?'':'hidden'" style="width: 100%; height: 450rpx;box-sizing: border-box;"
				@change="bindchange1_1">
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[1].three_1" :key="index"
						style="line-height: 50px;text-align: center;">{{item}}</view>
				</picker-view-column>
			</picker-view>
			<picker-view :class="titleIndex==2?'':'hidden'" style="width: 100%; height: 450rpx;box-sizing: border-box;"
				@change="bindchange1_2">
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[2].three_2" :key="index"
						style="line-height: 50px;text-align: center;">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in formData.piker[2].treee_3" :key="index"
						style="line-height: 50px;text-align: center;">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
import {
  addWtmai
} from '@/api/houst.js'
	import tmUpload from '@/pagesUser/tm-vuetify/components/tm-upload/tm-upload.vue';
	import tmInput from '@/pagesUser/tm-vuetify/components/tm-input/tm-input.vue';
	export default {
		data() {
			return {
				//上传url
				upUrl:'',
				//类目一
				titleIndex: 0,
				// 控制显示
				piker1: false,
				// 户型
				huxing: '',
				// 朝向
				chaoxiang: '',
				// 楼层
				louceng: '',
				//推荐人
				referrer_name:'',
				//推荐人所在项目
				referrer_project:'',
				//推荐人手机号
				referrer_phone:'',
				//性别
				sex:1,
				//图片
				images:[],
				name: "",
				number: "",
        options:"",
				formData: {
					piker: [{
						three: ["1室", "2室", "3室", "4室", "5室", "6室"],
						three1: ["0厅", "1厅", "2厅", "3厅", "4厅", "5厅", "6厅"],
						three2: ["0卫", "1卫", "2卫", "3卫", "4卫", "5卫"],
						one: "户型",
						two: "",
					}, {
						three_1: ["东南", "西北", "东北", "南北", "东西"],
						one: "朝向",
						two: "",
					}, {
						three_2: [],
						treee_3: [],
						one: "楼层",
						two: "",
					}]
				},
				value: [],
			};
		},

		components: {tmUpload,tmInput},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
      console.log(options)
			let that = this
			const lc = []
			const zlc = []
			const formData = that.formData
			if(options.xq == undefined || options.type == undefined || options.addr == undefined || options.fwlx == undefined){
				uni.redirectTo({
					url:"/pages/publish/sell/sell"
				})
			}
			for (var lci = 0; lci < 40; lci++) {
				lc[lci] = lci + 1 + '层'
				zlc[lci] = '共' + (lci + 1) + '层'
			}
			formData.piker[2].three_2 = lc
			formData.piker[2].treee_3 = zlc
			if(options.type == '出租'){
				that.setData({
					txt1:'租金',
					txt2:'元/月'
				})
			}
			if(options.type == '出售'){
				that.setData({
					txt1:'售价',
					txt2:'万元'
				})
			}
      this.options=options;
			that.setData({
				options: options,
				formData: formData,
				upUrl : that.$configs.assetsPath+"/user/tpfile.php?act=mpUpload&type=weituo"
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

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
			upSuc(e){
				console.log(e)
			},
			/**
			 * 户型、朝向、楼层选择器
			 */
			picker1() {
				this.setData({
					piker1: true
				});
			},
			/**
			 * 户型、朝向、楼层选择器取消
			 */
			cancel1() {
				this.setData({
					piker1: false
				});
			},
			/**
			 * 户型、朝向、楼层选择器确认
			 */
			confirm1() {
				this.setData({
					piker1: false
				});
			},
			choose1(e) {
				this.setData({
					titleIndex: e.currentTarget.dataset.index
				});
			},
			bindchange1(e) {
				let that = this
				const hx1 = that.formData.piker[0].three[e.detail.value[0]]?that.formData.piker[0].three[e.detail.value[0]]:""
				const hx2 = that.formData.piker[0].three1[e.detail.value[1]]?that.formData.piker[0].three1[e.detail.value[1]]:""
				const hx3 = that.formData.piker[0].three2[e.detail.value[2]]?that.formData.piker[0].three2[e.detail.value[2]]:''
				that.formData.piker[0].two = hx1 + hx2 + hx3;
				that.setData({
					huxing: e.detail.value
				});
			},

			bindchange1_1(e) {
				let that = this
				const  cx = that.formData.piker[1].three_1[e.detail.value[0]]?that.formData.piker[1].three_1[e.detail.value[0]]:""
				that.formData.piker[1].two = cx;
				that.setData({
					chaoxiang: e.detail.value
				});
			},
			bindchange1_2(e) {
				let that = this
				const lc1 = that.formData.piker[2].three_2[e.detail.value[0]]?that.formData.piker[2].three_2[e.detail.value[0]]:""
				const lc2 = that.formData.piker[2].treee_3[e.detail.value[1]]?that.formData.piker[2].treee_3[e.detail.value[1]]:""
				that.formData.piker[2].two = lc1 + '/' + lc2;
				this.setData({
					louceng: e.detail.value
				});
			},


			inputSell(e) {
				this.setData({
					sell: e.detail.value
				});
				console.log(this.sell);
			},

			inputArea(e) {
				this.setData({
					area: e.detail.value
				});
			},

			dongInput(e) {
				this.setData({
					dong: e.detail.value
				});
				console.log(this.dong);
			},

			danyuanInput(e) {
				this.setData({
					danyuan: e.detail.value
				});
				console.log(this.danyuan);
			},

			louInput(e) {
				this.setData({
					lou: e.detail.value
				});
				console.log(this.lou);
			},

			haoInput(e) {
				this.setData({
					hao: e.detail.value
				});
				console.log(this.hao);
			},

			/**
			 * 业主姓名输入
			 * @param {Object} e
			 */
			nameInput(e) {
				this.setData({
					name: e.detail.value
				});
			},
			/**
			 * 性别选择
			 * @param {Object} e
			 */
			sexSelect(e){
				let that = this
				that.setData({
					sex : e.detail.value
				})
			},
			/**
			 * 业主电话输入
			 * @param {Object} e
			 */
			numberInput(e) {
				this.setData({
					number: e.detail.value
				});
			},

			next() {
				let that = this
				if (that.huxing == 0 || that.chaoxiang == 0 || that.louceng == 0  || that.area == "" || that.sell == "" || that.dong == "" || that.danyuan == "" || that.lou == "" || that.hao == "") {
					wx.showToast({
						title: "请填写完整信息",
						icon: "none"
					})
					return
				}
				let reg = /^[一-龥]+$/;
				if (!reg.test(that.name)) {
					wx.showToast({
						title: '请输入正确的称呼',
						icon: "none"
					})
					return
				}
				if((that.number).length<11){
					wx.showToast({
						title: '请输入正确手机号',
						icon: "none"
					})
					return
				}
        addWtmai({
          'lroom_type':that.options.type,
          'name' : that.name,
          'sex' : that.sex,
          'tel' : that.number,
          'area':that.area,
          'sell':that.sell,
          'weizhi' : that.dong +'栋-'+ that.danyuan +'单元-'+ that.lou +'楼-'+ that.hao + '号',
          'huxing' : that.formData.piker[0].two,
          'chaoxiang' : that.formData.piker[1].two,
          'louceng' : that.formData.piker[2].two,
          'imgs' : (that.images).join(","),
          'xq':that.options.xq,
          'addr':that.options.addr,
          'fwlx':that.options.fwlx,
          'referrer_name':that.referrer_name,
          'referrer_project':that.referrer_project,
          'referrer_phone':that.referrer_phone,
        }).then(res=>{
          console.log(res,"6666666")
          	if(res.code>0){
          		uni.navigateTo({
          			url: '/pagesUser/publish/sell/detail/entrust/entrust'
          		});
          	}
        })
				// that.$apis.addWeituo({
				// 	'lroom_type':that.options.type,
				// 	'name' : that.name,
				// 	'sex' : that.sex,
				// 	'tel' : that.number,
				// 	'area':that.area,
				// 	'sell':that.sell,
				// 	'weizhi' : that.dong +'栋-'+ that.danyuan +'单元-'+ that.lou +'楼-'+ that.hao + '号',
				// 	'huxing' : that.formData.piker[0].two,
				// 	'chaoxiang' : that.formData.piker[1].two,
				// 	'louceng' : that.formData.piker[2].two,
				// 	'imgs' : (that.images).join(","),
				// 	'xq':that.options.xq,
				// 	'addr':that.options.addr,
				// 	'fwlx':that.options.fwlx,
				// 	'referrer_name':that.referrer_name,
				// 	'referrer_project':that.referrer_project,
				// 	'referrer_phone':that.referrer_phone,
				// }).then(res => {
				// 	if(res>0){
				// 		uni.navigateTo({
				// 			url: '/pagesUser/publish/sell/detail/entrust/entrust'
				// 		});
				// 	}
				// })
			}

		}
	};
</script>
<style>
	.container {
		padding: 40rpx;
	}

	.type {
		background-color: blue;
	}

	.topq input {
		border: 1rpx solid #ccc;
	}

	.ww input {
		height: 80rpx !important;
	}

	.qingkuang {
		justify-content: space-between;
	}

	.info {
		background-color: #Fff !important;
		color: #000000;
		position: relative;
		font-weight: bold;
		font-size: 34rpx;
	}

	.info1::after {
		content: "";
		position: absolute;
		display: block;
		width: 4rpx;
		height: 27rpx;
		background-color: #333;
		border-radius: 10rpx;
		top: 12rpx;
		left: -8px;
	}

	.item {
		display: flex;
		width: 100%;
		padding-bottom: 10rpx;
	}

	.item input {
		margin-right: 20rpx;
		width: 200rpx !important;
		font-size: 36rpx;
	}

	.m {
		align-self: flex-end;
		margin-bottom: 10rpx;
	}

	.margin {
		display: flex;
		margin: 40rpx 0rpx;
	}

	input {
		width: 150rpx;
		height: 35px;
		text-align: center;
		font-size: 28rpx;
		border-radius: 7rpx;
	}

	.area {
		border-bottom: 1rpx solid #ccc;
		padding-bottom: 20rpx;
	}

	.area1 {
		display: block;
		margin: 20rpx 0rpx;
		font-size: 28rpx;
	}

	.input-item input {
		margin-right: 20rpx;
	}

	.yuan input {
		margin-right: 20rpx;
	}

	textarea {
		border: 1rpx solid #ccc;
		width: 100%;
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}

	textarea[placeholder] {
		font-size: 28rpx;
	}

	.title {
		font-weight: bold;
		font-size: 28rpx;
		margin: 10rpx 0rpx;
	}

	.titleInput {
		width: 100%;
		margin-bottom: 20rpx;
	}

	.pictrue {
		color: #999999;
		font-size: 26rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.icon-jia {
		font-family: 'iconfont';
		width: 200rpx;
		height: 200rpx;
		background-color: #ececec;
		font-size: 80rpx;
		line-height: 200rpx;
		text-align: center;
		color: #ccc;
	}

	.pictures {
		display: flex;
		padding: 20rpx 0rpx;
		margin-bottom: 20rpx;
	}

	.phone1 {
		margin: 30rpx 0rpx;
	}

	.pictures image {
		width: 200rpx;
		height: 200rpx;
		margin: 0rpx 45rpx 34rpx 0rpx;
	}

	.pictures {
		width: 100%;
		padding: 20rpx 0rpx;
		display: flex;
		flex-wrap: wrap;
	}

	image:nth-child(3n) {
		margin-right: 0rpx;
	}

	.btn {
		width: 90% !important;
		border-radius: 50rpx;
		font-weight: normal;
		background-color: #3fbaa6;
		color: white;
		margin-top: 40rpx;
	}

	.btn:active {
		filter: brightness(90%);
	}

	.icon-you {
		font-family: 'iconfont';
		color: #ccc;
	}

	.icon-you {
		font-family: 'iconfont';
		margin-left: auto;
	}

	.picker {
		color: #b4b4b4;
	}

	.left {
		display: flex;
		align-items: baseline;
		color: #878787;
	}

	.left1 {
		margin-right: 40rpx;
	}

	.le::after {
		content: "";
		position: absolute;
		display: block;
		width: 4rpx;
		height: 27rpx;
		background-color: #878787;
		border-radius: 10rpx;
		top: 10rpx;
		right: -21rpx;
	}

	.base {
		align-items: baseline;
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
</style>
