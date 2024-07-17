<template>
	<view class="box">
		<tito title="取水" :leftIconShow="false"></tito>
		<view class="image-sacn">
			<image src="../../static/image/sacnQs.png" mode=""></image>
		</view>
		<view class="sacn-text">
			<view class="text" @click="getTakeTheBag">
				扫码取袋
			</view>
			<view class="text qs" @click="getQs">
				扫码取水
			</view>
		</view>
		<view class="conter-text">
			<view class="tito">
				取水介绍
			</view>
			<view class="icon-text-number">
				<rich-text :nodes="sellEquipData.equipGetWaterGuide"></rich-text>
				<!-- <view class="icon-text" v-for="(item, index) in 6" :key="index">
					<view class="number"
						:style="{ '--line-before': index == 0 ? '#fff' : '#1DABF2', '--line-after': index == 5 ? '#fff' : '#1DABF2' }">
						<view>
							<view>

								{{ index + 1 }}
							</view>
						</view>
					</view>
					<view class="text">
						点击扫码取水按钮，进入取水详情页
						点击扫码取水按钮，进入取水详情页
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sellEquipInfo
	} from "@/api/api.js";
	export default {
		data() {
			return {
				sellEquipData: {},
				scanCode: "",
			};
		},
		onLoad() {
			this.sellEquipInfo()
		},
		methods: {
			sellEquipInfo() {
				sellEquipInfo().then(res => {
					console.log(res)
					this.sellEquipData = res.data
				})
			},
			getQs() {
				uni.scanCode({
					success(res){
						const match = res.result.match(/code=([^&]+)/)
						if (match) {
							uni.$u.route({
								url: "/subpackageA/pages/waterIntaking/packageWaterIntake/packageWaterIntake",
								params: {
									scanCode: match[1]
								}
							})
						} else {
							uni.$u.toast("无效二维码")
						}
					}
				})
			},
			getTakeTheBag() {
				this.$u.route({
					url: "/subpackageA/pages/waterIntaking/takeTheBag/takeTheBag",
					// params: {
					// 	title
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;
		padding-bottom: 30rpx;
	}

	.image-sacn {
		margin: 48rpx 0;
		text-align: center;

		image {
			width: 400rpx;
			height: 400rpx;
		}
	}

	.sacn-text {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 64rpx;

		.text {
			width: 296rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #04D9D9 0%, #1DABF2 100%);
			border-radius: 8rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFF;
		}

		.qs {
			background: linear-gradient(135deg, #1DABF2 0%, #4981F2 100%);
		}
	}


	.conter-text {
		margin: 32rpx;
		// height: 428rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
		border-radius: 8rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.tito {
			position: relative;
			font-weight: 700;
			font-size: 32rpx;
			color: #14181A;
			margin-left: 40rpx;
		}

		.tito::after {
			content: "";
			width: 24rpx;
			height: 24rpx;
			background: linear-gradient(180deg, #04D9D9 0%, #1DABF2 100%);
			border-radius: 2rpx;
			position: absolute;
			left: -40rpx;
			top: 10rpx;
			transform: rotateZ(45deg);
		}

		.icon-text-number {
			margin-top: 50rpx;
			display: flex;
			flex-direction: column;

			.icon-text {
				flex: 1;
				display: flex;

				.number {
					width: 110rpx;
					// height: 100%;
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;

					&::after,
					&::before {
						flex: 1;
						display: block;
						content: "";
						width: 4rpx;
						background-color: #1DABF2;
					}

					&::after {
						background-color: var(--line-after);
					}

					&::before {
						background-color: var(--line-before);
					}

					>view {
						background-color: #fff;
						flex: 1;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%) rotateZ(45deg);
						width: 50rpx;
						height: 50rpx;
						border: 4rpx solid;
						border-image: linear-gradient(180deg, #04d9d9, #1dabf2) 4 4;
						display: grid;
						place-content: center;

						view {
							transform: rotateZ(-45deg);
						}
					}
				}

				.text {
					flex: 1;
					font-size: 28rpx;
					color: #2E3133;
					padding: 16rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>