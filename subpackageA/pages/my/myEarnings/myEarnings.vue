<template>
	<view class="box">
		<tito title="我的收益" :leftIconShow="true"></tito>
		<view class="myearning">
			<image src="../../static/myshouyi.png" mode=""></image>
			<view class="kaPian-bnt"></view>
			<view class="tongji" @click="getTonJi">
				统计
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="yuan-number">
				<view class="yuan">
					累计总收益(元)
				</view>
				<view class="number">
					{{incomeData.totalIncome || 0.00}}
				</view>
			</view>
			<view class="text-money-2">
				<view class="text-money">
					<view class="text">
						本月预估 (元)
					</view>
					<view class="money">
						{{incomeData.currentMonthIncome || 0.00}}
					</view>
				</view>
				<view class="text-money">
					<view class="text">
						上月结算 (元)
					</view>
					<view class="money">
						{{incomeData.lastMonthIncome || 0.00}}
					</view>
				</view>
			</view>
		</view>

		<view class="text-number">
			<view class="text-icon">
				<text class="text">收益：</text>
				<text class="number">￥{{deviceList2.income || 0.00}}</text>
			</view>
			<view class="text-icon">
				<text class="text">当前明细：</text>
				<view class="number-icon" @click="pickerShow = true">
					<view class="number">
						{{ yearMonth(value1) }}
					</view>
					<view class="icon">
						<u-icon name="arrow-down" color="#1DABF2"></u-icon>
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
							<earnings :listData="item" />
						</u-transition>
					</view>
					<u-loadmore v-if="deviceList > 0" :status="status" />
					<view v-if="deviceList == 0" class="nodata" v-show="deviceList <= 0">
						<view class="contents">
							<!-- <image src="../../../../static/image/zanwusheibei.png"></image> -->
							<view class="text"> 暂无数据</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="datetime-picker">
			<u-datetime-picker ref="datetimePicker" :show="pickerShow" v-model="value1" mode="year-month"
				@cancel="pickerShow=false" @confirm="confirm"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import {
		distributionIncomeList,
		distributionIncomeData
	} from "@/api/api.js";
	import earnings from './components/earnings.vue'; 
	export default {
		components: {
			earnings
		},
		data() {
			return {
				listID: "0",
				pickerShow: false,
				value1: Number(new Date()),
				deviceList: [],
				deviceList2: [],
				incomeData: {},
				listData: {
					page: 1,
					limit: 10,
				},
				status: "loading",
				refresherTriggered: false,
			};
		},
		onShow() {
			this.distributionIncomeData()
			this.getList()
		},
		methods: {
			//我的团队列表统计
			async distributionIncomeData() {
				let res = await distributionIncomeData()
				if (res.code == 0) {
					this.incomeData = res.data
				} 
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
				let data = {
					queryMonth: this.yearMonth(this.value1),
					...this.listData
				}
				distributionIncomeList(data).then(res => {
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
							this.deviceList = res.data.recordList
							this.deviceList2 = res.data
						} else {
							this.deviceList.push(...res.data.recordList)
							this.deviceList2 = res.data
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			//滑动标签选择
			getscroll(item, index) {
				this.listID = item.id
				this.getList()
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
			getTonJi() {
				uni.$u.route({
					url: "/subpackageA/pages/my/statistics/statistics",
					params: {
						goodsId: this.listID
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #E9EEF2;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scrollView {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		margin-top: 32rpx;
		margin-bottom: 48rpx;

		.scroll-list {
			display: flex;
			align-items: center;

			.scroll-view-item {
				margin-right: 24rpx;
				text-align: center;
				height: 72rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
			}

			.scroll-view-item_H {
				line-height: 72rpx;
				background: #E1F2FA;
				border: 2rpx solid #1DABF2;
				color: #1DABF2;
			}

			.scroll-view-item_N {
				line-height: 72rpx;
				background: #FFFFFF;
				border: 2rpx solid #FFF;
				color: #2E3133;
			}
		}
	}

	.myearning {
		height: 336rpx;
		margin: 0 32rpx;
		position: relative;

		image {
			position: absolute;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
		}

		.kaPian-bnt {
			position: absolute;
			bottom: -11%;
			left: 0;
			width: 90%;
			height: 60rpx;
			margin: 0 32rpx;
			background: rgba(89, 134, 178, 0.5);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			filter: blur(20px);
		}

		.tongji {
			position: absolute;
			display: flex;
			align-items: center;
			right: 66rpx;
			top: 14rpx;
			font-size: 28rpx;
			color: #2E3133;
		}

		.yuan-number {
			position: absolute;
			top: 32rpx;
			left: 32rpx;

			.yuan {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.7);
			}

			.number {
				font-size: 60rpx;
				color: #FFFFFF;
				margin-top: 16rpx;
			}
		}

		.text-money-2 {
			display: flex;
			justify-content: space-between;
			position: absolute;
			bottom: 32rpx;
			left: 32rpx;
			width: 100%;

			.text-money {
				flex: 1;

				.text {
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.7);
				}

				.money {
					font-size: 36rpx;
					color: #FFFFFF;
					margin-top: 16rpx;
				}
			}
		}
	}

	.text-number {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 68rpx 32rpx 32rpx;

		.text-icon {
			display: flex;
			align-items: center;

			.text {
				font-size: 24rpx;
				color: #616466;
			}

			.number {
				font-size: 28rpx;
				color: #2E3133;
				font-weight: 600;
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
		margin-bottom: 30rpx;

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
</style>