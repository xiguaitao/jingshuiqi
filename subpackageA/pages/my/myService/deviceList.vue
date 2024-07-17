<template>
	<view class="contenList" @click="getRecharge">
		<view class="conten">
			<view class="text-number">
				<view class="text">
					设备编号
				</view>
				<view class="number">
					{{listData.productCode}}
				</view>
				<view class="recharge">
					{{withdeawalData[listData.status]}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					售后类型
				</view>
				<view class="number">
					{{ServiceType[listData.type]}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					售后时间
				</view>
				<view class="number">
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
				ServiceType: {
					1: "水机安装",
					2: "滤芯更换",
					3: "故障报修",
					4: "其他",
				},
				withdeawalData: {
					1: "未开始",
					2: "派发",
					3: "拒绝",
					4: "接单",
					5: "服务",
					6: "完成",
					7: "评价",
				},
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