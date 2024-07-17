<template>
	<view class="box">
		<view class="deviceBj">
			<image src="../../static/bj-yqhy.png" mode=""></image>
		</view>
		<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 5 + 'px', }">
			<view class="image-text" @click="getdevices">
				<u-icon name="arrow-left" size="20" color="#2E3133"></u-icon>
			</view>
			<view class="textE">
				邀请好友
			</view>
		</view>
		<view class="image-bj">
			<image src="../../static/zhuanjifen.png" mode=""></image>
		</view>
		<view class="btns">
			<view class="invite-face">
				<button @click="scanning" class="face">面对面邀请</button>
				<button class="invite face" open-type="share">立即邀请</button>
			</view>
			<view class="neiron-steps buzou">
				<image class="images" src="../../static/neironkuang.png" mode=""></image>
				<view class="steps">
					参与步骤
				</view>
				<view class="stes">
					<image src="../../static/setelt.png" mode=""></image>
				</view>
				<view class="text-text">
					<view class="text">
						分享链接或面对面扫码邀请好友
					</view>
					<view class="text">
						好友注册成功各自获得{{infoData.registerIntegral}}积分
					</view>
					<view class="text">
						好友成功首单你将得{{infoData.firstOrderIntegral}}积分
					</view>
				</view>
				<view class="ends">
					邀请越多奖励积分越多
				</view>
			</view>
			<view class="neiron-steps">
				<image class="images" src="../../static/neironkuang.png" mode=""></image>
				<view class="steps">
					我的奖励
				</view>
				<view class="integral-number-text-button">
					<view class="integral">
						已获得积分
					</view>
					<view class="number">
						{{infoData.alreadyGetIntegral}}
					</view>
					<view class="text-button" @click="getmall">
						去使用
					</view>
				</view>
			</view>
			<view class="neiron-steps">
				<image class="images" src="../../static/neironkuang.png" mode=""></image>
				<view class="steps">
					已邀请人
				</view>
				<view class="option-openlist">
					<view class="option">
						<view :class="inviteorder ? 'order' : 'invite'" @click="inviteOrder(false)">
							邀请成功人数({{infoData.sharePeopleNumber || 0}})
						</view>
						<view :class="inviteorder ? 'invite' : 'order'" @click="inviteOrder(true)">
							下单成功人数({{infoData.orderPeopleNumber || 0}})
						</view>
					</view>
					<view class="openlist">
						<view class="tite">
							<view class="text">
								头像
							</view>
							<view class="text">
								昵称
							</view>
							<view class="text">
								邀请时间
							</view>
						</view>
						<scroll-view class="list-text" scroll-y="true" @scrolltolower="handleScrollToLower">
							<view class="list" v-for="(item,index) in shareData" :key="index">
								<view class="listimage text">
									<image class="listimage" :src="item.logo || logo" mode=""></image>
								</view>
								<view class="text">
									{{item.name}}
								</view>
								<view class="text">
									{{createTime(item.createTime)}}
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shareInfo,
		shareList
	}
	from "@/api/api.js"
	export default {
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				logo:require("@/static/image/jingLogo.png"),
				inviteorder: false,
				infoData: {}, //邀请好友页面数据
				shareData: [], //已邀请人员列表
				page: 1,
				limit: 10,
			};
		},
		onLoad() {
			this.shareInfo()
			this.shareList()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				return {
					title: `邀你一起赚积分`,
					path: `pages/login/login?inviterCode=${this.infoData.mobile}`,
					imageUrl: `../../static/zhuanjifen.png`
				};
			}
		},
		methods: {
			getdevices() {
				uni.navigateBack()
			},
			//去使用
			getmall() {
				uni.switchTab({
					url: "/pages/mall/mall"
				})
			},
			//处理时间
			createTime(e) {
				return e.split(' ')[0]
			},
			//列表触底
			handleScrollToLower() {
				this.page++
				this.shareList()
			},
			//已邀请人员列表
			async shareList() {
				let data = {
					page: this.page,
					limit: this.limit,
					type: this.inviteorder ? 2 : 1
				}
				let res = await shareList(data)
				if (res.data.length > 0) {
					this.shareData.push(...res.data)
				} else {
					// uni.showToast({
					// 	title: "没有更多了！",
					// 	icon: "none"
					// })
				}
			},
			inviteOrder(e) {
				if (this.inviteorder != e) {
					this.inviteorder = !this.inviteorder
					this.page = 1
					this.shareData = []
					this.shareList()
				}
			},
			scanning() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/lnviteFriends/faceQRScanning?registerIntegral=" + this.infoData
						.registerIntegral + "&firstOrderIntegral=" + this.infoData.firstOrderIntegral,
				})
			},
			//邀请好友页面数据
			async shareInfo() {
				let res = await shareInfo()
				if (res.data) {
					this.infoData = res.data
				}
			},
		},
	}
</script>

<style lang="scss">
	.box {
		overflow: auto;
		background-color: #BBDFFA;
	}

	.deviceBj {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		image {
			width: 100%;
			height: 500rpx;
		}
	}

	.tito {
		display: flex;
		box-sizing: border-box;
		margin-bottom: 62rpx;
		position: relative;
		padding: 0 32rpx;
		box-sizing: border-box;

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

		.textE {
			font-weight: 600;
			font-size: 32rpx;
			color: #14171A;
			margin-left: 50%;
			transform: translateX(-80%);
		}
	}

	.image-bj {
		text-align: center;
		margin-top: 36rpx;
		position: relative;

		image {
			width: 650rpx;
			height: 512rpx;
		}
	}

	.btns {
		background-color: #BBDFFA;

		.invite-face {
			display: flex;
			justify-content: space-evenly;
			margin-top: 64rpx;

			.face {
				width: 268rpx;
				height: 72rpx;
				background: linear-gradient(135deg, #04D9D9 0%, #1DABF2 100%);
				border-radius: 8rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 72rpx;
			}

			.invite {
				background: linear-gradient(135deg, #FA8C3E 0%, #FA573E 100%);
			}
		}

		.buzou {
			margin: 52rpx auto 0 !important;
		}

		.neiron-steps {
			width: 690rpx;
			height: 518rpx;
			margin: 0 auto 0;
			position: relative;

			.images {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}

			.steps {
				font-weight: 600;
				font-size: 36rpx;
				color: #2590FA;
				position: absolute;
				left: 40%;
				top: 7%;
			}

			.stes {
				position: absolute;
				top: 25%;
				left: 50%;
				transform: translateX(-50%);

				image {
					width: 584rpx;
					height: 128rpx;
				}
			}

			.text-text {
				position: absolute;
				top: 55%;
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				.text {
					width: 25%;
					font-size: 24rpx;
					color: #616366;
				}
			}

			.ends {
				position: absolute;
				top: 80%;
				left: 50%;
				transform: translateX(-50%);
				font-size: 28rpx;
				color: #FA6B05;
			}

			.integral-number-text-button {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				text-align: center;

				.integral {
					font-weight: 600;
					font-size: 32rpx;
					color: #2E3033;
				}

				.number {
					font-weight: 600;
					font-size: 60rpx;
					color: #FA6B05;
					margin-top: 16rpx;
				}

				.text-button {
					width: 232rpx;
					height: 72rpx;
					border-radius: 100rpx;
					font-size: 28rpx;
					color: #FA6B05;
					text-align: center;
					line-height: 72rpx;
					border: 2rpx solid #FA6E05;
					margin: 24rpx auto;
				}
			}

			.option-openlist {
				position: absolute;
				left: 50%;
				top: 22%;
				transform: translate(-50%, 0%);

				.option {
					width: 600rpx;
					height: 72rpx;
					background: #F4F5F6;
					border-radius: 100rpx;
					display: flex;
					justify-content: space-between;

					.invite {
						width: 300rpx;
						height: 72rpx;
						background: #2590FA;
						border-radius: 100rpx;
						text-align: center;
						line-height: 72rpx;
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.order {
						width: 300rpx;
						height: 72rpx;
						text-align: center;
						line-height: 72rpx;
						font-size: 28rpx;
						color: #2E3033;
					}
				}

				.openlist {

					.tite {
						display: flex;
						justify-content: center;
						font-size: 28rpx;
						color: #616366;
						margin-top: 22rpx;

						.text {
							font-size: 28rpx;
							text-align: center;
							width: 30%;
						}
					}

					.list-text {
						height: 200rpx;
						/* 设置滚动区域的高度 */
						overflow-y: auto;
						/* 添加滚动条 */

						.list {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 24rpx;

							.listimage {
								width: 64rpx;
								height: 64rpx;
								vertical-align: middle;
							}

							.text {
								width: 30%;
								font-size: 28rpx;
								color: #14171A;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>