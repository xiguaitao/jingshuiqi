<template>
	<view class="box" @click="handleClickOutside">
		<view class="tito" :style="{ marginTop: menuTop.top + 5 + 'px' }">
			<view></view>
			<!-- <view class="image">
				<image src="../../static/image/qiehuan.png" mode=""></image>
			</view>
			<view class="text" @click.stop="overlayShow = !overlayShow">
				切换账号
			</view>
			<view class="icon">
				<u-icon name="arrow-down" size="16"></u-icon>
				<view class="transition">
					<u-transition :show="overlayShow" mode="fade">
						<view ref="down" class="icon-down">
							<view class="image-text-phone-icon">
								<view class="image">
									<image :src="userData.logo" mode=""></image>
								</view>
								<view class="text-phone">
									<view class="text">
										{{ userData.name }}
									</view>
									<view class="phone">
										{{ userData.mobile || '请设置手机号' }}
									</view>
								</view>
								<view class="icon">
									<u-icon name="checkbox-mark" size="24" color="#04D9D9"></u-icon>
								</view>
							</view>
						</view>
					</u-transition>
				</view>
			</view> -->
		</view>
		<view class="lan"></view>
		<view class="toxiang">
			<view class="image-text-phone-icon">
				<view class="image">
					<image :src="userData.logo || logo" mode=""></image>
				</view>
				<view class="text-phone">
					<view class="text">
						{{ userData.name }}
					</view>
					<view class="phone">
						{{ userData.mobile || '请设置手机号' }}
					</view>
				</view>
				<view class="icon" @click="getCenter">
					<image src="../../static/image/bianji.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view class="kaPian">
			<image src="../../static/image/kapian.png" mode=""></image>
			<view class="kaPian-bnt"></view>
			<view class="money-number-balance">
				<view class="number-balance" @click="getbalance">
					<view class="number">
						{{ userData.nonPresentIncome }}
					</view>
					<view class="balance">
						余额
					</view>
				</view>
				<view class="number-balance" @click="getmypoints">
					<view class="number">
						{{ userData.integral }}
					</view>
					<view class="balance">
						积分
					</view>
				</view>
				<view class="number-balance" @click="getcoupon">
					<view class="number">
						{{ userData.couponCount }}
					</view>
					<view class="balance">
						优惠券
					</view>
				</view>
			</view>
		</view> -->

		<view class="myOrder-allOrders">
			<view class="text-myOrder-allOrders">
				<view class="myOrder">
					我的订单
				</view>
				<view class="allOrders" @click="getorderForGoods">
					全部订单
					<u-icon name="arrow-right" size="15" color="#B1B2B2"></u-icon>
				</view>
			</view>
			<view class="list-text">
				<view class="image-text" v-for="(item, index) in management.myOrder" :key="index"
					@click="getGoods(item)">
					<image class="image" :src="item.url" mode=""></image>
					<view class="text">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>

		<view class="myOrder-allOrders  orders">
			<view class="text-myOrder-allOrders">
				<view class="myOrder">
					资产管理
				</view>
			</view>
			<view class="list-text">
				<view class="image-text" v-for="(item, index) in management.assetManagement" :key="index"
					@click="getGoods(item)">
					<view v-if="item.name !== '生产绑定' && item.name !== '生成二维码'">
						<image class="image" :src="item.url" mode=""></image>
						<view class="text">
							{{ item.name }}
						</view>
					</view>
					<view v-if="(item.name == '生产绑定' || item.name == '生成二维码') && userData.id == '1'">
						<image class="image" :src="item.url" mode=""></image>
						<view class="text">
							{{ item.name }}
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="myOrder-allOrders orders">
			<view class="text-myOrder-allOrders">
				<view class="myOrder">
					服务项目
				</view>
			</view>
			<view class="list-text">
				<view class="image-text" v-for="(item, index) in management.serviceItems" :key="index"
					@click="getGoods(item)">
					<image class="image" :src="item.url" mode=""></image>
					<view class="text">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="myOrder-allOrders orders">
			<view class="text-myOrder-allOrders">
				<view class="myOrder">
					商家工具
				</view>
			</view>
			<view class="list-text">
				<view class="image-text" v-for="(item, index) in management.merchantToolsList" :key="index"
					@click="getGoods(item)">
					<image class="image" :src="item.url" mode=""></image>
					<view class="text">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="merchantTools orders"> -->
		<!-- <view class="tools">
				商家工具
			</view>
			<view class="list-text">
				<view class="image-text" v-for="(item, index) in management.merchantToolsList" :key="index"
					@click="getGoods(item)">
					<image class="image" :src="item.url" mode=""></image>
					<view class="text">
						{{ item.name }}
					</view>
				</view>
			</view> -->
		<!-- <view class="metchantList">
				<view class="image-text-icon" v-for="(item, index) in management.merchantToolsList" :key="index"
					@click="getGoods(item)">
					<view class="image">
						<image :src="item.url" mode=""></image>
					</view>
					<view class="text">
						{{ item.name }}
					</view>
					<view class="icon">
						<u-icon name="arrow-right" size="20" color="#B1B2B2"></u-icon>
					</view>
				</view>
			</view> -->
		<!-- </view> -->
		<!-- <u-overlay :show="overlayShow" @click="overlayShow = false" opacity="0.5" ></u-overlay> -->
	</view>
</template>

<script>
import {
	customerInfo
} from "@/api/api.js"
export default {
	data() {
		return {
			userData: {},
			menuTop: uni.getMenuButtonBoundingClientRect(),
			logo: require("@/static/image/jingLogo.png"),
			overlayShow: false,
			management: {
				myOrder: [{
					url: require("@/static/image/daizhifus.png"),
					name: '待支付'
				},
				{
					url: require("@/static/image/daifahuos.png"),
					name: '待发货'
				},
				{
					url: require("@/static/image/daishouhuos.png"),
					name: '待收货'
				},
				{
					url: require("@/static/image/tuihuanhuos.png"),
					name: '退换货'
				},
				],
				assetManagement: [
					{
						url: require("@/static/image/wodeshebei.png"),
						name: '我的设备'
					},
					{
						url: require("@/static/image/productBind.png"),
						name: '生产绑定'
					},
					{
						url: require("@/static/image/productQr.png"),
						name: '生成二维码'
					},
					// {
					// 	url: require("@/static/image/wodeshouyi.png"),
					// 	name: '我的收益'
					// },
					// {
					// 	url: require("@/static/image/wodetuandui.png"),
					// 	name: '我的团队'
					// },
					// {
					// 	url: require("@/static/image/wodetixian.png"),
					// 	name: '我的提现'
					// },
					// {
					// 	url: require("@/static/image/chongzhi.png"),
					// 	name: '充值记录'
					// },
					// {
					// 	url: require("@/static/image/yinhangka.png"),
					// 	name: '银行卡管理'
					// },
					// {
					// 	url: require("@/static/image/fapiao.png"),
					// 	name: '发票管理'
					// },
					// {
					// 	url: require("@/static/image/touzi.png"),
					// 	name: '我的投资'
					// },
				],
				serviceItems: [{
					url: require("@/static/image/wodeshouho.png"),
					name: '我的售后'
				},
				{
					url: require("@/static/image/wodeyinshui.png"),
					name: '我的饮水'
				},
				// {
				// 	url: require("@/static/image/yaoqing.png"),
				// 	name: '邀请好友'
				// },
				{
					url: require("@/static/image/fankui.png"),
					name: '意见反馈'
				},
					// {
					// 	url: require("@/static/image/kefu.png"),
					// 	name: '客服中心'
					// },
					// {
					// 	url: require("@/static/image/yireyidang.png"),
					// 	name: '一人一档'
					// },
					// {
					// 	url: require("@/static/image/hetong.png"),
					// 	name: '合同管理'
					// },
					// {
					// 	url: require("@/static/image/renmai.png"),
					// 	name: '人脉资源'
					// },
				],
				merchantToolsList: [
					// 	{
					// 	url: require("@/static/image/dizhi.png"),
					// 	name: '地址管理'
					// },
					{
						url: require("@/static/image/shuizhi.png"),
						name: '水质监控'
					},
					{
						url: require("@/static/image/sqfapiao.png"),
						name: '申请发票'
					},
					// {
					// 	url: require("@/static/image/guanyu.png"),
					// 	name: '关于我们'
					// }
				]
			},
		};
	},
	onShow() {
		this.customerInfo()
	},
	methods: {
		//个人信息
		async customerInfo(code) {
			let res = await customerInfo()
			console.log(res.data, '个人信息');
			this.userData = res.data
			uni.setStorageSync("userID", res.data.id)
		},
		//优惠劵
		getcoupon() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/coupon/coupon"
			})
		},
		//积分
		getmypoints() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/myPoints/myPoints"
			})
		},
		//余额
		getbalance() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/balance/balance?nonPresentIncome=" + this.userData.nonPresentIncome
			})
		},
		handleClickOutside(event) {
			const dom2 = this.$refs.down;
			if (this.overlayShow && (!dom2 || !dom2.contains(event.target))) {
				this.overlayShow = false;
			}
		},
		//个人中心
		getCenter() {
			uni.$u.route({
				url: "/subpackageA/pages/my/personalCenter/personalCenter",
				// params: {
				// 	title
				// }
			})
		},
		//跳转全部订单 
		getorderForGoods() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/orderForGoods/orderForGoods?current=" + "" + "&status=" + ""
			})
		},
		//我的订单 跳转定单
		getGoods(e) {
			if (e.name == "待支付") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/orderForGoods/orderForGoods?current=" + 1 + "&status=" + "0"
				})
			}
			if (e.name == "待发货") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/orderForGoods/orderForGoods?current=" + 2 + "&status=" + "1"
				})
			}
			if (e.name == "待收货") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/orderForGoods/orderForGoods?current=" + 3 + "&status=" + "2"
				})
			}
			if (e.name == "退换货") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/orderForGoods/orderForGoods?current=" + 4 + "&status=" + "3"
				})
			}
			if (e.name == "我的设备") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myDevice/myDevice"
				})
			}
			if (e.name == "我的收益") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myEarnings/myEarnings"
				})
			}
			if (e.name == "我的团队") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myTeam/myTeam"
				})
			}
			if (e.name == "我的提现") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myWithdrawal/myWithdrawal"
				})
			}
			if (e.name == "充值记录") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myRecords/myRecords"
				})
			}
			if (e.name == "银行卡管理") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/management/management"
				})
			}
			if (e.name == "发票管理") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/invoice/invoice"
				})
			}
			if (e.name == "我的售后") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/myService/myService"
				})
			}
			if (e.name == "我的饮水") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/MyDrinkingWater/MyDrinkingWater"
				})
			}
			if (e.name == "邀请好友") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/lnviteFriends/lnviteFriends"
				})
			}
			if (e.name == "意见反馈") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/feedback/feedback"
				})
			}
			if (e.name == "客服中心") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/customerServiceCenter/customerServiceCenter"
				})
			}
			if (e.name == "一人一档") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/personFile/personFile"
				})
			}
			if (e.name == "合同管理") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/contractManagement/contractManagement"
				})
			}
			if (e.name == "地址管理") {
				uni.navigateTo({
					url: "/subpackageA/pages/device/myAddress/myAddress"
				})
			}
			if (e.name == "水质监控") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/waterQualityMonitoring/waterQualityMonitoring"
				})
			}
			if (e.name == "申请发票") {
				uni.navigateTo({
					url: "/subpackageA/pages/my/applyForInvoice/applyForInvoice"
				})
			}
			if (e.name == "生产绑定") {
				uni.navigateTo({
					url: "/subpackageA/pages/productionBinding/productionBinding"
				})
			}
			if (e.name == "生成二维码") {
				uni.navigateTo({
					url: "/subpackageA/pages/prdouctQr/prdouctQr"
				})
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.box {
	// height: 100%;
	min-height: 100vh;
	background-color: #F0F3F5;
	padding: 0 32rpx 32rpx;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

.lan {
	position: absolute;
	left: 0;
	top: 0;
	width: 360rpx;
	height: 360rpx;
	background: rgba(29, 172, 242, 0.5);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	filter: blur(200px);
	z-index: 1;
}

.tito {
	display: flex;
	align-items: center;
	position: relative;
	z-index: 10;

	.image {
		image {
			width: 48rpx;
			height: 48rpx;
			vertical-align: middle;
		}
	}

	.text {
		font-size: 28rpx;
		color: #14181A;
	}

	.icon {
		position: relative;

		.transition {
			transform: translate(50%, 105%);
			position: absolute;
			bottom: 0%;
			right: 0;
			z-index: 99;

			.icon-down {
				width: 396rpx;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 12rpx;
				padding: 32rpx;
				box-sizing: border-box;

				.image-text-phone-icon {
					display: flex;
					align-items: center;

					.image {
						image {
							width: 72rpx;
							height: 72rpx;
							border-radius: 50%;
							vertical-align: middle;
						}
					}

					.text-phone {
						margin-left: 24rpx;

						.text {
							font-size: 28rpx;
							color: #FFFFFF;
						}

						.phone {
							font-size: 20rpx;
							color: rgba(255, 255, 255, 0.7);
						}
					}

					.icon {
						margin-left: auto;
					}
				}
			}
		}
	}
}

.toxiang {
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	margin-top: 52rpx;

	.image-text-phone-icon {
		display: flex;
		align-items: center;
		margin-top: auto;
		margin-bottom: 32rpx;

		.image {
			image {
				width: 112rpx;
				height: 112rpx;
				border-radius: 50%;
			}
		}

		.text-phone {
			margin-left: 16rpx;

			.text {
				font-weight: 600;
				font-size: 32rpx;
				color: #14171A;
			}

			.phone {
				font-size: 24rpx;
				color: #2E3033;
				margin-top: 16rpx;
			}
		}

		.icon {
			margin-left: auto;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}

.kaPian {
	position: relative;
	width: 100%;
	height: 160rpx;

	.kaPian-bnt {
		position: absolute;
		bottom: -15%;
		left: 3%;
		width: 94%;
		height: 60rpx;
		margin: 0 32rpx;
		background: rgba(89, 134, 178, 0.5);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		filter: blur(20px);
	}

	image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0%;
	}

	.money-number-balance {
		position: relative;
		height: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.number-balance {
			text-align: center;

			.number {
				font-weight: 600;
				font-size: 44rpx;
				color: #FFFFFF;
			}

			.balance {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.7);
			}
		}
	}
}

.myOrder-allOrders {
	// height: 222rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
	margin: 64rpx 0 0 0;
	padding: 24rpx;
	box-sizing: border-box;

	.text-myOrder-allOrders {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.myOrder {
			font-weight: 600;
			font-size: 32rpx;
			color: #14171A;
		}

		.allOrders {
			font-size: 24rpx;
			color: #B1B2B2;
			display: flex;
			align-items: center;
		}
	}

	.list-text {
		text-align: center;
		display: flex;
		margin-top: 24rpx;
		flex-wrap: wrap;

		.image-text:nth-child(n + 5) {
			margin-top: 24rpx;
		}

		.image-text {
			width: 25%;

			.image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}

			.text {
				font-size: 24rpx;
				color: #303332;
			}
		}
	}
}

.orders {
	margin-top: 24rpx;
}

.merchantTools {
	background: #FFFFFF;
	border-radius: 16rpx;
	padding: 24rpx;
	box-sizing: border-box;

	.tools {
		font-weight: 600;
		font-size: 32rpx;
		color: #14171A;
		margin-bottom: 32rpx;
	}

	.metchantList {
		.image-text-icon:first-child {
			margin-top: 0rpx;
		}

		.image-text-icon:last-child {
			border-bottom: none;
		}

		.image-text-icon {
			display: flex;
			align-items: center;
			height: 72rpx;
			margin-top: 24rpx;
			border-bottom: 2rpx solid #F1F2F2;

			.image {
				image {
					width: 48rpx;
					height: 48rpx;
					vertical-align: middle;
				}
			}

			.text {
				font-size: 28rpx;
				color: #2E3033;
				margin-left: 16rpx;
			}

			.icon {
				margin-left: auto;
			}
		}
	}
}

.overlay {
	position: absolute;
	left: 60rpx;
	top: 125rpx;
	z-index: 10071;

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
}
</style>