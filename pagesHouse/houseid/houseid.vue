<template>
	<view class="home">
		<tm-menubars :title="houselist.xqname?houselist.xqname:'房源详情'" iconColor="white"></tm-menubars>
		<!--		<u-navbar title="房源详情" :placeholder="true" :autoBack="true" bgColor="#00aaff"-->
		<!--			:titleStyle="{ color: '#FFF', fontSize: '32rpx' }" leftIconColor="white">-->
		<!--		</u-navbar>-->
		<!-- 轮播图 -->
		<!-- 	<u-swiper :list="reslist" indicatorMode="line" imgMode="scaleToFill" height="300px" keyName="image" showTitle
			v-if="reslist.length>0"></u-swiper>
 -->
		<view v-if="houselist.status==2">
			<view v-if="reslistflag">
				<swiper class="swiper" :interval="interval" :duration="duration" v-if="reslist.length>0">
					<swiper-item v-for="(item,index) in reslist" :key="index">
						<view class="swiper-item">
							<image :src="item.image" alt="" style="height:100%;width: 100%;object-fit: cover;"
								@click="preview(index)">
								<view class="swipertext">
									<view v-if="item.title" style="font-size: 32rpx;">{{item.title}}</view>
									<dict-tag v-else :options="dict.type.tfw_photos" :value="item.type"
										style="font-size: 32rpx;" />
								</view>
						</view>
					</swiper-item>
				</swiper>
				<div v-else style="height:160px;">
					<u-empty mode="data" text="正在拍摄中"></u-empty>
				</div>
			</view>
			<!-- 调价记录 -->
			<view style="position: relative;">
				<view class="t2 round-t-5 primary">
					<view style="font-size: 32rpx;">
						<view style="color: #FFFF14;font-weight: 600;display: flex;align-items: center;">
							<tm-icons :dense="true" name="icon-home" size="32" color="#FFFF14"
								style="margin-right: 10rpx;font-weight: 500;margin-top: -8rpx;"></tm-icons>
							<view class="" v-if="houselist.grade">
								<dict-tag v-if="houselist.grade==3" style="color: #ff4545"
									:options="dict.type.tfw_ecommendation_level" :value="houselist.grade" />
								<dict-tag v-else :options="dict.type.tfw_ecommendation_level"
									:value="houselist.grade" />
							</view>
						</view>
					</view>
					<view class="t" @tap="goPriceLog" style="font-size: 28rpx;">
						价格数据
						<tm-icons :dense="true" name="icon-angle-right" size="22" color="white"
							style="margin-left: 10rpx;font-weight: 500;margin-top: -3rpx;"></tm-icons>
					</view>
				</view>
			</view>
			<!-- vr看图 -->
			<view class="vrhouse">
				<view @tap="watchVr"
					style="width: 338rpx;height: 126rpx;background: #DFFFFF; position: relative;border-radius: 20rpx;">
					<image
						style="width: 60rpx;height: 60rpx;border-radius: 50%;position: absolute;top: 28rpx;left: 28rpx;"
						src="https://static.tianfucd.com/img/icon/esHouseDetail/vrNew.png" mode="scaleToFill"></image>
					<view style="position: absolute;top: 18rpx;left: 94rpx;color:#333333;">
						<view style="font-size: 32rpx;margin-bottom: 10rpx;">
							VR看房
						</view>
						<view style="font-size: 24rpx;">
							身临其境，在线解答
						</view>
					</view>
				</view>
				<view @click="watchvideo(houselist.video,houselist.title)"
					style="width: 338rpx;height: 126rpx;background: #FFDFDF; position: relative;border-radius: 20rpx;">
					<image
						style="width: 60rpx;height: 60rpx;border-radius: 50%;position: absolute;top: 28rpx;left: 28rpx;"
						src="https://static.tianfucd.com/img/icon/esHouseDetail/liveToSee.png" mode="scaleToFill">
					</image>
					<view v-if="houselist.video !=null && houselist.video != ''"
						style="width: 60rpx;height: 60rpx;position: absolute;top: 0rpx;right: 0rpx;">
						<image src="https://cdn.tianfucd.com/images/gif/play.gif" style="height: 60rpx;width: 60rpx;"
							mode="">
						</image>
					</view>
					<view style="position: absolute;top: 18rpx;left: 94rpx;color:#333333;">
						<view style="font-size: 32rpx;margin-bottom: 10rpx;">
							房源视频
						</view>
						<view style="font-size: 24rpx;">
							小区专家，管家服务
						</view>
					</view>
				</view>
			</view>
			<!-- 标题分享 -->
			<view class="flex-between">
				<view class="flex-betweenleft">
					{{houselist.title}}
				</view>
				<view class="flex-betweenright" style="width: 170rpx;height: 80rpx;">
					<view class="betweenrightbox" style="width: 85rpx;" @click="testshareShow()">
						<u-icon name="share-square" color="#2979ff" size="28"></u-icon>
						<view class="rt1">分享</view>
					</view>
					<view class="betweenrightbox" style="width: 85rpx;" @tap="userCollect">
						<u-icon name="heart" color="#2979ff" size="28"></u-icon>
						<view :class="'rt1 ' + (collect?'red':'')">收藏</view>
					</view>
				</view>
			</view>
			<!-- 跟进标签 -->
			<view class="flex-start">
				<view
					style="background-color:skyblue; font-size: 10px; margin-right: 20rpx; padding: 5px 5px 5px 5px; color: white;border-radius: 5px;">
					<dict-tag :options="dict.type.tfw_rent_sale" :value="houselist.type" />
				</view>
				<view class="tags" v-for="(item,index) in houselist.featuredTags" :key="index">
					<dict-tag :options="dict.type.tfw_featured_tags" :value="item" />
				</view>
				<view v-if="houselist.houseFollow">
					<view class="tags" v-if="getDiffDay(houselist.houseFollow.createdAt)== 0">今天跟进</view>
					<view class="tags" v-else>{{ houselist.houseFollow.createdAt != undefined ?"近"+
					            getDiffDay(houselist.houseFollow.createdAt) + "未天跟进" : "暂无跟进" }}</view>
				</view>
				<view class="tags" v-else>暂无跟进</view>
			</view>
			<!-- 价格 -->
			<!-- 出售 -->
			<view class="flex-between" v-if="houselist.type==1">
				<view class="inputItem">
					<text>{{houselist.sellingPrice?houselist.sellingPrice:'--'}} 万</text>
					<text class="c">售价</text>
				</view>
				<view class="inputItem be">
					<text>{{aloneprace?aloneprace:'--'}}元/㎡</text>
					<text class="c">单价</text>
				</view>
				<view class="inputItem be">
					<text>{{houselist.propertyArea?houselist.propertyArea:'--'}}m²</text>
					<text class="c">产权面积</text>
				</view>
			</view>
			<!-- 出租 -->
			<view class="flex-between" v-if="houselist.type==2">
				<view class="inputItem">
					<text>{{houselist.rental?houselist.rental:'--'}} 元/月</text>
					<text class="c">租金</text>
				</view>
				<view class="inputItem be">
					<!-- <text>{{houselist.paymentMethod?houselist.paymentMethod:'--'}}</text> -->
					<dict-tag :options="dict.type.tfw_fkfs" :value="houselist.paymentMethod" classshow="num2" />
					<text class="c" style="color: #333;font-size: 24rpx; font-weight: normal;">付款方式</text>
				</view>
				<view class="inputItem be">
					<text>{{houselist.propertyArea?houselist.propertyArea:'--'}}m²</text>
					<text class="c">产权面积</text>
				</view>
			</view>
			<!-- 租售同步 -->
			<view v-if="houselist.type==3">
				<view class="flex-between" v-if="houseid==4">
					<view class="inputItem">
						<text>{{houselist.rental?houselist.rental:'--'}}元/月</text>
						<text class="c">租金</text>
					</view>
					<view class="inputItem be">
						<!-- <text>{{houselist.paymentMethod?houselist.paymentMethod:'--'}}</text> -->
						<dict-tag :options="dict.type.tfw_fkfs" :value="houselist.paymentMethod" classshow="num2" />
						<text class="c">付款方式</text>
					</view>
					<view class="inputItem be">
						<text>{{houselist.propertyArea?houselist.propertyArea:'--'}}m²</text>
						<text class="c">产权面积</text>
					</view>
				</view>
				<view v-else class="flex-between">
					<view class="inputItem">
						<text>{{houselist.sellingPrice?houselist.sellingPrice:'--'}} 万</text>
						<text class="c">售价</text>
					</view>
					<view class="inputItem be">
						<text>{{aloneprace?aloneprace:'--'}}元/㎡</text>
						<text class="c">单价</text>
					</view>
					<view class="inputItem be">
						<text>{{houselist.propertyArea?houselist.propertyArea:'--'}}m²</text>
						<text class="c">面积</text>
					</view>
				</view>
			</view>
			<!-- 参考均价 -->
			<view class="scjj">
				<view>
					参考均价<text
						style="color:#d53c3c;margin-left: 10rpx;">{{houselist.loupanXq.refPrice?houselist.loupanXq.refPrice+"元/㎡":"暂无"}}</text>
				</view>
				<view>
					政府指导价<text
						style="color:#d53c3c;margin-left: 10rpx;">{{houselist.refPrice?houselist.refPrice+"元/㎡":"暂无"}}</text>
				</view>
			</view>
			<!-- 表单 -->
			<view>
				<view class="i" style="margin-top: 20rpx;">
					<view class="w">
						<text>小区：</text>
						<text>{{houselist.xqname?houselist.xqname:'--'}}</text>
					</view>
					<view class="i">
						<view class="it">
							<text>户型：</text>
							<text>{{houselist.loupanHuxing.bedRoomNum?houselist.loupanHuxing.bedRoomNum:"--"}}室{{houselist.loupanHuxing.livingRoomNum?houselist.loupanHuxing.livingRoomNum:"--"}}厅{{houselist.loupanHuxing.bathroomNum?houselist.loupanHuxing.bathroomNum:"--"}}卫
							</text>
						</view>
						<view class="it" style="display: flex;">
							<text>装修情况：</text>
							<dict-tag :options="dict.type.tfw_decoration_situation" :value="houselist.decoration" />
						</view>
						<view class="it">
							<text>套内面积：</text>
							<text>{{houselist.usableArea?houselist.usableArea:'--'}}m²</text>
						</view>
						<view class="it">
							<text>送后预估：</text>
							<text>{{(houselist.giveAwayArea+houselist.usableArea)?(houselist.giveAwayArea+houselist.usableArea).toFixed(0):'--'}}m²</text>
						</view>
						<view class="it" style="display: flex;">
							<text>楼层：</text>
							<view v-if="isshowinfo">
								{{houselist.floor?houselist.floor:'--'}}/{{houselist.totalFloor?houselist.totalFloor:"-"}}F
								<a @click="call('4008162019,'+(typeutel?typeutel:shareUser.utel))">查看楼层</a></view>
							<text v-else>{{houselist.floor?houselist.floor:'--'}}/{{houselist.totalFloor?houselist.totalFloor:"-"}}F</text>
						</view>
						<view class="it">
							<text>预估层高：</text>
							<text>{{houselist.loupanXq.floorHigh?houselist.loupanXq.floorHigh:"--"}}米</text>
						</view>
						<view class="it" style="display: flex;">
							<text>房屋结构:</text>
							<dict-tag :options="dict.type.tfw_house_structure" :value="houselist.structure" />
						</view>
						<view class="it" style="display: flex;">
							<text>电梯情况：</text>
							<dict-tag :options="dict.type.tfw_elevator_situation" :value="houselist.lift" />
						</view>
						<view class="it" style="display: flex;">
							<text>房本时间：</text>
							<text>{{houselist.titleDeedDate?houselist.titleDeedDate:'--'}}</text>
						</view>
						<view class="it" style="display: flex;">
							<text>产权年限：</text>
							<dict-tag :options="dict.type.tfw_cqnx" :value="houselist.ownershipYears" />
						</view>

						<view class="it" style="display: flex;">
							<text>房屋朝向：</text>
							<dict-tag :options="dict.type.tfw_housing_orientation" :value="houselist.orientation" />
						</view>
						<view class="it">
							<text>建筑年代：</text>
							<text>{{houselist.loupanXq.completed?(new Date(houselist.loupanXq.completed)).getFullYear():'--'}}</text>
						</view>
						<view class="it" v-if="houseid==4">
							<text>租房居间佣金：</text>

							<dict-tag :options="dict.type.tfw_house_commission_method"
								:value="houselist.commissionMethod" />

						</view>
						<view class="it" v-else>
							<text>买方居间佣金：</text>
							<text>{{houselist.commission?houselist.commission:'--'}}%</text>
						</view>

						<view class="it">
							<text>物业费：</text>
							<text>{{houselist.loupanXq.serviceCharge?houselist.loupanXq.serviceCharge:'--'}} 元/㎡</text>
						</view>
					</view>
					<view class="w">
						<text>附近学校：</text>
						<text
							style="font-size:24rpx;">{{houselist.loupanXq.schoolDistrict?houselist.loupanXq.schoolDistrict:'--'}}</text>
					</view>
					<view class="w" style="display: flex;flex-wrap: wrap">
						<text>附近地铁：</text>
						<view v-if="ditie">
							<text v-for="(item,index) in ditie" :key="index">
								<text style="color: #333;" v-if="index<2">
									{{item.title}}( {{item._distance}} 米 ) <view v-if="index<1">,</view>
								</text>
							</text>
						</view>
					</view>
					<view class="w" @tap="toMap(houselist.loupanXq.id)" style="display: flex;">
						<text>小区地址：</text>
						<text style="display: flex;">
							{{houselist.loupanXq.areaName?houselist.loupanXq.areaName:"--"}}|{{houselist.loupanXq.zoneCode?houselist.loupanXq.zoneCode:""}}{{houselist.loupanXq.address?houselist.loupanXq.address:'--'}}
							<tm-icons style="float: right;" name="icon-angle-right" size="28"></tm-icons>
						</text>
					</view>
					<view class="w" style="display: flex;">
						<text>最近门店：</text>
						<view style="display: flex; flex-wrap: wrap; flex: 1;">
							<view v-if="getDistanceDataFlag">
								{{getDistanceData.content[0].content.name.split(",")[1]}}
								距您当前位置（大约）{{Math.round(getDistanceData.content[0].distance.value)}}米
							</view>
							<view v-else>
								{{houselist.loupanXq.title}}物业中心
							</view>
						</view>
					</view>
				</view>

				<view class="" v-if=" houseid != 4 && houselist.type != 2 && houselist.type != 3">
					<view class="side">
						购房预估
						<text style="font-size:24rpx ;color:#999;margin-left:20rpx;">(仅供参考,实际以贷款银行为准)</text>
					</view>
					<view style="font-size:24rpx;color: #333333;white-space:pre-wrap;padding-left: 40rpx;">
						<text style="color: #999999;">购房预算参考：</text>
						{{ "首付1.5成约为" + shoufu + "万，贷款8.5成约为" + loanamount+ "万"}}
						<view style="padding-left: 60rpx;">
							{{"贷款30年 = 月供约为" + mortgagepayment + "元"}}
						</view>
					</view>

					<view style="font-size: 24rpx;color: #F08C00;margin-top:10rpx;padding-left: 40rpx;">
						安全提示：购房款进房管局资金监管，购房款不经过经纪公司
					</view>
					<view class="side">
						税费参考
						<text style="font-size:24rpx ;color:#999;margin-left:20rpx;">(以税务核税为准)</text>
					</view>

					<!-- 契税 -->
					<view class="border-grey-t-1 border-grey-l-1 border-grey-r-1">
						<view class="border-grey-b-1">
							<tm-col custom-class="col" :grid="3">
								<view style="height: 120rpx;">
									<view style="height:80rpx;line-height:80rpx;">
										契税
									</view>
									<view style="color: #666;font-size: 16rpx;height: 50rpx;line-height:30rpx;">
										(买方)
									</view>
								</view>
							</tm-col>
							<tm-col :grid="9">
								<view v-if="houselist.params.deeds.length>1">
									<tm-col v-for="(deedsItem,index) in houselist.params.deeds" :key="index"
										:color="index%2?'':'green text '" :grid="12">
										<view style="height: 40rpx;line-height: 40rpx;" class="text-size-xs flex-wrap">
											{{deedsItem}}
										</view>
									</tm-col>
								</view>

								<tm-col :grid="9" v-else height="100%">
									<view class="text-size-xs flex-shrink px-10"
										style="height:120rpx;line-height: 120rpx;">
										{{houselist.params.deeds[0]}}
									</view>
								</tm-col>
							</tm-col>
						</view>
						<tm-col custom-class="col border-grey-b-1" :grid="3">
							<view style="height: 80rpx;">
								<view style="height: 50rpx;line-height: 50rpx;">
									登记费
								</view>
								<view style="color: #666;font-size: 16rpx;height: 30rpx;line-height: 30rpx;">
									(买方)
								</view>
							</view>
						</tm-col>
						<tm-col customClass="border-grey-b-1" :grid="9">
							<view class="text-size-xs flex-shrink px-10" style="height: 80rpx;line-height: 80rpx;">
								{{houselist.params.capitalFee}}
							</view>
						</tm-col>
						<view v-if="houselist.params.type == '二手房'">
							<tm-col custom-class="col border-grey-b-1" :grid="3">
								<view style="height: 80rpx;">
									<view style="height: 50rpx;line-height: 50rpx;">
										增值税
									</view>
									<view style="color: #666;font-size: 16rpx;height: 30rpx;line-height: 30rpx;">
										(卖方)
									</view>
								</view>
							</tm-col>
							<tm-col customClass="border-grey-b-1" :grid="9">
								<view class="text-size-xs flex-shrink px-10" style="height: 80rpx;line-height: 80rpx;">
									{{houselist.params.vat}}
								</view>
							</tm-col>
							<tm-col custom-class="col border-grey-b-1" :grid="3">
								<view style="height: 80rpx;">
									<view style="height: 50rpx;line-height: 50rpx;">
										个税
									</view>
									<view style="color: #666;font-size: 16rpx;height: 30rpx;line-height: 30rpx;">
										(卖方)
									</view>
								</view>
							</tm-col>
							<tm-col customClass="border-grey-b-1" :grid="9">
								<view class="text-size-xs flex-shrink px-10" style="height: 80rpx;line-height: 80rpx;">
									{{houselist.params.personalTaxes}}
								</view>
							</tm-col>
						</view>
						<view v-if="houselist.params.type == '新房'">
							<tm-col custom-class="col border-grey-b-1" :grid="3">
								<view style="height: 80rpx;">
									<view style="height: 50rpx;line-height: 50rpx;">
										维修基金
									</view>
									<view style="color: #666;font-size: 16rpx;height: 30rpx;line-height: 30rpx;">
										(买方)
									</view>
								</view>
							</tm-col>
							<tm-col customClass="border-grey-b-1" :grid="9">
								<view class="text-size-xs flex-shrink px-10" style="height: 80rpx;line-height: 80rpx;">
									{{houselist.params.repairBasic}}
								</view>
							</tm-col>
						</view>
					</view>
				</view>


				<!-- 位置与周边 -->
				<view class="side">位置与周边</view>
				<mapMini :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers"
					:fangId='houselist.xqId' :scale="15" v-if="isshowmap"></mapMini>
				<!-- 房源描述 -->
				<view class="side">房源描述</view>
				<tm-tabs align="left" @change="tabChange" v-model="activeIndex"
					:list="['房源特色','小区介绍','房源详情']"></tm-tabs>
				<tm-sheet :margin="sheetMargin">
					<scroll-view scroll-y="true" style="height: 400rpx;" class="scroll-Y">


						<mp-html v-if="activeIndex == 0" class="sideInfo" :content="houselist.features" />


						<view v-if="activeIndex == 1" class="i" style="margin-top: 20rpx;">
							<view class="it">
								<text>小区名：</text>
								<text>{{houselist.xqname?houselist.xqname:'--'}}</text>
							</view>
							<view class="it">
								<text>开发商名：</text>
								<text>{{houselist.loupanXq.developer?houselist.loupanXq.developer:'--'}}</text>
							</view>
							<view class="it" style="display: flex;">
								<text>建筑特色：</text>
								<view v-for="(item,index) in houselist.loupanXq.featuredTags" :key="index">
									<dict-tag :options="dict.type.tfw_featured_tags" :value="item" />&nbsp
								</view>
							</view>
							<view class="it">
								<text>占地亩数：</text>
								<text>{{houselist.loupanXq.landArea?houselist.loupanXq.landArea:'--'}} 亩</text>
							</view>
							<view class="it">
								<text>建筑年代：</text>
								<text>{{houselist.loupanXq.completed ? houselist.loupanXq.completed:'--'}}</text>
							</view>
							<view class="it">
								<text>总栋数：</text>
								<text>{{houselist.loupanXq.totalBuilding?houselist.loupanXq.totalBuilding:'--'}}栋</text>
							</view>
							<view class="it">
								<text>总户数：</text>
								<text>{{houselist.loupanXq.totalHouseholds?houselist.loupanXq.totalHouseholds:'--'}}户</text>
							</view>
							<view class="it">
								<text>车位总数：</text>
								<text>{{houselist.loupanXq.parkingPlace?houselist.loupanXq.parkingPlace:'--'}}</text>
							</view>
							<view class="it">
								<text>停车月费：</text>
								<text>{{houselist.loupanXq.monthlyParkingFee?houselist.loupanXq.monthlyParkingFee:'--'}}</text>
							</view>
							<view class="it">
								<text>物业公司：</text>
								<text>{{houselist.loupanXq.pmc?houselist.loupanXq.pmc:'--'}}</text>
							</view>
							<view class="it">
								<text>物业单价：</text>
								<text>{{houselist.loupanXq.serviceCharge?houselist.loupanXq.serviceCharge:'--'}}元/㎡</text>
							</view>
							<view class="it">
								<text>挂牌均价：</text>
								<text>{{houselist.loupanXq.refPrice?houselist.loupanXq.refPrice:'--'}} 元/㎡</text>
							</view>
						</view>
						<view v-if="activeIndex == 2" class="i" style="margin-top: 20rpx;">
							<view class="it">
								<text>天府编号：</text>
								<text>{{houselist.id?houselist.id:'--'}}</text>
							</view>
							<view class="it">
								<text>房源户型：</text>
								<text>{{houselist.loupanHuxing.title?houselist.loupanHuxing.title:'--'}}</text>
							</view>
							<view class="it">
								<text>产权日期：</text>
								<text>{{houselist.titleDeedDate?houselist.titleDeedDate:'--'}}</text>
							</view>
							<view class="it">
								<text>产权面积：</text>
								<text>{{houselist.propertyArea?houselist.propertyArea:'--'}}m²</text>
							</view>
							<view class="it">
								<text>套内面积：</text>
								<text>{{houselist.usableArea?houselist.usableArea:'--'}}m²</text>
							</view>
							<view class="it" style="display: flex;">
								<text>供暖方式：</text>
								<dict-tag :options="dict.type.tfw_heating_type" :value="houselist.heating" />
							</view>
							<view class="it">
								<text>梯户比例：</text>
								<text>{{houselist.elevator?houselist.elevator:'--'}}梯{{houselist.suites?houselist.suites:'--'}}户</text>
							</view>
							<view class="it" style="display: flex;">
								<text>房本年限：</text>
								<dict-tag :options="dict.type.tfw_property_rights" :value="houselist.ownershipYears" />
							</view>
							<view class="it" style="display: flex;">
								<text>房屋用途：</text>
								<view v-for="(item,index) in houselist.propertyType" :key="index">
									<dict-tag :options="dict.type.tfw_property_type" :value="item" />
								</view>
							</view>
							<view class="it" style="display: flex;">
								<text>交易权属：</text>
								<dict-tag :options="dict.type.tfw_tosp" :value="houselist.transactionOwnership" />
							</view>
							<view class="it" style="display: flex;">
								<text>产权所有：</text>
								<dict-tag :options="dict.type.tfw_property_ownership"
									:value="houselist.equityOwnership" />
							</view>
							<view class="it" style="display: flex;">
								<text>是否贷款：</text>
								<dict-tag :options="dict.type.tfw_mortgage_situation" :value="houselist.collateral" />
							</view>
						</view>
					</scroll-view>
				</tm-sheet>
				<view class="side">管家经纪人</view>
				<view>
					<view class="flex-between mb-20" v-for="(item,index) in shareUserList">
						<tm-avatar :size="100" :shadow="4" :src="item.avatar"></tm-avatar>
						<view style="text-align: left !important;width: 330rpx;">
							<view class="mb-10" style="font-size: 32rpx;font-weight: 700;">
								{{item.nickName}}
								<text class="ml-20" style="font-size: 24rpx;font-weight: 400;color: #999999;">
									{{item.companyDept.deptName}}
								</text>
							</view>
							<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
								上线 {{item.openId}} 套房源
							</view>
						</view>
						<view class="flex-center mr-20">
							<view class="flex-start" @click="call('4008162019,'+item.utel)">
								<image src="/static/icon/house/phone.png" style="width: 80rpx;height: 80rpx;" mode="">
								</image>
							</view>
						</view>
					</view>
					<view style="display: flex;justify-content: center;" v-if="showAll" @click="toggleShowAll"
						:class="{ 'hidden': showAll }">展开</view>
					<view style="display: flex;justify-content: center;" v-else @click="toggleShowAll"
						:class="{ 'hidden': !showAll }">收起</view>
				</view>
				<view style="margin-bottom:80px;">
					<view class="side">房源评价</view>
					<view v-if="houseFollow.length>0">
						<view class="flex-top-start mb-30" v-for="(item,index) in houseFollow" :key="index">
							<tm-avatar :size="100" :shadow="4" :src="item.userAvatar"></tm-avatar>
							<view style="margin-left: 30rpx;text-align: left !important;">
								<view style="font-size: 32rpx;font-weight: 700;">
									{{item.createByName}}
									<text class="ml-20" style="font-size: 24rpx;font-weight: 400;color: #999999;">
										{{item.createdAt}}
									</text>
								</view>
								<mp-html class="sideInfo" :content="item.remark" />
							</view>
						</view>
					</view>
					<view v-else style="margin-bottom:80px; padding-left: 40rpx; padding-right: 40rpx; z-index:99999">
						<view>暂无房源评价</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else style="font-size: 40px;text-align: center;">该房源已下架</view>
		<!-- 二手房 -->
		<index-house :homeFeuer="secondarylist" :househead="1" :houseid="0" v-if="secondarylist"></index-house>
		<tm-sheet>
			<tm-shareSheet @change="shereClick" :actions="shareAct" v-model="shareShow"></tm-shareSheet>
		</tm-sheet>

		<!-- 自己的底部模块 -->
		<view v-if="houselist">
			<view class="footer2" style="z-index: 200;" v-if="hasRoleflag">
				<!-- <u-button type="primary" shape="circle" text="已领取房源" v-if="receive > 0"></u-button> -->
				<!-- <u-button type="primary" shape="circle" text="领取房源" v-else @tap="goReceive(houseDetail.bh)"></u-button> -->
				<u-button type="primary" shape="circle" text="业主信息" @click="test()"></u-button>
				<u-button type="primary" shape="circle" text="快捷修改" @click="goeditHouseId()"></u-button>
				<u-button type="primary" shape="circle" text="房源跟进" @tap="goFollowUp(houselist.id)"></u-button>
			</view>
			<view class="footer2" style="z-index: 222;" v-else>
				<block class="footer2box">
					<view class="n" @tap="shop(item.uid)" style="align-items: center;">
						<image :src="typeimg?typeimg:shareUser.avatar" mode="aspectFill"></image>
						<view class="n1">
							<text style="font-size: 32rpx;">{{typename?typename:shareUser.nickName}}</text>
							<text>{{ shareUser.companyDept.deptName }}</text>
						</view>
					</view>
					<u-button type="primary" shape="circle" text="电话联系"
						@tap="call('4008162019,'+(typeutel?typeutel:shareUser.utel))"></u-button>
					<u-button type="warning" shape="circle" text="在线咨询"
						@tap="goChat()"></u-button>
					<!-- <u-button type="primary" shape="circle" text="预约看房"
						@tap="subscribe(houselist.id,houselist.xqname,houselist.shareUser.utel,houselist.userId)"></u-button> -->
				</block>
			</view>
		</view>
		<!-- 自己写的-->
		<view>
			<tm-poup height="600" v-if="popupshow" v-model="popupshow" position="bottom">
				<view class="text-size-lg text-weight-b text-align-center py-30">
					业主信息
				</view>
				<view class="flex-between mb-20">
					<view class="ml-50" style="text-align: left !important;">

						<view style="color: #666666;">
							<view v-for="(item,index) in houselist.phoneNumber" :key="index" style="font-size: 36rpx;">
								<view style="font-size: 32rpx;font-weight: 700;">
									{{item.name}}
								</view>

								{{item.value}}
								<tm-icons v-if="houselist.ifUpdate" size="36" @tap="call(item.value)" color="cyan"
									name="icon-phone" style="margin-left: 30rpx;"></tm-icons>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-between mb-20">
					<view class="ml-50" style="text-align: left !important;">
						<view style="font-size: 32rpx;font-weight: 700;">
							{{houselist.xqname}}
						</view>
						<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
							{{houselist.building}}栋{{houselist.unit}}单元{{houselist.floor}}楼{{houselist.roomNum}}号
							<view style="display: flex;">
								看房方式：<dict-tag :options="dict.type.tfw_kffs" :value="houselist.kfang" />
							</view>

						</view>
					</view>
				</view>
				<view class="flex-between mb-20">
					<view class="ml-50" style="text-align: left !important;">
						<view style="font-size: 32rpx;font-weight: 700;">
							房源所有人
						</view>
						<view style="font-size: 32rpx;font-weight: 400;color: #666666;">
							{{houselist.sysUser.nickName}}
						</view>
					</view>
					<view class="flex-col mr-50">
						<view class="flex-start" @tap="call(houselist.sysUser.phonenumber)">
							<tm-icons size="64" color="cyan" name="icon-phone"></tm-icons>
						</view>
					</view>
				</view>
			</tm-poup>
		</view>
	</view>
</template>
<script>
	import UButton from "@/pagesHouse/uview-ui/components/u-button/u-button.vue";
	import UIcon from "@/pagesHouse/uview-ui/components/u-icon/u-icon.vue";
	import UEmpty from "@/pagesHouse/uview-ui/components/u-empty/u-empty.vue";
	import USwiper from "@/pagesHouse/uview-ui/components/u-swiper/u-swiper.vue";
	import tmImages from '@/pagesHouse/tm-vuetify/components/tm-images/tm-images.vue';
	import tmSheet from '@/pagesHouse/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmTabs from '@/pagesHouse/tm-vuetify/components/tm-tabs/tm-tabs.vue';
	import tmIcons from '@/pagesHouse/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmPoup from '@/pagesHouse/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmAvatar from '@/pagesHouse/tm-vuetify/components/tm-avatar/tm-avatar.vue';
	import tmRow from "@/pagesHouse/tm-vuetify/components/tm-row/tm-row.vue";
	import tmCol from "@/pagesHouse/tm-vuetify/components/tm-col/tm-col.vue";
	import tmShareSheet from '@/pagesHouse/tm-vuetify/components/tm-shareSheet/tm-shareSheet.vue';
	import tmEmpty from '@/pagesHouse/tm-vuetify/components/tm-empty/tm-empty.vue';
	import tmMenubars from '@/pagesHouse/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmMaskFlow from '@/pagesHouse/tm-vuetify/components/tm-maskFlow/tm-maskFlow.vue';
	import store from '@/tm-vuetify/tool/store/tm-vuetify.js'
	import indexHouse from '@/pagesHouse/components/index-house/index-house.vue';
	import LoanCaculate from "@/pagesTools/components/calculator/LoanCaculate.js"

	import {
		getFangyuan,
		getfanyuanphotos,
		getfloower,
		getlpxq,
		gethuxing,
		wxIndexList,
		deptLatLon,
		todayView
	} from '@/api/houst.js'
	let QQMapWS = require("../../js_sdk/skyrrrt-ws-jssdk/qqmap-ws-jssdk.js"); // 实例化API核心类
	let qqmapsdk = new QQMapWS.default({
		key: 'XJTBZ-XW5K4-5KBU6-D37VL-LAHGF-RSBBI'
	});
	export default {
		dicts: ['tfw_decoration_situation', 'tfw_rent_sale', 'tfw_czlx', 'tfw_house_structure', 'tfw_featured_tags',
			'tfw_elevator_situation', 'tfw_cqnx', "tfw_housing_orientation", "tfw_decoration_situation",
			"tfw_property_rights", "tfw_property_type", "tfw_heating_type", "tfw_property_ownership", "tfw_kffs",
			"tfw_fkfs", 'tfw_kffs', 'tfw_ecommendation_level', 'tfw_photos', 'tfw_mortgage_situation', 'tfw_tosp',
			"tfw_house_commission_method"
		],
		components: {
			UButton,
			UIcon,
			UEmpty,
			USwiper,
			tmImages,
			tmSheet,
			tmTabs,
			tmIcons,
			tmAvatar,
			tmPoup,
			tmRow,
			tmCol,
			tmShareSheet,
			tmEmpty,
			tmMenubars,
			tmMaskFlow,
			indexHouse
		},

		data() {
			return {
				typename: null,
				typeimg: null,
				typeutel: null,
				share: {
					title: '',
					imageUrl: '',
					query: ''
				},
				reslistflag: false,
				background: ['color1', 'color2', 'color3'],
				autoplay: true,
				interval: 2000,
				duration: 500,
				hasRoleflag: false,

				//展示模态框
				popupshow: false,
				// 业主信息弹窗
				houseid: null,
				//房源评价
				houseFollow: [],
				activeIndex: 0,
				//房源详情
				houselist: {
					status: 2,
					loupanXq: {},
					params: {
						deeds: []
					}
				},
				houselistflag: false,
				//房源相册,
				reslist: [],
				contactDetailsShow: false, //弹出联系方式
				listtabs: [{
						name: "核心卖点"
					},
					{
						name: "小区介绍"
					},
					{
						name: "房源详情"
					}
				],
				sheetMargin: [0.0],
				markers: [{
					callout: {
						'content': "kunkun",
						'display': 'ALWAYS',
						'borderRadius': '25',
						'bgColor': '#3fbaa6',
						'color': '#FFF',
						'padding': '10'
					},
					latitude: 0,
					longitude: 0,
					iconPath: "https://cdn.tianfucd.com/images/applet/dingwei.png", //图标路径
					width: 20,
					height: 20
				}],
				isshowmap: false,
				//二手房列表
				secondarylist: [],
				// 二手
				queryParams: {
					ifNewHouse: 2,
					huXTitle: 0,
					type: 5
				},
				//单价
				aloneprace: null,
				//贷款金额
				loanamount: null,
				// 首付
				shoufu: null,
				// 月供
				mortgagepayment: null,
				ditie: null,
				shareAct: [
					[
						// #ifdef MP-WEIXIN
						{
							name: "微信",
							bgcolor: "#07c160",
							icon: "icon-weixin",
							color: "white"
						},
						// #endif
						// #ifndef MP-WEIXIN
						{
							name: "微信",
							bgcolor: "#07c160",
							icon: "icon-weixin",
							color: "white"
						},
						{
							name: "朋友圈",
							bgcolor: "#04c887",
							icon: "icon-pengyouquan",
							color: "white"
						},
						{
							name: "微博",
							bgcolor: "#e91e38",
							icon: "icon-weibo",
							color: "white"
						},
						{
							name: "QQ",
							bgcolor: "#1dc0fd",
							icon: "icon-QQ",
							color: "white"
						},
						// #endif
					],
					[{
							name: "分享海报",
							bgcolor: "#f5f5f5",
							icon: "icon-picture",
							color: "grey-darken-1"
						},
						{
							name: "复制链接",
							bgcolor: "#f5f5f5",
							icon: "icon-connection",
							color: "grey-darken-1"
						},
						{
							name: "二维码",
							bgcolor: "#f5f5f5",
							icon: "icon-qrcode",
							color: "grey-darken-1"
						},
					]
				],
				shareShow: false,
				// 距离店铺位置距离
				getDistanceData: {},
				getDistanceDataFlag: false,
				isshowinfo: true,
				wxShare: {
					detailId: '',
					xq: '',
					area: '',
					title: '',
					money: ''
				},
				//小区经纪人
				shareUserList: [],
				shareUser: null,
				showAll: false, // 控制是否显示全部元素  
				shuffledIndices: [], // 存储随机索引的数组  
			}
		},
		methods: {
			//查看楼层
			getinfo() {
				this.$store.dispatch('user/GetInfo').then(res => {
					console.log(res, "返回rescode");
				})
			},
			//快捷修改
			goeditHouseId() {
				let data = this.houselist
				this.$tab.navigateTo("/pagesHouse/houseid/editHouseId?id=" +
					data.id + "&sellingPrice=" + data.sellingPrice + "&rental=" + data.rental + "&type=" + data.type +
					"&status=" + data.status + "&state=" + data.state);
			},
			// 计算距离店铺多远
			getDistance(a, b, c, d) {
				var _this = this;
				let from = a + "," + b
				let to = c + "," + d
				qqmapsdk.calculateDistance({
					mode: "walking",
					from: from,
					to: to,
					success: function(res) { //搜索成功后的回调
						_this.getDistanceData = res.result.elements[0]
						_this.getDistanceDataFlag = true
					}
				})
			},
			testshareShow() {
				this.shareShow = true
			},
			nearby_search: function(lat, lng) {
				var _this = this;
				// 调用接口
				let atAng = _this.getMaxMinLongitudeLatitude(lng, lat, 2)
				qqmapsdk.search({
					keyword: "地铁", //搜索关键词
					page_size: 30,
					location: lat + ',' + lng, //设置周边搜索中心点
					rectangle: atAng.minlat + ',' + atAng.minlng + ',' + atAng.maxlat + ',' + atAng.maxlng,
					success: function(res) { //搜索成功后的回调
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].title = res.data[i].title.replace("[地铁站]", "地铁站")
						}
						_this.ditie = res.data
					}
				});
			},
			getMaxMinLongitudeLatitude(longitude, latitude, distince) {
				let r = 6371.393; // 地球半径千米
				let lng = longitude;
				let lat = latitude;
				let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
				dlng = dlng * 180 / Math.PI; // 角度转为弧度
				let dlat = distince / r;
				dlat = dlat * 180 / Math.PI;
				let minlat = lat - dlat;
				let maxlat = lat + dlat;
				let minlng = lng - dlng;
				let maxlng = lng + dlng;
				return {
					minlng: minlng,
					maxlng: maxlng,
					minlat: minlat,
					maxlat: maxlat
				}
			},
			preview(i) {
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: i,
					// 所有图片 url 地址的数组
					urls: this.reslist.map(x => x.image)
				})
			},
			// 计算两个日期差
			getDiffDay(date_1) {
				// 计算两个日期之间的差值
				let totalDays, diffDate
				let myDate_1 = Date.parse(date_1)
				let date_2 = new Date()
				let myDate_2 = Date.parse(date_2)
				// 将两个日期都转换为毫秒格式，然后做差
				diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
				totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
				return totalDays // 相差的天数
			},
			/**
			 * 获取位置信息
			 * @param {*} city
			 */
			dingwei: function() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: latitude,
								longitude: longitude
							},
							success: function(res) {
								var city = res.result.ad_info.city;
								var cityCode = (res.result.ad_info.city_code).replace(res
									.result.ad_info.nation_code, '')
								var cityDistrict = res.result.ad_info.district
								var province = res.result.ad_info.province
								that.setData({
									city: city,
									cityDistrict: cityDistrict,
									province: province
								})
								var city1 = city.substring(0, city.indexOf('市'));
								uni.setStorageSync('city', city1);
								uni.setStorageSync('cityCode', cityCode);
								uni.setStorageSync('cityDistrict', cityDistrict);
								uni.setStorageSync('province', province);
								that.setData({
									nowcity: city1,
									cityDistrict: cityDistrict
								});
								that.getnowcity()
							}
						});
					},
					fail: function(res) {
						that.setData({
							nowcity: "成都市",
							cityDistrict: "青羊区"
						});
					}
				});
			},
			//获取地址展示
			getnowcity() {
				var that = this;
				var city = uni.getStorageSync('city')
				var cityCode = uni.getStorageSync('cityCode')
				if (city == null || city == '' || cityCode == null || cityCode == '') {
					that.dingwei();
				} else {
					var _this = this;
					uni.getLocation({
						type: 'gcj02',
						success: res => {
							deptLatLon({
								cityCode: cityCode,
								lat: res.latitude,
								lon: res.longitude,
								params: {
									count: 1,
									radiusInMeters: 5000
								}

							}).then(resdept => {
								if (resdept.data.content.length > 0) {
									this.getDistanceData = resdept.data
									this.getDistanceDataFlag = true
								}
							})
						}
					})
					that.setData({
						'nowcity': city,
						"citynumber": cityCode,
						cityDistrict: uni.getStorageSync("cityDistrict")
					})
					// 数据库对应的是l.citycode
					this.queryParams.huXTitle = cityCode
					//二手房
					wxIndexList(this.queryParams).then(response => {
						this.secondarylist = response.rows;
					})
				}

			},
			//展示业主信息
			test() {
				this.popupshow = true
			},
			//关闭业主信息
			close() {
				this.popupshow = false
			},
			//点击详情地址
			toMap() {

			},
			//拨打电话
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// 在线咨询（跳转聊天页）
			goChat() {
				const brokerId = this.shareUser ? this.shareUser.userId : (this.houselist ? this.houselist.userId : '');
				if (!brokerId) {
					uni.showToast({
						icon: 'none',
						title: '暂无法咨询'
					});
					return;
				}
				const h = this.houselist || {};
				let tradeType = '买房';
				let price = '';
				if (h.type == 2 || h.type == 3) {
					tradeType = '租房';
					price = h.rental ? h.rental + '元/月' : '';
				} else {
					price = h.sellingPrice ? h.sellingPrice + '万' : '';
				}
				let huxing = '';
				if (h.loupanHuxing) {
					huxing = (h.loupanHuxing.bedRoomNum || '--') + '室' + (h.loupanHuxing.livingRoomNum || '--') +
						'厅' + (h.loupanHuxing.bathroomNum || '--') + '卫';
				}
				const houseInfo = {
					houseId: h.id,
					title: h.xqname || '',
					huxing: huxing,
					area: h.propertyArea ? h.propertyArea + '㎡' : '',
					price: price,
					tradeType: tradeType
				};
				uni.navigateTo({
					url: '/pagesHouse/chat/chat?brokerId=' + brokerId + '&brokerName=' + encodeURIComponent(this.shareUser ? (this.shareUser.nickName || '') : '') + '&houseInfo=' + encodeURIComponent(JSON.stringify(houseInfo))
				});
			},
			// vr播放
			watchVr: function() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			},
			// 视频播放
			watchvideo: function(video, title) {
				if (video != '' && video != null) {
					uni.redirectTo({
						url: './watchVideo?video=' + video + '&title=' + title
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '视频拍摄中'
					})
				}
			},
			// 查看调价记录
			goPriceLog() {
				uni.navigateTo({
					url: '/pagesHouse/priceLog/priceLog?id=' + this.houselist.id
				});
			},
			/*监听分享选项*/
			shereClick: function(e) {
				let that = this
				switch (e.data.name) {
					case '分享海报':
						uni.navigateTo({
							url: "../../pagesTools/pages/houseShare/houseShare?id=" + that.houselist.id +
								"&type=" + this.houseid
						})
						that.shareShow = false
						break;
					default:
						uni.showToast({
							icon: "none",
							title: "功能暂未开放"
						})
				}
			},
			/**
			 * 监听tab改变
			 */
			tabChange: function(e) {
				this.activeIndex = e
			},
			/**
			 * 跳转到经纪人店铺
			 * @param {Object} id
			 */
			shop: function(id) {
				uni.navigateTo({
					url: "/pagesUser/shop/shop?id=" + id
				})
			},
			//预约
			subscribe: function(uid, title, phone, userid) {
				uni.navigateTo({
					url: '/pagesTools/pages/xingn/publicyuyue/publicyuyue?uid=' + uid + '&title=' + title +
						'&phone=' +
						phone +
						'&userid=' +
						userid +
						'&type=' +
						this.houseid + '&idtype=' + this.houseid,
				})
			},
			/**
			 * 跳转到跟进页面
			 * @param {Object} id
			 */
			goFollowUp: function(id) {
				uni.navigateTo({
					url: "./follow_up?id=" + id
				})
			},
			getHouse(e) {
				this.hasRoleflag = this.hasRole(['common', 'jjr', 'guanjia', 'dianzhang', 'tfwadmin'])
				this.getnowcity()
				let eid = null
				let shareUserId = null
				let ehouseid = null
				let usertype = this.$store.state.user.userdata.userType
				if (e.scene) {
					let str = decodeURIComponent(e.scene);
					let jsonStr = '{"' + str.replace(/=/g, '": "').replace(/&/g, '", "') + '"}';
					let jsonObj = JSON.parse(jsonStr);
					eid = jsonObj.id
					ehouseid = jsonObj.houseid
					this.houseid = jsonObj.houseid
				}
				if (e.id) {
					eid = e.id
					this.houseid = e.houseid
					ehouseid = e.houseid;
				}
				if (e.shareUserId) {
					shareUserId = e.shareUserId
				}
				//房源详情
				let seeType = 1;
				if (ehouseid === '4') seeType = 2;
				getFangyuan(eid, usertype, shareUserId, seeType).then(response => {
					this.houselist = response.data
					this.shareUserList = this.houselist.sysUserList.slice(0, 2);
					let randomIndex = Math.floor(Math.random() * this.houselist.sysUserList.length)
					this.shareUser = this.houselist.sysUserList[randomIndex]
					this.houselist.phoneNumber = JSON.parse(this.houselist.phoneNumber)
					this.houselist.featuredTags = this.houselist.featuredTags.split(',').filter(item => item != "")
					this.houselist.loupanXq.featuredTags = this.houselist.loupanXq.featuredTags.split(',').filter(
						item => item != "")
					this.houselistflag = true
					this.aloneprace = (this.houselist.sellingPrice * 10000 / this.houselist.propertyArea).toFixed(
						0)
					this.loanamount = (this.houselist.sellingPrice * 0.85).toFixed(1)
					this.shoufu = (this.houselist.sellingPrice * 0.15).toFixed(1)
					this.mortgagepayment = (LoanCaculate.Acpi(0.03, this.houselist.sellingPrice * 10000 * 0.85,
						30 * 12)).toFixed(0);
					this.nearby_search(this.houselist.loupanXq.lat, this.houselist.loupanXq.lon)
					this.markers[0].callout.content = this.houselist.loupanXq.title
					this.markers[0].latitude = this.houselist.loupanXq.lat
					this.markers[0].longitude = this.houselist.loupanXq.lon
					this.isshowmap = true;
					//房源相册轮播图
					this.share.title = this.houselist.loupanXq.title + "|售价：" + (this.houselist.sellingPrice ? this
							.houselist.sellingPrice : '--') + "万|单价：" + (this.aloneprace ? this.aloneprace :
							'--') + "元/㎡|产权面积：" + (this.houselist.propertyArea ? this.houselist.propertyArea :
							'--') +
						"㎡"
					this.share.imageUrl = "https://static.tianfucd.com/" + response.data.coverfile
					if (this.houselist.housePhotos) {
						this.houselist.housePhotos.forEach(function(item) {
							item.image = "https://static.tianfucd.com/" + item.image;
						});
						this.reslist = this.houselist.housePhotos
						if (this.houselist.loupanHuxing && this.houselist.loupanHuxing.img) {
							this.reslist.unshift({
								image: "https://static.tianfucd.com/" + this.houselist.loupanHuxing
									.img,
								title: "户型图"
							})
						}
						if (this.houselist.coverfile) {
							this.reslist.unshift({
								image: "https://static.tianfucd.com/" + this.houselist.coverfile,
								title: "封面图"
							})
						}
						this.reslistflag = true
					} else {
						this.reslist = []
						this.reslistflag = true
					}
					//处理低中高楼层显示
					if(this.isshowinfo)	{
						if(this.houselist.lift === "2") {
							if(this.houselist.floor != null && this.houselist.floor <= 7) {
								this.houselist.floor = '低层'
							} else if( 8 <= this.houselist.floor < 13) {
								this.houselist.floor = '中层'
							} else {
								this.houselist.floor = '高层'
							}
						} else {
							if(this.houselist.floor != null && this.houselist.floor <= 2) {
								this.houselist.floor = '低层'
							} else if( 3 <= this.houselist.floor <= 4) {
								this.houselist.floor = '中层'
							} else {
								this.houselist.floor = '高层'
							}
						}
					}
				});
				// 房源评价接口
				getfloower({
					type: 2,
					houseId: eid
				}).then(res => {
					if (typeof res.rows !== 'undefined') {
						this.houseFollow = res.rows;
					}
				});

			},
			//折叠
			toggleShowAll() {
				if (this.showAll) {
					this.shareUserList = this.houselist.sysUserList;
				} else {
					this.shareUserList = this.houselist.sysUserList.slice(0, 2);
				}
				this.showAll = !this.showAll;
			},
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
			console.log(this.houselist, 'wxShare')
			let houseDetail = this.houselist
			let money = ""
			if (this.houseid == 2) {
				if (houseDetail.type == 1) money = houseDetail.sellingPrice + "万"
				else if (houseDetail.type == 2) money = houseDetail.rental + "元"
				else money = houseDetail.sellingPrice + "万"
			} else if (this.houseid == 4) {
				money = houseDetail.rental + "元"
			} else {
				money = houseDetail.sellingPrice + "万"
			}
			let share = houseDetail.xqname + '【' + houseDetail.propertyArea + '㎡】';
			if (houseDetail.loupanHuxing != null) {
				share += '【' + (houseDetail.loupanHuxing.bedRoomNum ? houseDetail.loupanHuxing.bedRoomNum : "--") + "室" +
					(houseDetail.loupanHuxing.livingRoomNum ? houseDetail.loupanHuxing.livingRoomNum : "--") + '厅' +
					(houseDetail.loupanHuxing.bathroomNum ? houseDetail.loupanHuxing.bathroomNum : "--") + "卫" + '】'
			}
			share += '【' + money + '】';
			console.log(share, 'share分享内容')
			let sharePath = '/pagesHouse/houseid/houseid?id=' + houseDetail.id + "&houseid=" + this.houseid;
			//判断查询分享条件
			if (this.$store.state.user.userdata.userType == '00') {
				sharePath += '&shareUserId=' + this.$store.state.user.userdata.userId;
			}
			return {
				title: share,
				path: sharePath
			}
		},
		onShow(e) {
			if (this.$store.state.user.userdata.nickName) {
				this.isshowinfo = false
			}
		},
		onLoad(e) {
			console.log(e, "接收的数据");
			console.log(this.$store.state.user.userdata, "当前登录人");

			// 从详情页返回该页面的获取数据
			uni.$on('refreshData', () => {
				this.getHouse(e);
			})
			//处理本人是否查看房源超过指定套数
			try {
				if (this.$store.state.user.userdata.userType == '00') {
					this.share.query = 'typename=' + this.$store.state.user.userdata.nickName + '&houseid=' + e.houseid +
						'&id=' +
						e.id + '&typeimg=' + this.$store.state.user.userdata.avatar + '&typeutel' + this.$store.state.user
						.userdata
						.utel
				} else {
					this.share.query = '&houseid=' + e.houseid +
						'&id=' +
						e.id
				}
				todayView().then(res => {
					this.isshowinfo = res.data
				})
			} catch (error) {
				//TODO handle the exception
			} finally {
				this.getHouse(e);
			}
			if (e.typename) {
				this.typename = e.typename
				this.typeimg = e.typeimg
				this.typeutel = e.typeutel
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.swiper {
		height: 500rpx;
		width: 100%;
	}

	.swiper-item {
		position: relative;
		display: block;
		height: 500rpx;
		width: 100%;
		line-height: 500rpx;
		text-align: center;
	}

	.swipertext {
		position: absolute;
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 40rpx;
		font-weight: 700;
		bottom: 5px;
		color: white;
		background-color: rgba(93, 93, 93, 0.2);
		text-align: left;
	}

	.title {
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
	}

	.t2 {
		display: flex;
		width: 100%;
		bottom: 0rpx;
		color: white;
		justify-content: space-between;
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 40rpx;
		margin-top: -8px;
	}

	// vr区块
	.vrhouse {
		display: flex;
		padding: 30rpx 20rpx 30rpx 20rpx;
		justify-content: space-around;
		box-sizing: border-box;
	}

	// 标题分享区域
	.flex-between {
		display: flex;
		justify-content: space-between;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.flex-betweenleft {
		font-weight: 800;
		font-size: 20px;
	}

	.flex-betweenright {
		display: flex;
		justify-content: space-around;
	}

	.rt1 {
		font-size: 18rpx;
		color: #949494;
	}

	.betweenrightbox {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.flex-start {
		display: flex;
		justify-content: start;
		padding: 20rpx;
	}

	.tags {
		background-color: #99a9bf !important;
		color: white !important;
		font-size: 24rpx !important;
		margin-right: 20rpx !important;
		border-radius: 5px;
		padding: 5px 5px 5px 5px;
	}

	.inputItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.inputItem text:first-of-type {
		color: #FF7F12;
		font-weight: bold;
		font-size: 32rpx;
	}

	.scjj {
		display: flex;
		justify-content: space-between;
		border-radius: 10px;
		margin: 20rpx 0;
		background-color: #cceeff;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #909090;
		font-weight: 600;
	}

	.i {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.it {
		width: 50%;
		padding: 10rpx 0rpx;
	}

	.tp {
		margin-top: 25rpx !important;
	}

	.it text:first-child {
		color: #acacac;
	}

	.it:nth-child(2n) {
		padding-left: 40rpx;
		box-sizing: border-box;
	}

	.w {
		width: 100%;
		padding: 13rpx 0rpx;
		padding-left: 30rpx;
		font-size: 24rpx;
	}

	.w text:first-child {
		color: #acacac;
	}

	.sd {
		width: 100%;
		height: 225rpx;
	}

	.sd {
		margin-top: 20rpx;
	}

	.side {
		font-weight: 800;
		font-size: 18px;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.side text:first-of-type {
		margin-right: 20rpx;
		font-weight: bold;
	}

	.side text:last-of-type {
		font-size: 26rpx;
		color: #7c7c7c;
	}

	.sideInfo {
		text-align: justify;
		text-spacing: 8rpx;
		font-size: 28rpx;
		line-height: 50rpx;
		color: #333;
	}

	.footer2 {
		position: fixed;
		bottom: 0rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		font-size: 25rpx;
		justify-content: space-between;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: #f7f7f7;
	}

	.footer2box {
		display: flex;
	}

	.footer2 image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.footer2 button {
		margin: 0 !important;
		height: 100%;
		line-height: 100rpx !important;
		font-weight: unset;
		color: white;
		border-radius: 20rpx;
		font-size: 28rpx;
	}

	.footer2 button:active {
		filter: brightness(90%);
	}

	.n {
		display: flex;
		flex-shrink: 0;
		margin: 20rpx 40rpx 20rpx 20rpx;
	}

	.n1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.n1 text:first-of-type {
		font-weight: bold;
	}

	.n1 text:last-of-type {
		color: #30bcbc;
		font-size: 24rpx;
		font-weight: bold;
	}

	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 25px;
		border-radius: 4px;
	}

	.bg-purple {
		background: #CED7E1;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}
</style>