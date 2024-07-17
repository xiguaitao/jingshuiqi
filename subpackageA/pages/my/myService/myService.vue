<template>
	<view class="box">
		<tito title="我的售后" :leftIconShow="true"></tito>
		<!-- <view class="kaPian">
			<image src="@/static/image/kapian.png" mode=""></image>
			<view class="kaPian-bnt"></view>
			<view class="money-number-balance">
				<view class="number-balance">
					<view class="number">
						12.00
					</view>
					<view class="balance">
						售后总数
					</view>
				</view>
				<view class="number-balance">
					<view class="number">
						5845
					</view>
					<view class="balance">
						已完成
					</view>
				</view>
				<view class="number-balance">
					<view class="number">
						20
					</view>
					<view class="balance">
						售后中
					</view>
				</view>
			</view>
		</view> -->
		<view class="text-icon-income-expenditure">
			<view class="text-icon">
				<text class="text">当前明细：</text>
				<view class="number-icon" @click="pickerShow = true">
					<view class="number">
						{{ yearMonth(value1) }}
					</view>
					<view class="icon">
						<u-icon name="arrow-down" color=" #1DABF2"></u-icon>
					</view>
				</view>
			</view>
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
							<!-- <image src="../../../../static/image/zanwusheibei.png"></image> -->
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="icon-shoho" @click="salesService">
			<image src="../../static/icon-shoho.png" mode=""></image>
		</view>
		<view class="datetime-picker">
			<u-datetime-picker ref="datetimePicker" :show="pickerShow" v-model="value1" mode="year-month"
				@cancel="pickerShow=false" @confirm="confirm"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import DeviceList from './deviceList.vue';
	import {
		aftersalesList
	} from "@/api/api.js"
	export default {
		components: {
			DeviceList
		},
		data() {
			return {
				pickerShow: false,
				value1: Number(new Date()),
				deviceList: [],
				listData: {
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
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
				let data = {
					yearMonth: this.yearMonth(this.value1),
					type: this.current == 0 ? '' : this.current,
					...this.listData
				}
				aftersalesList(data).then(res => {
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
			confirm(e) {
				this.pickerShow = false
				this.value1 = e.value
				this.getList()
			},
			//格式化时间
			yearMonth(e) {
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e, 'yyyy-mm');
				return timeValue
			},
			//申请售后
			salesService() {
				uni.navigateTo({
					url: "/subpackageA/pages/device/salesService/salesService"
				})
			},
			//售后详情
			getRecharge(e) {
				uni.navigateTo({
					url: "/subpackageA/pages/my/afterSalesDetails/afterSalesDetails?id=" + e.id
				})
			},
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

	.kaPian {
		position: relative;
		height: 160rpx;
		margin: 0 32rpx;
		margin-bottom: 48rpx;

		.kaPian-bnt {
			position: absolute;
			bottom: -15%;
			left: 3%;
			width: 94%;
			height: 60rpx;
			margin: 0 32rpx;
			background: rgba(89, 134, 178, 0.5);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			filter: blur(20px);
		}

		image {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0%;
			left: 0%;
		}

		.money-number-balance {
			position: relative;
			height: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.number-balance {
				text-align: center;

				.number {
					font-weight: 600;
					font-size: 44rpx;
					color: #FFFFFF;
				}

				.balance {
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.7);
				}
			}
		}
	}

	.text-icon-income-expenditure {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 32rpx;

		.text-icon {
			display: flex;
			align-items: center;

			.text {
				font-size: 24rpx;
				color: #616466;
			}

			.number-icon {
				display: flex;
				align-items: center;

				.number {
					font-size: 28rpx;
					color: #1DABF2;
				}
			}
		}
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
			// margin-top: 32rpx;
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

	.icon-shoho {
		position: fixed;
		right: 32rpx;
		bottom: 30%;

		image {
			width: 96rpx;
			height: 96rpx;
			border-radius: 50%;
		}
	}
</style>