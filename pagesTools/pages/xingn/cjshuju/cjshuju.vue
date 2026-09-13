<template>
<view>
<!--pages/cjshuju/cjshuju.wxml-->
<view class="heaher">
	<!-- <image class="image" mode="scaleToFill" src="/image/shujutu.png">
	</image> -->
	<view class="heahers">
		<view class="one">
			<view @tap="qiehuan" data-index="0" :class="'onelist ' + (dangqian==0?'onelists':'')">成交量</view>
			<!-- <view bindtap="qiehuan" data-index="1" class="onelist {{dangqian==1?'onelists':''}}">每周取证</view>
			<view bindtap="qiehuan" data-index="2" class="onelist {{dangqian==2?'onelists':''}}">土拍信息</view> -->
		</view>
		<view class="kong"></view>
		<view :class="'wei ' + (dangqian==0?'weis':'')">
			<view :class="'weileft ' + (list1==0?'weileftgong':'')" @tap="qiehuans" data-index="0">实时数据</view>
			<view :class="'weiright ' + (list1==1?'weileftgong':'')" @tap="qiehuans" data-index="1">
				历史成交量
			</view>
		</view>
		<view :class="'wei ' + (dangqian==1?'weis':'')">
			<view :class="'weileft ' + (list1==2?'weileftgong':'')" @tap="qiehuans" data-index="2">每周取证</view>
			<view :class="'weiright ' + (list1==3?'weileftgong':'')" @tap="qiehuans" data-index="3">
				每周开盘
			</view>
		</view>
		<view :class="'wei ' + (dangqian==2?'weis':'')">
			<view :class="'weileft ' + (list1==4?'weileftgong':'')">每周取证</view>
		</view>
	</view>
</view>
<view class="wenbenkuang">
	<view :class="'wenbenkuangs ' + (dangqian==0?'wenbenkuangsm':'')">
		<view :class="'wenbenkuangss ' + (list1==0?'wenbenkuangssm':'')">
			<view class="wenbentime">{{shijians}}</view>
			<view class="wenbentitle">
				<view class="wenbentitlel"></view>
				<view class="wenbentitlels"><text space="ensp">  商品房今日实时成交</text></view>
			</view>
			<view class="containers">
				<view class="table">
					<view class="tr">
						<view class="th">区域</view>
						<view class="th">全市</view>
						<view class="th">中心城区</view>
						<view class="th">郊区新城</view>
					</view>
					<view class="tr">
						<view class="td">套数(套)</view>
						<view class="td">{{jishishuju[0][0]}}</view>
						<view class="td">{{jishishuju[0][1]}}</view>
						<view class="td">{{jishishuju[0][2]}}</view>
					</view>
					<view class="tr">
						<view class="td">面积(平方米)</view>
						<view class="td">{{jishishuju[1][0]}}</view>
						<view class="td">{{jishishuju[1][1]}}</view>
						<view class="td">{{jishishuju[1][2]}}</view>
					</view>
				</view>
			</view>
			<view class="wenbentitle">
				<view class="wenbentitlel"></view>
				<view class="wenbentitlels"><text space="ensp">  二手房今日实时成交</text></view>
			</view>
			<view class="containers">
				<view class="table">
					<view class="tr">
						<view class="th">区域</view>
						<view class="th">全市</view>
						<view class="th">中心城区</view>
						<view class="th">郊区新城</view>
					</view>
					<view class="tr">
						<view class="td">套数(套)</view>
						<view class="td">{{jishishuju[2][0]}}</view>
						<view class="td">{{jishishuju[2][1]}}</view>
						<view class="td">{{jishishuju[2][2]}}</view>
					</view>
					<view class="tr">
						<view class="td">面积(平方米)</view>
						<view class="td">{{jishishuju[3][0]}}</view>
						<view class="td">{{jishishuju[3][1]}}</view>
						<view class="td">{{jishishuju[3][2]}}</view>
					</view>
				</view>
			</view>
		</view>
		<view :class="'wenbenkuangss ' + (list1==1?'wenbenkuangssm':'')">
			<view class="lishizong">
				<view class="lishizongone">成交套数</view>
				<view :class="'lishizongtwo ' + (list2==0?'lishiqubie':'')" @tap="shishiqiehuan" data-index="0">按周查看</view>
				<view :class="'lishizongthree ' + (list2==1?'lishiqubie':'')" @tap="shishiqiehuan" data-index="1">按月查看</view>
			</view>
			<canvas style="width:100%;height:200px;" canvas-id="yueEle" @error="canvasIdErrorCallback"></canvas>
			<view class="lishizong">
				<view class="lishizongone">商品房</view>
				<view :class="'lishizongtwo ' + (list3==0?'lishiqubie':'')" @tap="shishiqiehuans" data-index="0">按周查看</view>
				<view :class="'lishizongthree ' + (list3==1?'lishiqubie':'')" @tap="shishiqiehuans" data-index="1">按月查看</view>
			</view>
			<canvas style="width:100%;height:200px;" canvas-id="yueEles" @error="canvasIdErrorCallback"></canvas>
			<view class="lishizong">
				<view class="lishizongone">二手房</view>
				<view :class="'lishizongtwo ' + (list4==0?'lishiqubie':'')" @tap="shishiqiehuanss" data-index="0">按周查看</view>
				<view :class="'lishizongthree ' + (list4==1?'lishiqubie':'')" @tap="shishiqiehuanss" data-index="1">按月查看</view>
			</view>
			<canvas style="width:100%;height:200px;" canvas-id="yueEless" @error="canvasIdErrorCallback"></canvas>
		</view>
	</view>
	<!-- <view class="wenbenkuangs {{dangqian==1?'wenbenkuangsm':''}}">
		<view class="wenbentime">第二页</view>
	</view>
	<view class="wenbenkuangs {{dangqian==2?'wenbenkuangsm':''}}">
		<view class="wenbentime">第三页</view>
	</view> -->
	<view class="wenbendibu">
		<view class="wenbendibus">
			<text>中心城区:包含五城区及高新区、天府新区、双流区、龙泉驿区、温江区、郫都区、新都区、青白江区;\n郊区新城：包含简阳市、都江堰市、崇州市、彭州市、邛崃市、新津县、金堂县、大邑县、蒲江县;\n注:数据来源于成都市住房和城乡建设局。
				</text>
		</view>
	</view>
</view>
</view>
</template>

<script>
// pages/cjshuju/cjshuju.js
var wxCharts = require("@/utils/wxcharts.js");
var app = getApp();
var daylineChart = null;
var yuelineChart = null;
var yuelineCharts = null;

export default {
  data() {
    return {
      dangqian: 0,
      list1: 0,
      list2: 0,
      list3: 0,
      list4: 0,
      jishishuju: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      yzong: [],
      zzong: [],
      shijians: null,
      suoyous: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shishishuju();
    this.shijian();
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
    getMothElectro: function (e, b, c, d) {
      var windowWidth = 320;

      try {
        var res = uni.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }

      yuelineChart = new wxCharts({
        //当月用电折线图配置
        canvasId: e,
        type: 'line',
        categories: b,
        //categories X轴
        //  categories: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '24'], //categories X轴
        animation: false,
        // background: '#f5f5f5',
        series: [{
          name: '二手房',
          //data: yuesimulationData.data,
          data: c,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }, {
          name: '新房',
          data: d,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: '成交量(套)',
          format: function (val) {
            return val.toFixed(2);
          },
          max: 20,
          min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
          lineStyle: 'curve'
        }
      });
    },
    getMothElectros: function (e, b, c, d, f) {
      var windowWidth = 320;

      try {
        var res = uni.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }

      yuelineCharts = new wxCharts({
        //当月用电折线图配置
        canvasId: e,
        type: 'line',
        categories: b,
        //categories X轴
        animation: false,
        // background: '#f5f5f5',
        series: [{
          name: '全市',
          //data: yuesimulationData.data,
          data: c,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }, {
          name: '中心城区',
          data: d,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }, {
          name: '郊远新城',
          data: f,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: '成交量(套)',
          format: function (val) {
            return val.toFixed(2);
          },
          max: 20,
          min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
          lineStyle: 'curve'
        }
      });
    },
    qiehuan: function (e) {
      var query = e.currentTarget.dataset['index']; // console.log(query);

      if (query == 0) {
        this.setData({
          dangqian: query,
          list1: 0
        });
        return;
      } else if (query == 1) {
        this.setData({
          dangqian: query,
          list1: 2
        });
        return;
      } else if (query == 2) {
        this.setData({
          dangqian: query,
          list1: 4
        });
        return;
      }
    },
    qiehuans: function (e) {
      var that = this;
      var query = e.currentTarget.dataset['index'];

      if (query == 1) {
		// that.getMothElectro('yueEle',that.data.zzong[6],that.data.zzong[0],that.data.zzong[1]);
        // that.getMothElectros('yueEles',that.data.zzong[6],that.data.zzong[1],that.data.zzong[2],that.data.zzong[4]);
        // that.getMothElectros('yueEless',that.data.zzong[6],that.data.zzong[1],that.data.zzong[2],that.data.zzong[4]);
        // this.setData({
        //   list2:0,
        //   list3:0,
        //   list4:0,
        // })
      }
      this.setData({
        list1: query
      }); // this.shishiqiehuan(0);
      // this.shishiqiehuans(0);
      // this.shishiqiehuanss(0);
    },
    //总成交套数
    shishiqiehuan: function (e) {
      uni.showLoading({
        title: '请稍等'
      });
      var that = this;
      var query = e.currentTarget.dataset['index'];

      if (query == 0) {
        that.getMothElectro('yueEle', that.zzong[6], that.zzong[0], that.zzong[1]);
      } else {
        that.getMothElectro('yueEle', that.yzong[6], that.yzong[0], that.yzong[1]);
      }

      this.setData({
        list2: query
      });
      setTimeout(function () {
        uni.hideLoading();
      }, 1000);
    },
    //商品房
    shishiqiehuans: function (e) {
      uni.showLoading({
        title: '请稍等'
      });
      var that = this;
      var query = e.currentTarget.dataset['index'];

      if (query == 0) {
        that.getMothElectros('yueEles', that.zzong[6], that.zzong[1], that.zzong[2], that.zzong[4]);
      } else {
        that.getMothElectros('yueEles', that.yzong[6], that.yzong[1], that.yzong[2], that.yzong[4]);
      }

      this.setData({
        list3: query
      });
      uni.showLoading({
        title: '请稍等'
      });
      setTimeout(function () {
        uni.hideLoading();
      }, 1000);
    },
    // 二手房
    shishiqiehuanss: function (e) {
      uni.showLoading({
        title: '请稍等'
      });
      var that = this;
      var query = e.currentTarget.dataset['index'];

      if (query == 0) {
        that.getMothElectros('yueEless', that.zzong[6], that.zzong[0], that.zzong[3], that.zzong[4]);
      } else {
        that.getMothElectros('yueEless', that.yzong[6], that.yzong[0], that.yzong[3], that.yzong[4]);
      }

      this.setData({
        list4: query
      });
      uni.showLoading({
        title: '请稍等'
      });
      setTimeout(function () {
        uni.hideLoading();
      }, 1000);
    },
    shishishuju: function () {
      var that = this;
      uni.showLoading({
        title: '请稍等'
      });
      uni.request({
        url: 'https://tianfu.tianfucd.com/index/shujutongji',
        method: 'POST',
        success: function (res) {
          uni.hideLoading();

          if (res.data.tips == 1) {
            console.log(res.data.content);
            that.setData({
              jishishuju: res.data.content.jishishuju
            });
            that.setData({
              suoyous: res.data.content.jishishuju
            });
            that.setData({
              yzong: res.data.content.yushuju
            });
            that.setData({
              zzong: res.data.content.zhshujus
            }); // console.log(that.data.zzong);

            that.getMothElectro('yueEle', that.zzong[6], that.zzong[0], that.zzong[1]);
            that.getMothElectros('yueEles', that.zzong[6], that.zzong[1], that.zzong[2], that.zzong[4]);
            that.getMothElectros('yueEless', that.zzong[6], that.zzong[0], that.zzong[3], that.zzong[5]);
          } else {
            that.tishi(res.data.content, 'none');
            return;
          }
        },
        fail: function (res) {
          uni.hideLoading();
          that.tishi('请求失败', 'none');
          return;
        }
      });
    },
    shijian: function () {
      var that = this;
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      console.log(date); //获取年份  

      var Y = date.getFullYear(); //获取月份  

      var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //获取当日日期 

      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //时

      var h = date.getHours(); //分

      var m = date.getMinutes(); //秒

      var s = date.getSeconds();
      var timejs = "更新时间：" + Y + '年' + M + '月' + D + '日' + h + ':' + m + ':' + s;
      that.setData({
        shijians: timejs
      });
    },
    tishi: function (e, es) {
      uni.showToast({
        title: e,
        icon: es,
        duration: 2000
      });
    },

    canvasIdErrorCallback() {
      console.log("占位：函数 canvasIdErrorCallback 未声明");
    }

  }
};
</script>
<style>
/* pages/cjshuju/cjshuju.wxss */
page{
   background-color: #eeeeee;
}
.heaher{
   width:100%;height:300rpx;position:relative;background:#3DA15B;
}
.image{
   width:100%;height:300rpx;position:absolute;opacity:0.4;z-index:0;
}
.heahers{
   width:96%;height:100%;margin:auto;position:absolute;z-index:1;
}
.one{
   width:100%;height:30%;font-size:30rpx;text-align: center;line-height:90rpx;color:white
}
.onelist{
   width:22%;height:100%;float:left;
}
.onelists{
   font-weight:700;border-bottom:2px solid white
}
.kong{
   width:100%;height:20%
}
.wei{
   width:100%;height:25%;display: none;
}
.weis{
   display: block;
   margin-left: 5px;
}
.weileft{
   width:25%;height:100%;border:1px solid white;float:left;text-align: center;line-height:75rpx;font-size:30rpx;
}
.weileftgong{
   background:white;
   color:black;
}
.weiright{
   width:25%;height:100%;float:left;margin-left:5%;border:1px solid white;text-align: center;line-height:75rpx;font-size:30rpx;
}
.wenbenkuang{
   width:100%;position:absolute;margin-top:-20px;border-top-left-radius: 10px;border-top-right-radius: 10px;background:white;
}
.wenbenkuangs{
   width:96%;margin:auto;display: none;
}
.wenbenkuangsm{
   display: block;
}
.wenbenkuangss{
   display: none;
}
.wenbenkuangssm{
   display: block;
}
.wenbentime{
   width:100%;height:30px;font-size:25rpx;line-height:30px;color:#AAAAAA
}
.wenbentitle{
   width:100%;height:30px;line-height:30px;font-size:30rpx;font-weight:700
}
.wenbentitlel{
   width:10rpx;height:100%;background:#04BE02;float:left
}
.wenbentitlels{
   height:100%;float:left
}
.wenbendibu{
   width:100%;background:#eeeeee;font-size:25rpx;line-height:40rpx;color:#AAAAAA;
}
.wenbendibus{
   width:96%;height:100%;margin:auto;
}
/*历史成交量 */
.lishizong{
   width:100%;height:40px;line-height:40px;font-size:30rpx;
}
.lishizongone{
   width:60%;height:100%;float:left;color:block;font-weight:700
}
.lishizongtwo{
   width:20%;height:100%;float:left;text-align:right
}
.lishizongthree{
   width:20%;height:100%;float:left;text-align:right
}
.lishiqubie{
   color:green;font-weight:700;
}
.containers{
   margin-top:10rpx;
   /* font-size: 29rpx; */
}
.table {
   border:1px solid #dadada;
   border-right: 0;
   border-bottom: 0;
   width: 98%;
   font-size:28rpx;
  }
  .tr {
   width: 100%;
   display: flex;
   justify-content: space-between;
  }
  .th,.td {
   padding: 10px;
   border-bottom: 1px solid #dadada;
   border-right: 1px solid #dadada;
   text-align: center;
   width:100%;
   overflow:hidden; 
   text-overflow:ellipsis;
   white-space: nowrap;
  }
  .th {
   font-weight: 400;
   background-color: #dadada
  }
</style>