<template>
	<view>
		<tito title="面对面扫码" :leftIconShow="true" />
		<view class="bj-qrsc">
			<image class="img" src="../../static/bg-jifen.png" mode=""></image>
			<view class="qr-text">
				<view class="qr">
					<image :src="qrCode" mode=""></image>
				</view>
				<view class="text">
					1.邀请好友注册成功，你们各自将获得{{registerIntegral}}积分
				</view>
				<view class="text">
					2.好友首次下单，你将再次获得{{firstOrderIntegral}}积分
				</view>
			</view>
		</view>
		<view class="buzou" @click="downloadFile">
			保存图片
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerIntegral: "",
				firstOrderIntegral: "",
				qrCode: "", //二维码
			};
		},
		onLoad(ope) {
			this.shareQrCode()
			if (ope.registerIntegral && ope.firstOrderIntegral) {
				this.registerIntegral = ope.registerIntegral
				this.firstOrderIntegral = ope.firstOrderIntegral
			}

		},
		methods: {
			//分享二维码
			async shareQrCode() {
				let res = await this.$request.get("/water-platform-app-api/customer/share/qrCode")
				if (res.data) {
					this.qrCode = res.data
				}
			},
			//保存图片
			downloadFile() {
				uni.downloadFile({
					url: this.qrCode,
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
							// 下载成功，保存图片到系统相册
							uni.saveImageToPhotosAlbum({
								filePath: downloadResult.tempFilePath,
								success: () => {
									uni.showToast({
										title: '图片保存成功'
									});
								},
								fail: () => {
									uni.showToast({
										title: '图片保存失败',
										icon: 'none'
									});
								}
							});
						} else {
							uni.showToast({
								title: '图片下载失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '图片下载失败',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.bj-qrsc {
		width: 690rpx;
		height: 860rpx;
		margin: 0 auto;
		margin-top: 64rpx;
		position: relative;

		.img {
			position: absolute;
			width: 690rpx;
			height: 860rpx;
		}

		.qr-text {
			position: absolute;
			left: 50%;
			top: 168rpx;
			transform: translate(-50%, 0);

			.qr {
				image {
					width: 354rpx;
					height: 354rpx;
				}
			}

			.text {
				font-size: 28rpx;
				color: #FA6B05;
				margin-top: 24rpx;
			}
		}
	}

	.buzou {
		width: 690rpx;
		height: 88rpx;
		background: #2590FA;
		border-radius: 100rpx;
		position: fixed;
		bottom: 50rpx;
		margin: 0 30rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}
</style>