<template>
	<view class="">
		<tm-menubars title="房产评估" iconColor="white" ></tm-menubars>
		<web-view src="https://evaluate.tianfucd.com/index.html#/assessment?openId=o8wj_wlKl0sYDP26PepcO5Rc7jJQ"></web-view>
	</view>
</template>

<script>
// pages/chaxun/pinggu.js
var app = getApp();

export default {
  data() {
    return {
      xianshi: false,
      array: ['多层', '低层', '小高层', '高层', '超高层'],
      index: 0,
      array1: ['住宅', '别墅'],
      index1: 0,
      multiIndex: [0, 0],
      multiArray: [],
      multiIndex2: [0, 0, 0],
      multiArray2: [],
      date: '2016',
      array2: ['南', '东', '西', '北', '南北', '东北', '西南', '西北', '东南', '东西'],
      index2: 0,
      array3: ['毛坯', '简易装修', '中档装修', '高档装修', '豪华装修'],
      index3: 0,
      array5: ['武侯区', '锦江区', '青羊区', '成华区', '双流区', '金牛区', '龙泉驿区', '郫都区', '温江区', '新都区', '崇州市', '大邑县', '都江堰市', '简阳市', '金堂县', '彭州市', '浦江县', '青白江区', '邛崃市', '新津县', '高新南区', '高新西区', '天府新区'],
      index5: 0,
      yemianshuju: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var suo = Array();

    for (var ios = -4; ios <= 99; ios++) {
      suo.push(ios);
    }

    this.setData({
      multiArray: [suo, suo]
    });
    var huxing = Array('请选择');
    var huxings = Array('请选择');
    var huxingss = Array('请选择');

    for (var ioss = 0; ioss <= 9; ioss++) {
      huxing.push(ioss + '室');
      huxings.push(ioss + '厅');
      huxingss.push(ioss + '卫');
    }

    this.setData({
      multiArray2: [huxing, huxings, huxingss]
    });
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
    capitalize: function (a, b) {
      console.log(a * b);
      return a * b;
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      });
    },
    bindPickerChange1: function (e) {
      this.setData({
        index1: e.detail.value
      });
    },
    bindPickerChange2: function (e) {
      this.setData({
        index2: e.detail.value
      });
    },
    bindPickerChange3: function (e) {
      this.setData({
        index3: e.detail.value
      });
    },
    bindDateChange3: function (e) {
      this.setData({
        date: e.detail.value
      });
    },
    bindPickerChange5: function (e) {
      this.setData({
        index5: e.detail.value
      });
    },
    //提交
    formSubmit: function (e) {
      var that = this;
      var inputval = e.detail.value;

      if (inputval['xiaoquname'].length == 0) {
        this.tishi('小区名称发生错误', 'none');
        return;
      }

      ;

      if (inputval['jianzhumianji'].length == 0) {
        this.tishi('建筑面积发生错误', 'none');
        return;
      }

      ;

      if (inputval['goufangnumber'].length == 0) {
        this.tishi('购房面积发成错误', 'none');
        return;
      }

      ;

      if (inputval['zhangxiunumber'].length == 0) {
        this.tishi('装修费用发成错误', 'none');
        return;
      }

      ;

      if (inputval['phone'].length != 11) {
        this.tishi('手机号码发成错误', 'none');
        return;
      }

      ;
      var neirongss = this;
      inputval['qudizhi'] = neirongss.array5[neirongss.index5];
      inputval['xiaoqulouxing'] = neirongss.array[neirongss.index];
      inputval['xiaoquzhuzhai'] = neirongss.array1[neirongss.index1];
      inputval['xiaoqulouceng'] = neirongss.multiArray[0][neirongss.multiIndex[0]];
      inputval['xiaoquloucengs'] = neirongss.multiArray[1][neirongss.multiIndex[1]];
      inputval['xiaoquchaoxiang'] = neirongss.array2[neirongss.index2];
      inputval['xiaoqushi'] = neirongss.multiArray2[0][neirongss.multiIndex2[0]];
      inputval['xiaoquting'] = neirongss.multiArray2[1][neirongss.multiIndex2[1]];
      inputval['xiaoquwei'] = neirongss.multiArray2[2][neirongss.multiIndex2[2]];
      inputval['xiaoquzhuangxiu'] = neirongss.array3[neirongss.index3];
      inputval['xiaoqutime'] = neirongss.date;

      if (inputval['xiaoqushi'] == '请选择' || inputval['xiaoqushi'] == '0室') {
        this.tishi('户型室选择错误', 'none');
        return;
      }

      if (inputval['xiaoquting'] == '请选择') {
        this.tishi('户型厅选择错误', 'none');
        return;
      }

      if (inputval['xiaoquwei'] == '请选择') {
        this.tishi('户型卫选择错误', 'none');
        return;
      } // this.setData({yemianshuju:inputval});
      // this.setData({xianshi: true});
      // return;
      // console.log(inputval);


      uni.showLoading({
        title: '评估中'
      });
      uni.request({
        url: app.globalData.URL + '/Wxx/ershoufangpg',
        data: inputval,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-cache'
        },
        success: function (res) {
          uni.hideLoading();

          if (res.data.tips == 1) {
            console.log(res.data.content);
            that.setData({
              yemianshuju: res.data.content
            });
            that.setData({
              xianshi: true
            });
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
    tishi: function (e, es) {
      uni.showToast({
        title: e,
        icon: es,
        duration: 2000
      });
    },
    bindMultiPickerChange: function (e) {
      console.log(e.detail.value);
      this.setData({
        multiIndex: e.detail.value
      });
    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

      if (e.detail.column == 0) {
        var bianzhi = this.multiIndex[1];

        if (e.detail.value > bianzhi) {
          bianzhi = e.detail.value;
        }

        this.setData({
          multiIndex: [e.detail.value, bianzhi]
        });
      } else {
        var bianzhi = this.multiIndex[0];

        if (e.detail.value < bianzhi) {
          bianzhi = e.detail.value;
        }

        this.setData({
          multiIndex: [bianzhi, e.detail.value]
        });
      }
    },
    bindMultiPickerChange1: function (e) {
      console.log(e.detail.value);
      this.setData({
        multiIndex2: e.detail.value
      });
    }
  }
};
</script>
<style>
/* pages/chaxun/pinggu.wxss */
.zong{
  width:100%;
  height:100%;
  position: absolute;
}
.zongs{
  width:96%;height:100%;margin:auto
}
.zongslist{
  width:100%;height:100rpx;line-height:100rpx;font-size:35rpx;border-bottom:1rpx solid #f3f3f3
}
.zongslist_left{
  width:30%;height:100%;float:left;
}
.zongslist_right{
  width:70%;height:100%;float:right;text-align: right;
}
.zongslist_right_left{
  width:90%;float:left;height:100%;text-align: right;
}
.zongslist_right_right{
  width:10%;height:100%;float:left
}
</style>