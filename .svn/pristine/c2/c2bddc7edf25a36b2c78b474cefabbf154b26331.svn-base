<template>
	<view class="contenList">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					设备编号
				</view>
				<view class="number">
					{{listData.productCode}}
				</view>
				<view class="recharge" :style="{color: listData.status == 0 ? 'red' : listData.status == 2 ? '#2D993B' : '#2590FA'}">
					{{withdrawaiData[listData.status]}}
				</view>
			</view>
			<!-- <view class="text-number">
				<view class="text">
					充值套餐
				</view>
				<view class="number">
					100元套餐
				</view>
			</view> -->
			<view class="text-number">
				<view class="text">
					套餐金额
				</view>
				<view class="number">
					￥{{listData.amount}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					充值时间
				</view>
				<view class="number">
					{{listData.createTime}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					支付方式
				</view>
				<view class="number">
					{{typeData[listData.type]}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'deviceList',
		props: {
			listData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				withdrawaiData: {
					"0": "充值失败",
					"1": "充值成功",
					"2": "退款"
				},
				typeData: {
					"1": "支付宝",
					"2": "微信",
					"3": "余额"
				}
			};
		},
		methods: {
			usedClick() {
				if (this.listData.userStatus == 0) {
					console.log("使用");
					this.$emit("getuse", this.listData)
				}
			},
			getRecharge() {
				console.log("充值");
				this.$emit("getRecharge", this.listData)
			},
			//失焦
			getBlur() {
				this.$emit("getBlur", this.listData)
			},
		},
	};
</script>
<style lang="scss">
	.contenList {
		padding: 0 30rpx;
		box-sizing: border-box;
		// margin-top: 48rpx;

		.conten {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 16rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-top: 24rpx;

			.text-number:first-child {
				margin-top: 0rpx;
			}

			.text-number {
				font-size: 28rpx;
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.text {
					color: #616366;
				}

				.number {
					color: #14171A;
					margin-left: 24rpx;
				}

				.recharge {
					font-size: 24rpx;
					color: #2590FA;
					margin-left: auto;
				}
			}
		}
	}
</style>