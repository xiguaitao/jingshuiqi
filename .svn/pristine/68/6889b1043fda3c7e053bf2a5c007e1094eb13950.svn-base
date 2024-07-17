<template>
	<view class="contenList">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					{{ integralTypes[listData.integralType] }}
				</view>
				<view class="recharge" :class="listData.type == 1 ? 'number' : 'duihuan'">
					{{listData.type == 1 ? '+' : '-'}}{{listData.integral}}
				</view>
			</view>
			<view class="text-number">
				<view class="tianjia">
					{{integralTypes[listData.integralType] }}
				</view>
				<view class="tianjia">
					{{listData.createTime}}
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
				integralTypes: {
					1: '签到',
					2: '指定日期签到',
					3: '连续签到',
					4: '积分兑换余额',
					5: '商城购买',
					6: '套餐充值',
					7: '邀请好友注册',
					8: '好友首单奖励'
				},
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

		.conten {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 16rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.text-number:first-child {
				margin-top: 0rpx;
			}

			.text-number {
				font-size: 28rpx;
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.text {
					color: #2E3133;
					font-weight: 500;
					font-size: 28rpx;
				}

				.tianjia {
					font-size: 24rpx;
					color: #AFB1B2;
					margin-right: 24rpx;
				}


				.number {
					font-weight: 600;
					font-size: 28rpx;
					color: #FA6B05;
				}

				.duihuan {
					color: #2590FA;
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