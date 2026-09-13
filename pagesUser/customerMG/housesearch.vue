<template>
	<view class="">

		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="formData">
			<uni-forms-item label="小区名称"  name="xqname">
				<uni-easyinput v-model="formData.xqname" placeholder="请输入小区名称" />
			</uni-forms-item>
			<uni-forms-item label="几栋"  name="building">
				<uni-easyinput v-model="formData.building" placeholder="请输入位于几栋" />
			</uni-forms-item>
			<uni-forms-item label="几单元"  name="unit">
				<uni-easyinput v-model="formData.unit" placeholder="请输入位于几单元" />
			</uni-forms-item>
			<uni-forms-item label="几层"  name="floor">
				<uni-easyinput v-model="formData.floor" placeholder="请输入位于几层" />
			</uni-forms-item>
			<uni-forms-item label="几号"  name="roomNum">
				<uni-easyinput v-model="formData.roomNum" placeholder="请输入位于几号" />
			</uni-forms-item>
			<uni-forms-item label="id/手机号/业主名"  name="idPhoneName">
				<uni-easyinput v-model="formData.idPhoneName" placeholder="id/手机号/业主名" />
			</uni-forms-item>
		</uni-forms>
		<button @click="resetQuery">重置</button>
		<button type="primary" @click="submitForm('baseForm')">搜索房源</button>
		以选中房源
		<view v-for="(item,index) in houseids">
			房源编号：{{item.id}} 房源标题：{{item.title}}
			<view @click="deletechoose(index)">删除</view>
		</view>
		<view>
			<uni-load-more :status="status" :content-text="contentText" />
			<view style="display: flex;" v-for="(item,index) in houselist">
				<view>
					<image style="height: 120px;width: 100px;" class="slot-image"
						:src="'https://static.tianfucd.com/'+item.coverfile" mode="widthFix"></image>
				</view>
				<view>
					<view>{{item.title}}</view>
					<br>
					<view>{{item.xqname}}</view>
					<view>{{item.building}}-{{item.unit}}-{{item.floor}}-{{item.roomNum}}</view>
					<view>{{ item.propertyArea ? item.propertyArea : "--" }}㎡</view>
					<view v-if="item.type==1 || item.type==3">{{ item.sellingPrice ? item.sellingPrice : "--" }}万</view>
					<view v-if="item.type==2 || item.type==3">{{ item.rental ? item.rental : "--" }}元/月</view>
				</view>
				<view @click="houseclick(item)">选择当前房源</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		listFangyuan
	} from '@/api/houst.js'
  import uniForms from "@/pagesUser/components/uni-forms/components/uni-forms/uni-forms.vue";
  import uniFormsItem from "@/pagesUser/components/uni-forms/components/uni-forms-item/uni-forms-item.vue";
  import uniLoadMore from "@/pagesUser/components/uni-load-more/components/uni-load-more/uni-load-more.vue";
  import uniEasyinput from "@/pagesUser/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
	export default {
    components: {
      uniForms,
      uniFormsItem,
      uniLoadMore,
      uniEasyinput
    },
		props: ['type'],
		watch:{
			houseids(e){
				this.$emit('input', e);
			}
		},
		data() {
			return {
				status: 'more',
				contentText: {
					contentdown: '点击搜索房源加载房源列表',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				houseids: [],
				houselist: [],
				formData: {
					pageNum: 1,
					pageSize: 5,
					xqname: null,
					building: null,
					unit: null,
					floor: null,
					roomNum: null,
					idPhoneName: null,
					type: null,
				}
			}
		},
		methods: {
			deletechoose(index) {
				if (index > -1) {
					this.houseids.splice(index, 1);
				}

			},
			houseclick(e) {
				console.log(e);
				this.houseids.push({
					title: e.title,
					id: e.id
				})

			},
			resetQuery() {
				this.houselist = []
				this.formData = {
					pageNum: 1,
					pageSize: 5,
					xqname: null,
					building: null,
					unit: null,
					floor: null,
					roomNum: null,
					idPhoneName: null,
					type: null,

				}
			},
			submitForm(ref) {
				this.status='loading'
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					this.formData.type = this.type
					listFangyuan(this.formData).then(response => {
						this.houselist = response.rows
						if(response.rows.length==0){
							this.status='noMore'
						}
						this.status='more'
					})
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style>

</style>
