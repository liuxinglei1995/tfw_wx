<template>
	<view>
		<u-steps :current="this.fromData.length + 1" direction="column">
			<u-steps-item v-if="form">
				<view slot="desc">
					<view>
						<dict-tag :options="dict.type.tfw_look_type" :value="form.type" class="dicts" />
						<dict-tag :options="dict.type.tfw_yuye_type" :value="form.userType" class="dicts" />
						<dict-tag :options="dict.type.tfw_time_type" :value="form.timeType" class="dicts" />
					</view>
					<view>
						带看人:{{ form.user.nickName}}
					</view>
					<view v-if="form.type == 1">
						<view>
							新房小区:
							<span v-for="(item, index) in form.loupanXqs" :key="index">
								{{ item.title }}小区id:{{ item.id }}</span>
						</view>
					</view>
					<view v-else>
						&nbsp;&nbsp;房源小区:
						<view v-for="(item, index) in form.houses" :key="index">
							{{ item.loupanXq.title }}:{{ item.building }}栋{{ item.unit
						                                                            }}单元{{ item.floor }}层{{ item.roomNum }}号
						</view>
					</view>
					<view v-if="form.userType == 1">
						<view>
							预约用户id:{{form.appointmentUser.nickName}}
						</view>
					</view>
					<view v-if="form.userType == 2">
						<view>
							求购用户:
							<span v-for="(item, index) in form.sourceTourists.customer" :key="index">
								{{ item.name }}
							</span>
						</view>
					</view>
					<view>
						&nbsp;陪看人:
						<span v-for="(item, index) in form.andUser" :key="index">
							{{ item.nickName }}
						</span>
					</view>
					<view>
						<span>&nbsp;&nbsp;到访时间:{{form.customerReportingTime}}</span>
						<br />
						<span>&nbsp;&nbsp;备注:{{ form.reason}}</span>
					</view>
					<view v-if="form.attachmentLink">
						<u-album :maxCount="1" :urls="imagepush(form.attachmentLink)"></u-album>
					</view>
				</view>
			</u-steps-item>
			<u-steps-item :title="item.taskNodeName" v-for="item in fromData" :key="item.id">
				<view slot="desc">
					<tr>
						<td style="color:#98A6BE">
							<view class="processing_content_detail" style="float:left;width:70%">
								<span>审批人&nbsp;&nbsp;<span style="color:#219AFF">{{ item.createName
					                                                }}</span>&nbsp;&nbsp;提交了审批</span>
							</view>
							<view class="processing_content_detail" style="float:left;"><span><i
										class="el-icon-time"></i>&nbsp;&nbsp;{{ item.createdDate }}</span>
							</view>
						</td>
					</tr>
					<tr>
						<td>
							<view class="processing_content_detail" style="float:left;width:70%"
								v-for="formlist in item.formHistoryDataDTO" :key="formlist.vlaue">
								<view
									style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px">
								</view>
								<view v-if="formlist.title == '看房图片'">

									<u-album v-if="formlist.value" :maxCount="1"
										:urls="imagepush(formlist.value.split(','))"></u-album>

								</view>
								<view v-else>
									<span style="color:#919FB8">{{ formlist.title }}:</span>
									<span style="color:#919FB8">{{ formlist.value }}</span>
								</view>
							</view>
						</td>
					</tr>
				</view>
			</u-steps-item>

		</u-steps>
	</view>
</template>

<script>
	import UAlbum from "@/pagesUser/uview-ui/components/u-album/u-album.vue";
	import UStepsItem from "@/pagesUser/uview-ui/components/u-steps-item/u-steps-item.vue";
	import USteps from "@/pagesUser/uview-ui/components/u-steps/u-steps.vue";
	import {
		historyFromData,
		getReporting,
	} from '@/api/houst.js'
	export default {
		props: ['propsid'],
		components: {
			UAlbum,
			UStepsItem,
			USteps
		},
		dicts: ['tfw_look_type', 'tfw_yuye_type', 'tfw_time_type'],
		data() {
			return {
				businessKey: null,
				form: {},
				fromData: [],
			}
		},
		methods: {
			imagepush(e) {
				console.log(e)
				let data = []
				e.forEach((item, index) => {
					data.push("https://static.tianfucd.com/" + item);
				});
				console.log(data)
				return data
			},
			getReporting() {
				getReporting(this.businessKey).then(response => {
					this.form = response.data;
					this.form.sourceTourists.customer = JSON.parse(this.form.sourceTourists.customer)
					this.form.attachmentLink = JSON.parse(this.form.attachmentLink)
				});
			},
			historyFromData() {
				historyFromData(this.businessKey).then(response => {
					this.fromData = response.data;

				});
			},
		},
		created() {
			this.businessKey = this.propsid
			this.getReporting()
			this.historyFromData()
		}
	}
</script>

<style>

</style>