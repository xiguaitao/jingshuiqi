<template>
	<view class="box">
		<tito title="发票管理" :leftIconShow="true"></tito>
		<view class="subsection">
			<subsection :list="list" :current="current" @change="sectionChange"></subsection>
		</view>
		<view class="invoice-text">
			<!-- <view class="invoice-text-xq" v-for="(item,index) in 5" :key="index">
				<image src="../../static/xqanniu.png" mode=""></image>
				<view class="text-xq" @click="getdetails">
					发票详情
					<u-icon name="arrow-right" color="#FFF"></u-icon>
				</view>
				<view class="text">
					深圳宝烽软件有限公司
				</view>
				<view class="text-number-piao">
					<view class="text-number">
						<text class="text">发票金额：</text>
						<text class="number">￥2000</text>
					</view>
					<view class="piao" :style="{color: current == 0 ? '#1DABF2' : '#04CC89'}">
						 {{current == 0 ? '已开票':'申请中'}}
					</view>
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
				list: ['已开发票', '申请中发票'],
				current: 0,
			};
		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			//发票详情
			getdetails(){
				uni.navigateTo({
					url:"/subpackageA/pages/my/invoiceDetails/invoiceDetails"
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

	.subsection {
		margin: 0 32rpx;
	}

	.invoice-text {
		margin: 0 32rpx;

		.invoice-text-xq {
			height: 168rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx;
			position: relative;
			padding: 32rpx;
			box-sizing: border-box;
			margin: 32rpx 0;

			image {
				position: absolute;
				right: 0;
				top: 0;
				width: 236rpx;
				height: 70rpx;
			}

			.text-xq {
				display: flex;
				align-items: center;
				position: absolute;
				right: 32rpx;
				top: 14rpx;
				font-size: 28rpx;
				color: #FFFFFF;
			}

			.text {
				font-weight: 600;
				font-size: 28rpx;
				color: #14181A;
			}

			.text-number-piao {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 28rpx;

				.text-number {
					.text {
						font-size: 24rpx;
						color: #616466;
					}

					.number {
						font-weight: 600;
						font-size: 28rpx;
						color: #2E3133;
					}
				}

				.piao {
					font-size: 28rpx;
					color: #1DABF2;
				}
			}
		}
	}
</style>