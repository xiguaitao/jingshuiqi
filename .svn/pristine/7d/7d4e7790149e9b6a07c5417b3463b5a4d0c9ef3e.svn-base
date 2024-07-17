<template>
	<view class="contenList">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					合同标题
				</view>
				<view class="recharge" @click="getRecharge">
					重新签约
				</view>
			</view>
			<view class="text-number">
				<view class="code">
					合同编号：<text>HT20240102001</text>
				</view>
			</view>
			<view class="text-number">
				<view class="code">
					驳回原因：<text>签名太潦草，不符合规定</text>
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
				
			};
		},
		onLoad() {
			console.log('我生效了');
		},
		methods: {
			getRecharge() {
				this.$emit("getRecharge", this.listData)
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
			border-radius: 16rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-top: 24rpx;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);

			.text-number:first-child {
				margin-top: 0rpx;
			}

			.text-number {
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC;

				.text {
					font-weight: 500;
					color: #14181A;
				}

				.code {
					font-size: 24rpx;
					color: #616466;

					text {
						color: #14181A;
					}
				}

				.recharge {
					font-size: 24rpx;
					color: #FFF;
					margin-left: auto;
					font-size: 24rpx;
					padding: 8rpx 24rpx;
					box-sizing: border-box;
					background-color: #2590FA;
				}
			}
		}
	}
</style>