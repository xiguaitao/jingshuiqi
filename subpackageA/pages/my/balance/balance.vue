<template>
	<view class="box">
		<tito title="余额" :leftIconShow="true"></tito>
		<view class="myEarnings-content">
			<view class="card">
				<image src="../../static/yue.png" />
				<view class="card-content">
					<view class="number">￥{{accountList.nonPresentIncome}}</view>
					<view class="ts">可提现金额 (元)</view>
					<view class="txian" @click="jump">
						<view>提现</view>
						<u-icon name="arrow-right" size="16px"></u-icon>
					</view>
				</view>
			</view>
			<view class="time">
				<view class="time-left" @click="pickerShow = true">
					<view>当前明细：</view>
					<view style="display: flex; align-items: center;">
						{{ yearMonth(value1) }}
						<u-icon name="arrow-down" size="16px" color="#1DABF2" />
					</view>
				</view>
				<view class="time-right" @click="jump2">
					<view>统计</view>
					<u-icon name="arrow-right" size="16px" color="#1DABF2"></u-icon>
				</view>
			</view>
			<view class="tiemlines">
				<timeline-x :list="accountList.list" :day="accountList.yearMonth"></timeline-x>
			</view>
		</view>
		<view class="datetime-picker">
			<u-datetime-picker ref="datetimePicker" :show="pickerShow" v-model="value1" mode="year-month"
				@cancel="pickerShow=false" @confirm="confirm"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import timelineX from './components/timeline-x.vue'
	import {
		accountList
	}
	from "@/api/api.js"
	export default {
		components: {
			timelineX
		},
		data() {
			return {
				pickerShow: false,
				value1: Number(new Date()),
				accountList: {},
				page: 1,
				limit: 10,
			};
		},
		onLoad(ope) {

		},
		onShow() {
			this.getaccountList()
		},
		methods: {
			confirm(e) {
				this.pickerShow = false
				this.value1 = e.value
				this.getaccountList()
			},
			//格式化时间
			yearMonth(e) {
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e, 'yyyy-mm');
				return timeValue
			},
			//余额明细列表
			async getaccountList() {
				let res = await accountList({
					queryMonth: this.yearMonth(this.value1)
				})
				if (res.data) {
					this.accountList = res.data
				}
			},
			//提现
			jump() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/withdrawal/withdrawal?nonPresentIncome=" + this.accountList
						.nonPresentIncome
				})
			},
			//收益统计
			jump2() {
				uni.$u.route({
					url: "/subpackageA/pages/my/statistics/statistics",
					params: {
						tito: '收入'
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;
	}

	.myEarnings-content {
		padding: 0 32rpx;
		box-sizing: border-box;

		.card {
			position: relative;
			height: 174rpx;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);

			image {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			.card-content {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				padding: 32rpx;
				box-sizing: border-box;
				color: #fff;

				.number {
					margin-bottom: 16rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					color: #FFFFFF;
					line-height: 38rpx;
				}

				.ts {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.7);
					line-height: 33rpx;
				}

				.txian {
					width: 202rpx;
					height: 56rpx;
					position: absolute;
					right: 0;
					top: 0;
					padding: 14rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #2E3133;
					line-height: 33rpx;
				}

			}
		}

		.time {
			margin: 64rpx 0;
			display: flex;
			justify-content: space-between;

			.time-left {
				display: flex;

				view:nth-child(1) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #616466;
					line-height: 28rpx;
				}

				view:nth-child(2) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #1DABF2;
					line-height: 33rpx;
				}
			}

			.time-right {
				display: flex;
				align-items: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1DABF2;
				line-height: 33rpx;
			}
		}

		.tiemlines {
			padding-bottom: 64rpx;
		}
	}
</style>