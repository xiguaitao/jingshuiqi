<template>
	<view class="box">

		<view class="dcontract-text">
			<view class="text">
				手写签名：
			</view>
			<view class="dcontract">
				<view style="width: 100% ;height: 100%;">
					<l-signature disableScroll ref="signatureRef" :penColor="penColor" :penSize="penSize"
						:openSmooth="openSmooth"></l-signature>
				</view>
			</view>
		</view>
		<view class="bnt">
			<view class="text deny" @click="popupShow = true">
				拒签
			</view>
			<view class="text deny" @click="onClick('clear')">
				清空
			</view>
			<!-- <view class="text deny" @click="onClick('undo')">
				撤消
			</view> -->
			<view class="text" @click="onClick('save')">
				确定
			</view>
		</view>
		<view class="popup">
			<u-popup :show="popupShow" @close="close" @open="open" mode="center" :round="10"
				:safeAreaInsetBottom="false">
				<view class="denys">
					<view class="text-yy padd">
						拒签原因
					</view>
					<view class="textarea padd">
						<u--textarea v-model="value1" placeholder="请输入内容" count border="none"
							height="152rpx"></u--textarea>
					</view>
					<view class="btn">
						<view class="text" @click="popupShow = false">
							取消
						</view>
						<view class="text sbmer" @click="contractRefuse">
							确定
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import url from "@/api/url.js"
	let {
		WdefBaseUrl
	} = url;
	import {
		setTimeout
	} from "timers";
	import {
		contractSave,
		contractRefuse
	} from "@/api/api.js"
	export default {
		data() {
			return {
				popupShow: false,
				value1: "",
				title: 'Hello',
				penColor: 'red',
				penSize: 5,
				urlImage: '',
				openSmooth: true,
				contractRecordId: "",
			};
		},
		onLoad(ope) {
			if (ope.contractRecordId) {
				this.contractRecordId = ope.contractRecordId
			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.popupShow = false
			},
			async onClick(type) {
				if (type == 'openSmooth') {
					this.openSmooth = !this.openSmooth
					return
				}
				if (type == 'save') {
					this.$refs.signatureRef.canvasToTempFilePath({
						success: async (res) => {
							console.log(res)
							// 是否为空画板 无签名
							console.log(res.isEmpty)
							// 生成图片的临时路径
							// H5 生成的是base64
							this.urlImage = res.tempFilePath
							if (res.isEmpty) {
								uni.showToast({
									title: "请先签名!",
									icon: "none"
								})
							} else {
								uni.showLoading({
									title: '签名中'
								});
								//图片转 格式
								uni.uploadFile({
									url: WdefBaseUrl + '/fileUpload/save',
									filePath: res.tempFilePath, // 图片路径
									name: 'uploadImg', // 确保这个名字与后端接受的字段名一致
									header: {
										"token": uni.getStorageSync('token'),
									},
									timeout: 60000,
									success: async (res) => {
										try {
											let image = JSON.parse(res.data);
											if (image.state === "SUCCESS" && image.url) {
												// 使用 await 确保异步操作按顺序执行
												const saveResult = await contractSave({
													contractRecordId: this
														.contractRecordId,
													signs: image
														.url // 假设 image.url 是签名图片的 URL
												});
												if (saveResult.code == 0) {
													uni.hideLoading();
													uni.showToast({
														title: "签名成功",
														icon: "none"
													});
													setTimeout(() => {
														uni.navigateBack({
															delta: 3
														});
													}, 1500);
												}
											}
										} catch (error) {
											console.log(error, '-error-');
										}
									},
									fail: (error) => {
										console.log(error, '-error-');
									},
									complete: () => {}
								});
							}
						}
					})
					return
				}
				if (this.$refs.signatureRef)
					this.$refs.signatureRef[type]()
			},
			contractRefuse() {
				if (!this.value1) {
					uni.showToast({
						title: "拒签原因不能为空",
						icon: "none"
					})
				}
				let data = {
					contractRecordId: this.contractRecordId,
					reason: this.value1
				}
				contractRefuse(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: "拒绝成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 3
							})
						}, 1500)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #F0F3F5;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
	}

	.dcontract-text {
		margin: 48rpx 32rpx;
		flex: 1;
		display: flex;
		flex-direction: column;

		.text {
			font-weight: 600;
			font-size: 32rpx;
			color: #14181A;
			font-family: PingFang SC, PingFang SC;
		}

		.dcontract {
			background-color: #FFF;
			overflow-y: auto;
			border-radius: 8rpx;
			margin-top: 32rpx;
			flex: 1;
		}
	}

	.bnt {
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.text {
			height: 88rpx;
			background: #1DABF2;
			border-radius: 8rpx;
			margin: 32rpx;
			line-height: 88rpx;
			text-align: center;
			color: #FFF;
			flex: 1;
		}

		.deny {
			border: 2rpx solid #1DABF2;
			color: #1DABF2;
			background-color: #FFF;
		}
	}

	.popup {
		.denys {
			width: 552rpx;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.padd {
				padding: 0 48rpx;
				box-sizing: border-box;
			}

			.text-yy {
				font-weight: 600;
				font-size: 32rpx;
				color: #14181A;
				margin-top: 48rpx;
			}

			.textarea {
				margin-top: 24rpx;

				::v-deep .u-textarea {
					background-color: #F0F3F5;
				}
			}

			.btn {
				height: 92rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-top: 2rpx solid #E1E4E6;
				margin-top: 48rpx;

				.text {
					font-size: 32rpx;
					color: #14181A;
					flex: 1;
					text-align: center;
					height: 100%;
					line-height: 92rpx;
				}

				.sbmer {
					color: #1DABF2;
				}
			}
		}
	}
</style>