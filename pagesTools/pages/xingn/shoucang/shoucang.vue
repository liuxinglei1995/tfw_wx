<template>
<view>
<!--pages/xingn/shoucang/shoucang.wxml-->

<view class="all">
	<view :class="'list ' + (dangqian==1?'xuanze':'')" data-name="1" @tap="qiehuan">新房</view>
	<view :class="'list ' + (dangqian==2?'xuanze':'')" data-name="2" @tap="qiehuan">二手房</view>
	<view :class="'list ' + (dangqian==3?'xuanze':'')" data-name="3" @tap="qiehuan">写字楼</view>
	<view :class="'list ' + (dangqian==4?'xuanze':'')" data-name="4" @tap="qiehuan">商铺</view>
</view>
<view v-for="(item, index) in zhanshiall" :key="index" class="lists" @tap="xiangxi" :data-id="item.id">
	<view class="listsz">
		<view class="listszz">
			<image class="listszzimg" :src="item.img"></image>
		</view>
		<view class="listszr">
			<view class="listszr-title">
        <view class="titleleft">{{item.xq}}</view>
        <view class="titleright" @tap.stop="quxiaokuang" :data-id="item.id">...</view>
      </view>
			<view class="listszr-dizhi">{{item.tit}}</view>
			<view class="listszr-price">
				<view class="listszr-prices">
					<view class="listszr-pricess">{{item.type1}}</view>
				</view>
				<text style="color:red;font-weight:700">{{item.money1}}{{item.type1=='出租'?'元/㎡':'万'}}</text>
			</view>
		</view>
	</view>
</view>
<mp-actionSheet @actiontap="btnClick" :show="showActionsheet" :actions="groups">
</mp-actionSheet>
</view>
</template>

<script>
// pages/xingn/shoucang/shoucang.js
var app = getApp();
// import mpActionSheet from "../../../components/actionsheet/actionsheet";

export default {
  data() {
    return {
      dangqian: 1,
      //最上面切换按钮
      page: 1,
      //当前页面
      pages: 0,
      //0为开1为关
      listid: 0,
      //取消的id
      showActionsheet: false,
      //选择弹窗
      zhanshiall: [],
      //所有数据
      groups: [{
        text: '取消收藏',
        value: 1
      } // { text: '示例菜单', value: 2 },
      // { text: '负向菜单', type: 'warn', value: 3 }
      ]
    };
  },

  components: {
    // mpActionSheet
  },
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
  onReachBottom: function () {
    if (this.pages != 0) {
      uni.showToast({
        title: '没有更多数据了…^_^',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    var page = this.page;
    page = page + 1;
    this.setData({
      page: page
    });
    this.all();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    close: function () {
      this.setData({
        showActionsheet: false
      });
    },

    btnClick(e) {
      var that = this;

      if (e.detail.value == 1) {
        this.quxiaoscs(); // console.log(that.data.zhanshiall);
      }

      this.close();
    },

    //底部框出现
    quxiaokuang: function (e) {
      var quedingid = e.currentTarget.dataset.id;
      var liexing = this.dangqian;
      this.setData({
        showActionsheet: true,
        listid: quedingid
      });
    },
    //获取数据
    all: function () {
      var that = this;
      var liexings = that.dangqian; //当前类型

      var pages = that.page; //当前页面

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
        url: app.globalData.URL + '/loupan/shoucangall?uid=' + uid + '&type=' + liexings + '&page=' + pages,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          setTimeout(function () {
            uni.hideLoading();
          }, 1000);
          console.log("all", res.data.data);
          var messageList = that.zhanshiall;
          var huoqushuju = res.data.data;

          for (var i = 0; i < huoqushuju.length; i++) {
            messageList.push(res.data.data[i]);
          }

          var kongzidi = 0;

          if (huoqushuju.length == 0) {
            kongzidi = 1;
          }

          that.setData({
            zhanshiall: messageList,
            pages: kongzidi
          });
          return;
        }
      });
    },
    //取消方法
    quxiaoscs: function () {
      var that = this;
      var liexings = that.dangqian; //当前类型

      var uid = uni.getStorageSync('uid'); //用户账号

      var typeid = that.listid; //用户账号

      uni.request({
        url: app.globalData.URL + '/loupan/shoucangqx?uid=' + uid + '&type=' + liexings + '&typeid=' + typeid,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          // setTimeout(function () {
          //   wx.hideLoading();
          //  }, 1000) 
          console.log(res.data.data);

          if (res.data.code == 1) {
            var arr = that.zhanshiall;
            var listid = that.listid;

            for (var i = 0; i < arr.length; i++) {
              if (arr[i].id === listid) {
                arr.splice(i, 1);
              }
            }

            that.setData({
              zhanshiall: arr
            });
            uni.showToast({
              title: '取消成功',
              icon: 'none'
            });
          } else {
            uni.showToast({
              title: '取消失败',
              icon: 'none'
            });
          }

          return;
        }
      });
    },
    //切换顶部栏
    qiehuan: function (e) {
      var type = e.currentTarget.dataset.name;
      var that = this;

      if (this.dangqian != type) {
        that.setData({
          dangqian: type,
          page: 1,
          zhanshiall: []
        });
        that.all();
      }

      console.log(e);
    },

    /*单机跳转*/
    xiangxi: function (e) {
      var suoyou = this.dangqian;
      var id = e.currentTarget.dataset.id;
      var dizhi = '';

      if (suoyou == 1) {
        dizhi = '/pages/index/newhousedetail/newhousedetail?id=' + id;
      } else if (suoyou == 2) {
        dizhi = '/pages/index/twodetail/twodetail?id=' + id;
      } else if (suoyou == 3) {
        dizhi = '/pages/index/writerhousedetail/writerhousedetail?id=' + id;
      } else {
        dizhi = '/pages/index/storedetail/storedetail?id=' + id;
      }

      uni.navigateTo({
        url: dizhi
      });
    }
  }
};
</script>
<style>
/* pages/xingn/shoucang/shoucang.wxss */
.all{
  width:100%;height:100rpx;background:#eeeeee;font-size:30rpx;line-height:100rpx;text-align:center
}
.list{
  width:25%;height:90%;float:left;padding: 0px 0px 10rpx 0px;
}
.xuanze{
  border-bottom: 1px solid #3DA15B;
  font-size: 35rpx;
  font-weight: 800;
}
.lists{
  width:100%;margin-top:10rpx;
}
.listsz{
  width:96%;height:220rpx;margin:2% 5rpx;border-radius:5rpx;border-bottom:1px solid #eeeeee
}
.listszz{
  width:40%;height:200rpx;float:left
}
.listszzimg{
  width:100%;height:100%;border-radius:10rpx;
}
.listszr{
  width:55%;height:200rpx;float:left;padding-left:5%;font-size:30rpx
}
.listszr-title{
  width:100%;height:30%;line-height:60rpx;font-size:40rpx;font-weight:800;overflow:hidden
}
.listszr-dizhi{
  width:100%;height:50%;line-height:50rpx;color:#aaaaaa;overflow:hidden
}
.listszr-price{
  width:100%;height:20%;line-height:40rpx;
}
.listszr-prices{
  width:70rpx;height:40rpx;position:absolute;right:0;padding-right:10rpx
}
.listszr-pricess{
  width:100%;height:100%;background:#3DA15B;line-height:40rpx;text-align:center;border-radius:5rpx;color:white
}
.titleleft{
  width:90%;height:100%;float:left
}
.titleright{
  width:10%;height:100%;text-align:center;float:right;color:#aaaaaa;line-height:30rpx
}
</style>