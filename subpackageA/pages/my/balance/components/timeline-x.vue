<template>
	<view>
		<view class='timeline-x' v-for="(item,index) in list" :key="index">
			<view class="month">
				<view>{{day.split("-")[1]}}月</view>
				<view>{{day.split("-")[0]}}</view>
			</view>
			<view class="timeline">
				<view class="content" v-for="(item2,index2) in item.detailList" :key="index2">
					<view class="line">
						<view></view>
					</view>
					<view class="content-item">
						<view class="content-item-top">
							<view class="content-item-top-date">{{item2.days}}日</view>
							<view class="content-item-top-label">
								<label>收入￥{{item.incomeMoney}}</label>
								<label>支出￥{{item.outcomeMoney}}</label>
							</view>
						</view>
						<view class="content-item-bottom">
							<view class="content-item-bottom-left">
								<view>{{withdrawaiData[item2.type]}}</view>
								<view>{{item2.yearMonth + ' ' + item2.times}}</view>
							</view>
							<view class="content-item-bottom-right">{{types(item2.type) + item2.money}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			day: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				withdrawaiData: {
					"1": "套餐充值消费",
					"2": "商品购买消费",
					"3": "收益提现",
					"4": "套餐充值收益(分润)",
					"5": "商品购买收益(分润)",
					"6": "商品首充",
					"7": "积分兑换余额",
				}
			};
		},
		methods: {
			types(e) {
				const types = [1, 2, 3, 4];
				return types.includes(e) ? '-' : '+';
			}
		}
	}
</script>
<style lang='scss' scoped>
	.timeline-x {
		display: flex;

		.month {
			margin-right: 32rpx;

			view:nth-child(1) {
				font-family: PingFang SC, PingFang SC;
				font-weight: 600;
				font-size: 44rpx;
				color: #14181A;
				line-height: 52rpx;
			}

			view:nth-child(2) {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #616466;
				line-height: 33rpx;
			}
		}

		.timeline {
			flex: 1;

			.content {
				display: flex;

				/* margin-bottom: 64rpx; */


				.line {
					width: 26rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 32rpx;

					&::after {
						flex: 1;
						display: block;
						content: '';
						width: 0rpx;
						border-right: 2rpx dashed #1DABF2;
					}

					view {
						width: 20rpx;
						height: 20rpx;
						background: #1DABF2;
						border: 6rpx solid #C8E9FA;
						border-radius: 50%;
					}
				}

				&:not(:first-child) {
					.line {
						view {
							border: 0;
						}
					}
				}

				.content-item {
					flex: 1;

					&::after {
						display: block;
						content: "";
						height: 64rpx;
					}

					.content-item-top {
						display: flex;
						justify-content: space-between;
						margin-bottom: 30rpx;

						.content-item-top-date {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 28rpx;
							color: #2E3133;
							line-height: 33rpx;
						}

						.content-item-top-label {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 20rpx;
							color: #AFB1B2;
							line-height: 23rpx;

							label {
								margin-left: 16rpx;
							}
						}
					}

					.content-item-bottom {
						padding: 32rpx;
						background: #fff;
						box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
						border-radius: 8rpx;
						display: flex;
						justify-content: space-between;

						.content-item-bottom-left {

							view:nth-child(1) {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #2E3133;
								line-height: 33rpx;
								margin-bottom: 16rpx;
							}

							view:nth-child(2) {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #AFB1B2;
								line-height: 33rpx;
							}
						}

						.content-item-bottom-right {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 28rpx;
							color: #1DABF2;
							line-height: 33rpx;
						}
					}
				}
			}
		}



	}
</style>