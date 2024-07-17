<template>
	<view class="contenList">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					提现金额
				</view>
				<view class="number">
					￥{{listData.money}}
				</view>
				<view class="recharge" :style="{color: listData.status == -1 ? 'red' : listData.status == 0 ? '#2D993B' : '#2590FA'}">
					{{withdrawaiData[listData.status]}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					提现到账
				</view>
				<view class="number">
					{{listData.bank + "(尾号" + listData.bankAccount.slice(-4) + ")"}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					申请时间
				</view>
				<view class="number">
					{{listData.createTime}}
				</view>
			</view>
			<view class="text-number" v-if="listData.remitTime">
				<view class="text">
					到账时间
				</view>
				<view class="number">
					{{listData.remitTime}}
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
					"0": "申请中",
					"1": "审核通过",
					"-1": "审核拒绝",
					"2": "已打款"
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