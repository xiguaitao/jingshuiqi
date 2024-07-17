<template>
	<view class="box">
		<tito title="合同管理" :slotLeft="true"
			:style="{height: menuTop.top + menuTop.height + 'px', paddingBottom:menuTop.height + 'rpx'}">
			<template v-slot:left>
				<view class="icon" @click="leftIcon">
					<u-icon name="arrow-left" color="#000000" size="24"></u-icon>
				</view>
			</template>
			<template v-slot:center>
				合同管理
			</template>
			<template #right>
				<!-- <view class="iconRight" @click="getmangement">
					<u-icon name="bell" color="#000000" size="24"></u-icon>
					<u-badge :isDot="true" type="info" :offset="['5', '2']" :absolute="true" bgColor="red" />
				</view> -->
			</template>
		</tito>
		<view class="subsection">
			<subsection :list="list" :current="listData.status" @change="sectionChange"></subsection>
		</view>

		<view class="subsection-device">
			<view class="device">
				<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
					@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
					:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
					<view class='content'> 
						<u-transition :show="true" v-for="item in deviceList" :key="item.id" mode="slide-left">
							<DeviceList :listData="item" @getRecharge="getRecharge">
							</DeviceList>
						</u-transition>
					</view>
					<u-loadmore v-if="deviceList.length > 0" :status="status" />
					<view v-if="deviceList.length == 0" class="nodata" v-show="deviceList.length <= 0">
						<view class="contents">
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import DeviceList from './components/deviceList.vue';
	import {
		contractList
	} from "@/api/api.js"
	export default {
		components: {
			DeviceList
		},
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				list: ['全部', '申请签约', '已签约', '拒绝签约', ],
				deviceList: [],
				listData: {
					status: 0,
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			leftIcon() {
				uni.navigateBack()
			},
			sectionChange(index) {
				let inx = index 
				this.listData.status = inx;
				this.getList()
			},
			refresherrefresh() {
				this.refresherTriggered = true;
				this.status = "loading"
				this.listData.page = 1;
				this.getList()
			},
			scrolltolower() {
				if (this.status == "nomore") return;
				if (!this.loading) {
					this.listData.page++;
					this.status = "loading"
					this.getList(false);
				}
			},
			getList(state = true) {
				this.listData.status = this.listData.status == 0 ? '' : this.listData.status
				contractList(this.listData).then(res => {
					setTimeout(() => {
						this.loading = false;
					}, 200);
					this.refresherTriggered = false;
					if (res.code == 0) {
						if (this.listData.limit > res.data.length) {
							this.status = "nomore"
						} else {
							this.status = "loadmore"
						}
						if (state) {
							this.deviceList = res.data;
						} else {
							this.deviceList.push(...res.data)
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},

			//合同详情
			getRecharge({
				id,
				status,
				agencyProvinceId,
				agencyCityId,
				agencyAreaId,
				provinceName,
				cityName,
				areaName,
				agencyType,
			}) {
				if (status !== 2) {
					uni.$u.route({
						url: '/subpackageA/pages/my/contractManagement/contractData',
						params: {
							contractRecordId: id,
							agencyProvinceId,
							agencyCityId,
							agencyAreaId,
							addss: provinceName != null && cityName != null && areaName != null ? provinceName +
								"-" + cityName + "-" + areaName : '',
							agencyType,
							status
						}
					})
				} else {
					uni.$u.route({
						url: '/subpackageA/pages/my/contractManagement/contractDetails',
						params: {
							contractRecordId: id,
							status,
						}
					})
				}
			},
			//审核驳回
			getmangement() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/contractManagement/reviewRejection"
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #F0F3F5;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
	}

	.iconRight {
		margin-right: 200rpx;
		position: relative;
	}

	.subsection {
		margin: 0 30rpx;
	}

	.subsection-device {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.subsection {
			margin: 0 32rpx;

			.u-subsection {
				padding: 8rpx;
				box-sizing: border-box;
			}
		}

		.device {
			flex: 1;
			margin-top: 32rpx;
			width: 100%;
			height: 0px;
			overflow: hidden;

			.content {
				flex: 1;
				overflow: auto;

			}

			.contents {
				.text {}
			}

			.nodata {
				display: grid;
				place-content: center;
				height: 100%;

				.contents {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					image {
						width: 150px;
						height: 114px;
					}

					.text {
						font-size: 20rpx;
					}
				}

			}
		}
	}
</style>