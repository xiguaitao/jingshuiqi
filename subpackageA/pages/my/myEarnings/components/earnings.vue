<template>
	<view class="conertList-time">
		<view class="conertList">
			<view class="text-money">
				<view class="text">
					{{ServiceType[listData.type]}}
				</view>
				<view class="money">
					+{{listData.money}}
				</view>
			</view>
			<view class="time">
				{{listData.createTime}}
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			listData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				ServiceType: {
					4: "套餐充值收益(分润)",
					5: "商品购买收益(分润)",
					6: "商品首充",
					7: "积分兑换余额",
					20: "伯乐收益",
				},
			};
		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style lang='scss' scoped>
	.conertList-time {
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
		border-radius: 8rpx;
		margin: 0 32rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.conertList:first-child {
			margin-top: 0rpx;
		}

		.conertList:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		.conertList {
			margin-top: 32rpx;
			padding-bottom: 32rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #E1E4E6;

			.text-money {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.text {
					font-weight: 600;
					font-size: 28rpx;
					color: #2E3133;
				}

				.money {
					font-size: 28rpx;
					color: #FA573E;
				}
			}

			.time {
				font-size: 24rpx;
				color: #AFB1B2;
				margin-top: 16rpx;
			}
		}
	}
</style>