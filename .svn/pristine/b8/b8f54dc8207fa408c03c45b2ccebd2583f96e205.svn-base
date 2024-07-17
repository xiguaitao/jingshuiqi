<template>
	<view class="box" v-if='productData.length == 0'>
		<tito title="设备" :leftIconShow="false"></tito>
		<view class="zwsb">
			<view class="image">
				<image src="../../static/image/zanwusheben.png" mode=""></image>
				<view class="text">
					暂无设备
				</view>
			</view>
			<view class="bnt" @click="getincreadseDevice">
				添加设备
			</view>
		</view>

	</view>
	<view class="boxs" v-else>
		<tito title="设备" :slotLeft="true">
			<template v-slot:left>
				<view class="image-text" @click="getincreadseDevice">
					<view class="image">
						<image src="../../static/image/tianjias.png"></image>
					</view>
					<view class="text">
						添加设备
					</view>
				</view>
			</template>
			<template v-slot:center>
				<view>
					设备
				</view>
			</template>
		</tito>
		<view class="deviceList">
			<view class="device" v-for="(item,index) in productData" :key="item.id" @click="getDeviceDeta(item.id)">
				<view class="image">
					<image :src="item.modelLogo" mode=""></image>
				</view>
				<view class="text">
					{{item.remark || item.code}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		productList
	} from "@/api/api.js"
	export default {
		data() {
			return {
				productData: [],
				listData: {
					page: 1,
					limit: 10,
				},
			};
		},
		onShow() {
			this.productData = []
			this.listData.page = 1
			this.productList()
		},
		onLoad() {
			// this.productList()
		},
		onReachBottom() {
			this.listData.page++
			this.productList()
		},
		methods: {
			async productList() {
				let res = await productList(this.listData)
				if (res.data.length > 0) {
					this.productData.push(...res.data)
				} else {
					uni.showToast({
						title: "暂无更多",
						icon: "none"
					})
				}
			},
			getincreadseDevice() {
				uni.$u.route({
					url: "/subpackageA/pages/device/increaseDevice/increaseDevice",
					// params: {
					// 	name: 'lisa'
					// }
				})
			},
			getDeviceDeta(id) {
				uni.$u.route({
					url: "/subpackageA/pages/device/devicedetails/devicedetails",
					params: {
						id
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;

		.zwsb {
			margin-top: 192rpx;

			.image {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				image {
					width: 360rpx;
					height: 360rpx;
				}

				.text {
					font-size: 32rpx;
					color: #AFB1B2;
				}
			}

			.bnt {
				height: 104rpx;
				background: #1DABF2;
				border-radius: 8rpx;
				margin: 32rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 104rpx;
				margin-top: 114rpx;
			}
		}

	}

	.boxs {
		min-height: 100vh;
		background-color: #F0F3F5;

		.image-text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image {
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.text {
				font-size: 20rpx;
				color: #2E3033;
			}
		}

		.deviceList {
			margin: 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			grid-gap: 22rpx;

			.device {
				width: 332rpx;
				height: 420rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
				border-radius: 8rpx;
				padding: 24rpx;
				box-sizing: border-box;

				.image {
					width: 100%;

					image {
						width: 100%;
						height: 332rpx;
						border-radius: 8rpx 8rpx 0rpx 0rpx;
					}
				}

				.text {
					font-weight: 700;
					font-size: 28rpx;
					color: #14181A;
					// margin-top: 24rpx;
				}
			}
		}
	}
</style>