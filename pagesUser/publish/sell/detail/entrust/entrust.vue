<template>
<view class="container">
	<tm-menubars title="委托成功" iconColor="white" ></tm-menubars>
	<image src="/static/static/img/bg/xf.png" mode="aspectFill"></image>
	<view class="content">
		
		
		
		<view class="text">
			<text space="warn" class="title">
				您已成功提交委托
			</text>
			<view class="footer">
				您的委托我们已收到，我们会尽快安排客服与您取得联系确认房源，请务必保持电话畅通
			</view> 
		</view>
		<button @tap="goHome" class="btn" hover-class="none">返回首页</button>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
		ischecked: true,
		scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
		scrollMaxHeight:200, //滑动的高度限制，超过这个高度即背景全部显示
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {

    goHome() {
      uni.switchTab({
      	url:"/pages/index/index"
      })
    }

  }
};
</script>
<style>
.content{
	padding: 20rpx 40rpx;
	box-sizing: border-box;
}
image{
	width: 100%;
	margin-bottom: 40rpx;
}
.info{
	position: relative;
	font-weight: bold;
	font-size: 34rpx;
	margin-left: 28rpx;
}
.info::before{
	content: "";
	position: absolute;
	display: block;
	width: 12rpx;
	height: 40rpx;
	background-color: #3fbaa6;
	border-radius: 10rpx;
	top: -1rpx;
}
.entrust{
	display: flex;
	justify-content: space-between;
	margin-top: 50rpx;
}
.diamonds{
	width: 325rpx;
	height: 120rpx;
	line-height: 120rpx;
	text-align: center;
	background-color: #ececec;
	border-radius: 18rpx;
	font-size: 32rpx !important;
}
.blue{
	background-color: #3fbaa6;
	color: white;
}
.title{
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
	font-size: 32rpx;
}
.footer{
	font-size: 28rpx;
	color: #b6b6b6;
	letter-spacing: 3rpx;
	line-height: 40rpx;
}
.text{
	margin-bottom: 300rpx;
}
.btn{
	width:90% !important;
	border-radius: 50rpx;
	font-weight: normal;
	background-color: #3fbaa6;
	color: white;
	margin-top: 40rpx;
	position: fixed;
	bottom: 40rpx;
	
}
.btn:active{
	filter: brightness(90%);
}

</style>