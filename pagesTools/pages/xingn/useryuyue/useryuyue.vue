<template>
<view>
<!--pages/xingn/useryuyue/useryuyue.wxml-->
<view v-for="(item, index) in allshuju" :key="index" class="all">
  <view class="alls">
     <view class="list">标题名称:{{item.txt}}</view>
     <view class="list">预约时间:{{item.yuyuetime}}</view>
     <view class="list">联系号码:{{item.phone}}</view>
  </view>
</view>
</view>
</template>

<script>
// pages/xingn/useryvar app = getApp();
var app = getApp();

export default {
  data() {
    return {
      allshuju: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.all();
  },

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
    all: function () {
      var that = this;
      var uid = uni.getStorageSync('uid'); //用户账号

      if (uid.length == 0) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.showLoading({
        title: '请稍等'
      });
      uni.request({
        url: app.globalData.URL + '/loupan/yuyueall?uid=' + uid,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          setTimeout(function () {
            uni.hideLoading();
          }, 1000);
          console.log("all", res.data.data);

          if (res.data.code == 1) {
            that.setData({
              allshuju: res.data.data
            });
          } else {
            uni.showToast({
              title: res.data.data,
              icon: 'none'
            });
          }
        }
      });
    }
  }
};
</script>
<style>
/* pages/xingn/useryuyue/useryuyue.wxss */
page{background-color:#eeeeee;}
.all{width:100%;height:270rpx;padding:20rpx 20rpx 20rpx 20rpx;}
.alls{width:95%;height:100%;background:white;border-radius:10rpx;padding-left:5%;line-height:90rpx;font-size:30rpx}
.list{width:100%;height:30%;}
</style>