<template>
	<view class="box">
		<tito title="水质监控" :leftIconShow="true"></tito>
		<view class="tr-th">
			<view class="tito">
				<view class="text">
					全部
					<u-icon name="arrow-down" color="#14181A"></u-icon>
				</view>
				<view class="text">
					水质(TDS)
				</view>
				<view class="text">
					状态
				</view>
			</view>
			<!-- <view class="td-conter-text" v-for="(item,index) in 10" :key="index">
				<view class="text">
					深圳
				</view>
				<view class="text">
					50
				</view>
				<view class="text sakes" :style="{ color: index % 2 === 0 ? 'red' : '' }">
					<uni-tooltip v-if="index % 2 === 0" content="tooltip显示的内容" placement="bottom">
						<template #default>
							<text> 超标</text>
							<u-icon name="question-circle" color="red"></u-icon>
						</template>
						<template #content>
							<view class="content-tito">
								<view class="tito-text">
									国家直饮水标准
								</view>
								<view class="text-tooltip">
									中国国家饮水标准为TDS应不大于1000mg/L、总硬度应不大于450mg/L、浊度应不大于1NTU、PH值在6.5至8.5之间。
								</view>
							</view>
						</template>
					</uni-tooltip>
					<text v-else> 合格</text>
				</view>
			</view> -->
			<dataText></dataText>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F3F5F6;
	}

	.tr-th {
		// background: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 32rpx;
		font-family: PingFang SC, PingFang SC;

		.tito {
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom: 2rpx solid #F0F1F2;
			height: 80rpx;

			.text {
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 32rpx;
				color: #14181A;
				flex: 1;
				justify-content: space-evenly;
			}
		}

		.td-conter-text {
			font-size: 28rpx;
			color: #2E3133;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 72rpx;

			.text {
				flex: 1;
				text-align: center;


				.content-tito {
					min-width: 230rpx;
					background: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.2);
					text-align: center;
					word-wrap: break-word;
					word-break: break-all;

					.tito-text {
						font-weight: 500;
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.text-tooltip {
						font-size: 24rpx;
						color: #FFFFFF;
						margin-top: 24rpx;
					}
				}
			}

			.sakes {
				color: #1DABF2;

				// display: flex;
				// align-items: center;
				::v-deep .uni-tooltip {
					display: flex;
					justify-content: center;
				}
			}
		}
	}
</style>