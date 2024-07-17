<template>
	<view class="box">
		<view class="address-list">
			<view class="addressList" v-for="(item,index) in addressList" :key="index">
				<view @click.stop="getcbk(item)">
					<view class="name-pron">
						<view class="name">
							{{item.name}}
						</view>
						<view class="pron">
							{{item.mobile}}
						</view>
					</view>
					<view class="address-icon">
						<view class="address">
							{{item.provinceName}} {{item.cityName}} {{item.areaName}} {{item.address}}
						</view>
						<view class="icon" @click.stop="getdetail(item)">
							<image src="../../static/xiugai.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="text-img-icon">
					<view class="default">
						<checkbox-group @change="handleCheckboxChange(item)">
							<label class="default">
								<checkbox :disabled="item.isdefault == 1" v-model="item.isdefault"
									:checked=" item.isdefault == 1" color="#2590FA" /> 已设为默认
							</label>
						</checkbox-group>
					</view>
					<view class="text cop" @click="getcop(item)">
						<image src="../../static/fuzhi.png" mode=""></image>
						复制
					</view>
					<view class="text delete" @click="getdelete(item)">
						<image src="../../static/shanchu.png" mode=""></image>
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="save_btn" @click="getaddress">
			<button>添加地址</button>
		</view>
		<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
			<view class="popur">
				<view class="delete">
					确定要删除该地址吗？
				</view>
				<view class="cance-sbmer">
					<view class="cance" @click="$refs.popup.close()">
						取消
					</view>
					<view class="cance sbmer" @click="getsbmer">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressId: null,
				addressList: [],
				page: 1, //页
				limit: 10, //条
				myCenter: false, //true 就是可以选择地址返回
			};
		},
		onLoad(ope) {
			if (ope.myCenter) {
				this.myCenter = ope.myCenter
			}

		},
		onShow() {
			this.page = 1
			this.addressList = []
			this.getaddressList()

		},
		onReachBottom() {
			this.page++
			this.getaddressList()
		},
		methods: {
			//订单页选择地址返回
			getcbk(e) {
				if (this.myCenter == 'true') {
					uni.$emit("getcbk", e)
					uni.navigateBack()
				}
			},
			//设置默认地址
			handleCheckboxChange(event) {
				event.isdefault = 1
				delete event.createTime
				delete event.updateTime
				this.$request.get("/water-platform-app-api/customer/address/update", event).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: "设置默认成功!",
							icon: "none"
						})
						this.addressList = []
						this.getaddressList()
					}
				})
			},
			getdelete(e) {
				this.addressId = e.id
				this.$refs.popup.open('center')
			},
			//删除地址
			getsbmer() {
				this.$request.get("/water-platform-app-api/customer/address/delete", {
					id: this.addressId
				}).then(res => {
					console.log(res, '地址删除');
					if (res.code == 0) {
						uni.showToast({
							title: "地址删除成功!",
							icon: "none"
						})
						this.$refs.popup.close()
						this.page = 1
						this.addressList = []
						this.getaddressList()
					}
				})
			},
			//地址详情
			getdetail(item) {
				uni.navigateTo({
					url: "/subpackageA/pages/mall/address/address?id=" + item.id + "&title=" + "修改地址"
				})
			},
			//跳转添加地址
			getaddress() {
				uni.navigateTo({
					url: "/subpackageA/pages/mall/address/address?title=" + "添加地址"
				})
			},
			//地址列表
			async getaddressList() {
				let data = {
					page: this.page,
					limit: this.limit,
				}
				await this.$request.get("/water-platform-app-api/customer/address/list", data).then(res => {
					console.log(res, '地址列表');
					if (res.data.length > 0) {
						this.addressList.push(...res.data)
					} else {
						uni.showToast({
							title: "没有更多了!",
							icon: "none"
						})
					}
				})
			},
			//复制
			getcop(e) {
				console.log(e, 'eeeee复制eeeeee');
				uni.setClipboardData({
					data: `${e.provinceName} ${e.cityName} ${e.areaName} ${e.address}`,
					success() {
						uni.showToast({
							title: "复制成功!",
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
		background-color: #F3F5F6;
		overflow: hidden;
	}

	.address-list {
		margin-top: 32rpx;

		.addressList {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 24rpx 30rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.name-pron {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #2E3033;

				.pron {
					margin-left: 16rpx;
				}
			}

			.address-icon {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 16rpx;
				padding-bottom: 32rpx;
				border-bottom: 2rpx solid #F1F2F2;

				.address {
					font-size: 28rpx;
					color: #616366;
				}

				.icon {
					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.text-img-icon {
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.default {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #2590FA;
				}

				.cop {
					margin-left: auto;
					margin-right: 32rpx;
				}

				.text {
					font-size: 24rpx;
					color: #B1B2B2;
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
					}
				}
			}
		}
	}

	.save_btn {
		width: 690rpx;
		height: 88rpx;
		position: fixed;
		bottom: 98rpx;
		margin-left: 32rpx;

		button {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background: #2590FA;
			border-radius: 25px;
		}
	}

	.popur {
		width: 552rpx;
		height: 264rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		padding: 48rpx;
		box-sizing: border-box;

		.delete {
			font-size: 28rpx;
			color: #14171A;
			text-align: center;
		}

		.cance-sbmer {
			display: flex;
			justify-content: center;
			margin-top: 64rpx;

			.cance {
				width: 216rpx;
				height: 64rpx;
				border-radius: 100rpx 100rpx 100rpx 100rpx;
				font-size: 28rpx;
				color: #14171A;
				line-height: 64rpx;
				text-align: center;
				border: 2rpx solid #B5B6B6;
			}

			.sbmer {
				background: #2590FA;
				border: none;
				margin-left: 24rpx;
				color: #FFF;
			}
		}
	}
</style>