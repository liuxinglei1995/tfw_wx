<template>
	<view>
		<tm-menubars title="政策解读" iconColor="white" ></tm-menubars>
		<image :src="img" class="topImg" mode="aspectFit"></image>
		<tm-sticky>
			<view class="flex-around tabs grey-lighten-5">
				<view @tap="changeTab" :class="current == index ? 'tab active' : 'tab' " v-for="(item,index) in tabs" :id="index" :key="index">
					<p>{{item.t}}</p>
					<p>{{item.b}}</p>
				</view>
			</view>
		</tm-sticky>
		<swiper :circular="true" :style="H[current]" class="swiper_group swipe van-swipe" @change="swiperChange" :current="current">
			<swiper-item  class="van-swipe-item">
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">成都市住房限购政策</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="content-title">
							成都市实施限购的行政区域
						</view>
						<view class="content-item">
							<view class="item-title">
								一圈层
							</view>
							<view class="item-description">
								天府新区成都直管区、高新区南部园区。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								二圈层
							</view>
							<view class="item-description">
								高新区西部园区、锦江区、青羊区、金牛区、武侯区、成华区、龙泉驿区、新都区、温江区、双流区、郫都区；
							</view>
						</view>
						<view class="content-item last-child">
							<view class="item-title">
								三圈层
							</view>
							<view class="item-description">
								青白江区、简阳市、都江堰市、彭州市、邛崃市、崇州市、金堂县、新津县、大邑县、蒲江县。
							</view>
						</view>
					</view>
					<view class="main-content">
						<view class="content-title">
							在各圈层新购住房的条件
						</view>
						<image style="width: 100%;" :src="img1" mode="widthFix"></image>
						<view class="no-background-text">
							<text>单身限购一套房；家庭限购两套房，满足以上任一条件时，还需具备成都市户籍。</text>
						</view>
					</view>
				</view>
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">成都户籍家庭的类别</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="content-item">
							<view class="item-title">
								家庭成员的定义
							</view>
							<view class="item-description">
								夫妻双方、夫妻双方及其未满18周岁的子女、离异 (或丧偶) 父 (母) 及其未满18周岁的子女，其中至少有一人具有成都市户籍。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								家庭名下拥有的住房套数计算方式
							</view>
							<view class="item-description">
								<p>① 18周岁及以上未婚的单身居民；</p>
								<p>② 离异（或丧偶）且无子女的单身居民；</p>
								<p>③ 离异（或丧偶）且子女已年满18周岁的单身居民。</p>
							</view>
						</view>
					</view>
				</view>
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">家庭及家庭名下住房套数</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="content-item">
							<view class="item-title">
								家庭成员的定义
							</view>
							<view class="item-description">
								家庭成员，是指夫妻双方及未成年子女，成年子女不能计算在内。未成年子女的判定标准：未满18周岁。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								家庭名下拥有的住房套数计算方式
							</view>
							<view class="item-description">
								<p>家庭名下已拥有住房套数：指家庭成员名下独自拥有或与他人共有的成套住房的套数。为了加深理解，可以明确下列四点：</p>
								<p>① 居民家庭已拥有住房，包括已经取得不动产权证书的住房和已完成网上签约但尚未取得不动产权证书的住房。</p>
								<p>② 非同一家庭的多人共同拥有一套住房，各计一套已拥有住房。</p>
								<p>③ 查房范围为成都市。</p>
								<p>④ 非住宅不计入住房套数。例如：写字楼、商业、办公等。</p>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item  class="van-swipe-item">
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">非成都户籍如何购房？</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="content-item">
							<view class="item-title">
								非成都户籍家庭的定义是什么?
							</view>
							<view class="item-description">
								非成都户籍家庭是指，购房人及产权共有人中无人拥有成都市户籍。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								如何理解非成都户籍家庭购房政策
							</view>
							<view class="item-description">
								非成都户籍家庭在成都购买住房，需要在成都稳定就业且连续缴纳成都社保，一二圈层要求24个月，三圈层要求12个月。
							</view>
						</view>
						<view class="no-background-text">
							<p>新政要求在拟购房所在地稳定就业且连续缴纳社保的，主要看购房人工作地及单位注册地是否在相应区域，该工作单位在四川省社保局、成都市及成都市各区（市）县社保经办机构缴纳的社保均可予以认定。</p>
							<p>提供的社会保险至少包含养老保险。“连续缴纳”是指购房人在递件当月或者前一个月往前推24个月（或者12个月）连续不间断缴纳社保。</p>
						</view>
						<view class="content-item">
							<view class="item-title">
								针对换工作，个人缴纳社保的情况
							</view>
							<view class="item-description">
								<p>① 通过24个月社保购房，首尾必须是公司缴纳，中间个人缴纳的社保不超过6个月。</p>
								<p>② 通过户籍+12个月社保购房，首尾必须是公司缴纳，中间个人缴纳的社保不超过3个月。</p>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item  class="van-swipe-item">
				<view class="swipe-item-content">
					<view class="main-content">
						<view class="content-item">
							<image style="width: 100%;" :src="img2" mode="widthFix"></image>
						</view>
						<view class="no-background-text">
							<p>新政要求在拟购房所在地稳定就业且连续缴纳社保的，主要看购房人工作地及单位注册地是否在相应区域，该工作单位在四川省社保局、成都市及成都市各区（市）县社保经办机构缴纳的社保均可予以认定。</p>
							<p>提供的社会保险至少包含养老保险。“连续缴纳”是指购房人在递件当月或者前一个月往前推24个月（或者12个月）连续不间断缴纳社保。</p>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item  class="van-swipe-item">
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">个体工商户如何购房？</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="content-item">
							<view class="item-title">
								非本市户籍?
							</view>
							<view class="item-description">
								个体工商户个人连续缴纳本市社保满24个月，营业执照注册时间满24个月且注册地在拟购房区域所在圈层。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								本市户籍
							</view>
							<view class="item-description">
								<p>个体工商户为本市户籍，注册地和户籍需在拟购房所在圈层，同时个人连续缴纳社保满12个月且营业执照注册时间满12个月。</p>
								<p>个体工商户给员工缴纳的社保也可按照公司给员工缴纳的社保条件购房。</p>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item  class="van-swipe-item">
				<view class="swipe-item-content">
					<view class="title">
						<view class="line left"></view>
						<view class="text">购房资质的其他说明</view>
						<view class="line right"></view>
					</view>
					<view class="main-content">
						<view class="small-title">
							1. 摇号顺序如何界定？
						</view>
						<view class="content-item">
							<view class="item-title-options">
								 ①报名人数 ＜ 房源套数的1.2倍，开发商自行组织摇号
							</view>
							<view class="item-title-options">
								②房源套数的1.2倍 ≤ 报名人数 ＜ 房源套数的3倍，按现有方式进行摇号
							</view>
							<view class="item-description">
								具体内容如下：摇号顺序：棚改 ＞ 无房 ＞ 普通
							</view>
							<view class="item-title-options">
								③报名人数 ≥ 房源套数的3倍，只有无房家庭和棚改家庭可参与摇号
							</view>
							<view class="item-description">
								<text>
									具体内容如下：
									1、只针对无房家庭和棚改摇号，普通资格不能参与摇号；
									2、无房家庭优先选房，棚改其次选房；
									3、给予无房家庭的房源数不低于70%；
									4、如果房源有剩余，则在公证处的监督下，按摇号顺序替补选房；
									5、极端情况下，3倍报名人数都没有选完的房源，开发商自行组织销售，但依然优先考虑无房家庭和棚改家庭。
									无房家庭摇号顺序判定？
									第一顺序：拥有与楼盘所在区的户籍和社保的购房者
									第二顺序：拥有与楼盘所在区的户籍的购房者
									第三顺序：拥有与楼盘所在区的社保的购房者
									第四顺序：其它拥有该楼盘购房资格的购房者
								</text>
								<tm-button @tap="go()" theme="bg-gradient-blue-accent" class="mt-30" :round="24" block>
									无房家庭测试
									<tm-icons :size="24" style="margin-left: 15rpx;" name="icon-angle-right"></tm-icons>
								</tm-button>
							</view>
							
						</view>
						<view class="small-title">
							2. 赠与、继承及夫妻更名对购房资质审核的要求
						</view>
						<view class="content-item">
							<view class="item-title">
								房屋继承
							</view>
							<view class="item-description">
								不需要购房资质。
							</view>
						</view>
						<view class="content-item">
							<view class="item-title">
								房屋赠与
							</view>
							<view class="item-description">
								受赠人为非直系亲属需要审核购房资质，受赠人为直系亲属不需要购房资质，直系亲属包括 ( 配偶、父母、子女、祖父母、外祖父母、孙子女、外孙子女 ) 。
							</view>
						</view>
						<view class="content-item last-child">
							<view class="item-title">
								夫妻更名
							</view>
							<view class="item-description">
								不需要购房资质。
							</view>
						</view>
						<view class="small-title">
							3. 家庭拥有保障性住房
						</view>
						<view class="small-description">
							<p>保障性住房是政策性住房的一种，常见的保障性住房有经济适用房，限价商品房，廉租房，公租房，人才公寓等，房改房、拆迁安置房不属于保障性住房。</p>
							<p>家庭名下已申请有廉租房、公租房、人才公寓则无法新购住房。</p>
							<p>家庭名下已有经济适用房或限价商品房，若不符合上市交易条件，则客户无购房资质；若符合上市交易条件，则直接计名下已拥有一套住房。</p>
							<p>申请保障性住房时，父母和未婚子女属于一个家庭，均会被限制，常见情况是父母+子女申请，取得房屋后若符合上市交易条件，产权人申请解除房屋限制，则有资格的父/母/子女可以新购住房；若不符合上市交易条件，产权登记为父母且子女已婚，则需要解除子女的限制子女才可新购住房；若子女未婚，则不能新购住房。</p>
						</view>
						<view class="small-title">
							4. 集体土地上的住房，法拍房，拍卖房以及共有人之间的份额买卖
						</view>
						<view class="small-description">
							<p><text>集体土地上的住房不计入购房人自有产权住房套数。
                            拍卖房须执行住房限购，取得的住房计入自有产权住房套数。</text></p>
							<p>法拍房不属于住房限购范围，但取得的住房计入自有产权住房套数，法拍房不限售。</p>
							<p>共有人之间的份额买卖不属于限购范围，但取得的份额纳入限售范围，须取得不动产权证书后满3年方可转让。</p>
						</view>
						<view class="small-title">
							5. 现役军人和军人退役、转业后购房
						</view>
						<view class="small-description">
							<p>入伍前户籍在我市限购区域的现役军人，可以在原户籍所在地相应限购区域购房。所属部队驻扎地在我市的现役军人，可以在相应限购区域购房。</p>
							<p><text>军人退役、转业后直接落户我市的，可以在落户所在地相应限购区域购房，不受落户24个月的限制。
                            军人其家庭自有产权住房套数应符合我市限购政策对家庭自有产权住房套数要求。</text></p>
						</view>
						<view class="small-title">
							6. 重大招商引资项目和机关、企事业单位引进的高端人才购房
						</view>
						<view class="small-description">
							<p>持有区（市）县政府高端人才证明或蓉城人才绿卡的各类人才购房的，可不受户籍、社保限制，但其家庭自有产权住房套数应符合我市限购政策对家庭自有产权住房套数要求。</p>
							<p>持有区（市）县政府高端人才证明只能在对应圈层购买。</p>
							<p>持有“蓉城人才绿卡”购房不受圈层影响。</p>
							<p>高端人才所购住房自商品住房买卖合同备案之日起5年内或自二手住房载入不动产登记簿之日起5年内不得上市交易。</p>
						</view>
						<view class="small-title">
							7. 父母投靠子女落户购房
						</view>
						<view class="small-description">
							<p><text>父母通过投靠子女落户的，不能作为单独的一个家庭申请购房，应作为其子女的家庭成员审查住房限购资格，但本次限购政策实施前父母已购买的住房不计入自有产权住房套数。
                            父母通过投靠子女落户的，不改变其子女家庭类型，但需落户时间满2年方可购房，父母新购的住房会计入子女家庭名下房屋套数。</text></p>
							<p> 同圈层范围内投靠，落户时间累计计算，跨圈层范围内投靠，落户时间需重新计算。</p>
						</view>
						<view class="small-title">
							8. 离异未满两年购房
						</view>
						<view class="small-description">
							<p>① 养老保险缴纳的是省社保，其他保险缴纳的是市社保，打印的缴存明细是市社保，这种需要打印省社保才能看到；</p>
							<p>② 某些事业单位缴纳的养老保险需要到社保窗口现场，无法在网上查询或机器上打印；</p>
							<p>③ 某些事业单位未缴纳养老保险，这种情况需要提供单位开具的“为什么未缴纳养老保险”的证明才可购房。</p>
						</view>
						<view class="small-title">
							9. 不同途径获取的房屋，是否受此次限购政策的影响？
						</view>
						<image style="width: 100%;" :src="img3" mode="widthFix"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tmSticky from '@/pagesTools/tm-vuetify/components/tm-sticky/tm-sticky.vue';
	import tmButton from '@/pagesTools/tm-vuetify/components/tm-button/tm-button.vue';
	import tmIcons from '@/pagesTools/tm-vuetify/components/tm-icons/tm-icons.vue';
	export default {
		components:{
			tmSticky,tmButton,tmIcons
		},
		data() {
			return {
				img: uni.getStorageSync('siteConfigs').assetsPath + '/ad/goufangzige/zcjd.png',
				img1: uni.getStorageSync('siteConfigs').assetsPath + '/ad/goufangzige/xgzftj.png',
				img2: uni.getStorageSync('siteConfigs').assetsPath + '/ad/goufangzige/gsgf.png',
				img3: uni.getStorageSync('siteConfigs').assetsPath + '/ad/goufangzige/hqfs.png',
				current: 0,
				tabs: [{
						't': '成都',
						'b': '户籍',
					},
					{
						't': '非成都',
						'b': '户籍'
					},
					{
						't': '公司',
						'b': '购房'
					},
					{
						't': '个体',
						'b': '工商'
					},
					{
						't': '重点',
						'b': '注意'
					}
				],
				H:['height: 3500rpx;','height: 1060rpx;','height: 3000rpx;','height: 800rpx;','height: 5530rpx;']
			}
		},
		methods: {
			/**
			 * 切换tab
			 * @param {Object} e
			 */
			changeTab: function(e) {
				console.log(e)
				this.current = e.currentTarget.id
			},
			/**
			 * swiper切换
			 * @param {Object} e
			 */
			swiperChange:function(e){
				let that = this
				that.setData({
					current:e.detail.current
				})
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			/**
			 * 跳转到无房家庭测试
			 */
			go:function(){
				uni.navigateTo({
					url:"../noHouse/noHouse"
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

	.topImg {
		width: 100%;
		height: 200rpx;
	}

	.tabs .tab.active {
		color: rgba(0, 0, 0, .85);
		font-size: 30rpx;
		line-height: 50rpx;
		font-weight: 700;
		position: relative;
	}

	.tabs .tab {
		color: rgba(0, 0, 0, .45);
		font-size: 26rpx;
		text-align: center;
		line-height: 50rpx;
		padding: 20rpx 0 23rpx; 
		-webkit-box-sizing: border-box; 
		box-sizing: border-box;
	}

	.tabs .tab.active:before {
		display: inline-block;
		content: "";
		width: 30rpx;
		height: 7rpx;
		background: #2d8cf0;
		border-radius: 3rpx;
		position: absolute;
		bottom: -5rpx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.swipe {
		width: 100%;
	}

	.van-swipe {
		position: relative;
		overflow: hidden;
		cursor: grab;
		-webkit-user-select: none;
		user-select: none;
	}

	.van-swipe-item {
		position: relative;
		-webkit-flex-shrink: 0;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
	}

	.swipe-item-content {
		padding-bottom: 40rpx;
	}

	.swipe .title {
		padding: 10rpx 12rpx;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	.swipe .title .line {
		width: 30rpx;
		height: 5rpx;
		background: rgba(181, 182, 187, .5);
	}

	.swipe .title .text {
		font-size: 38rpx;
		color: #303237;
		font-weight: 700;
		margin: 15rpx;
	}

	.swipe .main-content {
		margin: 20rpx 30rpx;
	}

	.swipe .main-content .content-title {
		margin-bottom: 8rpx;
		font-size: 30rpx;
		line-height: 48rpx;
		color: rgba(0, 0, 0, .85);
		font-weight: 700;
	}

	.swipe .main-content .content-item {
		background: #f9fafd;
		padding: 20rpx 24rpx 24rpx 20rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.swipe .main-content .content-item .item-title {
		padding-left: 20rpx;
		background: url(../../../static/tip.png) 0/12rpx 12rpx no-repeat;
		font-size: 28rpx;
		color: rgba(0, 0, 0, .85);
		margin-bottom: 12rpx;
		line-height: 40rpx;
		font-weight: 700;
		height: 40rpx;
	}

	.swipe .main-content .content-item .item-description {
		font-size: 24rpx;
		color: rgba(0, 0, 0, .45);
		line-height: 35rpx;
		padding-left: 20rpx;
	}

	.swipe .main-content .content-item.last-child {
		margin-bottom: 60rpx;
	}
	.swipe .main-content .no-background-text {
	    font-size: 24rpx;
	    line-height: 32rpx;
	    color: rgba(0,0,0,.65);
	}
	.swipe .small-title {
	    color: rgba(0,0,0,.85);
	    font-size: 35rpx;
	    font-weight: 700;
	    margin-bottom: 20rpx;
	}
	.swipe .main-content .content-item .item-title-options{
	    font-size: 28rpx;
	    color: rgba(0,0,0,.85);
	    line-height: 42rpx;
	    margin: 20rpx 15rpx 20rpx;
	    font-weight: 700;
	}
	.swipe .small-description {
	    color: rgba(0,0,0,.65);
	    font-size: 26rpx;
	    margin-bottom: 30rpx;
	    line-height: 45rpx;
	}
</style>
