<template>
	<view class="contenList" @click="getRecharge">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					{{listData.contractName}}
				</view>
				<view class="recharge"
					:style="{color: listData.status == 0 ? '#61B5DD' : listData.status == 1 ? '#2FD39D' : 'red' }">
					{{withdeawalData[listData.status - 1]}}
				</view>
			</view>
			<view class="text-number">
				<view class="code">
					合同编号：{{listData.contractCode}}
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
				withdeawalData: [
					"申请签约",
					"已签约",
					"拒绝签约",
				],
			};
		},
		methods: {
			getRecharge() {
				console.log("详情");
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
					margin-top: 24rpx;
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