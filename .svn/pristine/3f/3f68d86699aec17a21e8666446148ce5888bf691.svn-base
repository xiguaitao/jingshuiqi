<template>
	<view class="box">
		<view class="hi-log">
			<view class="text-hi">
				<view class="text">
					Hi~
				</view>
				<view class="text">
					请问有什么可以帮您？
				</view>
			</view>
			<view class="image">
				<image src="../../static/kfzx.png" mode=""></image>
			</view>
		</view>
		<view class="contact">
			<view class="conct">
				联系客服
			</view>
			<view class="qq-pant-cop">
				<view class="qq">
					QQ客服
				</view>
				<view class="pant">
					{{qrText.qq}}
				</view>
				<view class="cop" @click="getcop(qrText.qq)">
					复制
				</view>
			</view>
			<view class="qq-pant-cop">
				<view class="qq">
					微信客服
				</view>
				<view class="pant">
					{{qrText.weixin}}
				</view>
				<view class="cop" @click="getcop(qrText.weixin)">
					复制
				</view>
			</view>
			<view class="qq-pant-cop">
				<view class="qq">
					400客服
				</view>
				<view class="pant">
					{{qrText.phone}}
				</view>
				<view class="cop" @click="getcall(qrText.phone)">
					拨打
				</view>
			</view>
			<view class="qq-pant-cop">
				<view class="qq">
					关注公众号
				</view>
				<view class="text" @click="getprogram">
					{{qrText.wechatPublicAccountName}}
				</view>
			</view>
		</view>
		<view class="whatyouwant ">
			<uni-collapse accordion>
				<uni-collapse-item :title="item.question" v-for="(item,index) in qrDate" :key="item.id">
					<view class="content">
						<rich-text :nodes="item.answer"></rich-text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrText: {}, //联系客服信息
				qrDate: [], //常见问题列表
				page: 1,
				limit: 10,
			};
		},
		onLoad() {
			this.faqInfo()
			this.faqList()
		},
		methods: {
			getcall(e) {
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			clickLeft() {
				uni.navigateBack()
			},
			getprogram() {
				uni.navigateToMiniProgram({
					appId: "",
					path: "",
					success: (res) => {
						console.log(res, '跳转成功')
					}
				})
			},
			//联系客服信息
			async faqInfo() {
				let res = await this.$request.get("/water-platform-app-api/customer/faq/info")
				if (res.data) {
					this.qrText = res.data
				}
			},
			//常见问题列表
			async faqList() {
				let data = {
					page: this.page,
					limit: this.limit,
				}
				let res = await this.$request.get("/water-platform-app-api/customer/faq/list", data)
				if (res.data.length > 0) {
					this.qrDate.push(...res.data)
				}
			},
			//复制
			getcop(e) {
				uni.setClipboardData({
					data: e,
					success() {
						uni.showToast({
							title: "复制成功",
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F2F4F5;
	}

	.hi-log {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #3099F2;

		.text-hi {
			.text {
				font-weight: 600;
				font-size: 36rpx;
				color: #2E3033;
				margin-bottom: 24rpx;
			}
		}

		.image {
			image {
				width: 300rpx;
				height: 300rpx;
			}
		}
	}

	.contact {
		height: 364rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: -50rpx 30rpx;
		padding: 32rpx;
		box-sizing: border-box;
		box-shadow: 0rpx 30rpx 30rpx 0rpx #D8DBDC;

		.conct {
			font-weight: 600;
			font-size: 32rpx;
			color: #14171A;
		}

		.qq-pant-cop {
			display: flex;
			font-size: 28rpx;
			margin-top: 24rpx;

			.qq {
				color: #616366;
			}

			.pant {
				color: #2E3033;
				margin-left: 24rpx;
			}

			.cop {
				width: 72rpx;
				height: 36rpx;
				background: #F4F5F6;
				border-radius: 100rpx;
				font-size: 20rpx;
				color: #2E3033;
				text-align: center;
				line-height: 36rpx;
				margin-left: 24rpx;
			}

			.text {
				margin-left: 24rpx;
				color: #2590FA;
			}
		}
	}

	.whatyouwant {
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 98rpx 30rpx;
		padding: 32rpx;
		box-sizing: border-box;
		box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;

		.content {
			padding: 15px;
			box-sizing: border-box;
		}
	}
</style>