<template>
	<view class="boxs">
		<view class="poa">
			<view class="deviceBj">
				<image src="../../static/deviceBj.png" mode=""></image>
			</view>
			<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 5 + 'px', }">
				<view class="image-text" @click="getdevices">
					<u-icon name="arrow-left" size="20" color="#2E3133"></u-icon>
				</view>
				<view class="textE">
					设备编号{{ detailDate.code }}
				</view>
			</view>
			<!-- 水波纹 -->
			<view class="water-circle" id="reporterRatio">
				<view class="water water-level-10"></view>
				<image class="bolozhao" src="../../static/bolizhao.png" mode=""></image>
				<view class="filterate-number-rawWater">
					<view class="filterate">
						剩余服务
					</view>
					<view class="number">
						{{ detailDate.leftNumber }}
					</view>
					<!-- <view class="rawWater">
						净化前TDS：{{detailDate.enterTds}}
					</view>
					<view class="rawWater">
						净化后TDS：{{detailDate.outTds}}
					</view> -->
				</view>
			</view>
			<view style="position: relative;">
				<!-- <view class="numberL">
					净水总量：{{detailDate.totalwater}}L
				</view> -->
				<view class="firing-increase-recharge">
					<view class="firing" @click="popupShow = true">
						<view class="image">
							<image src="../../static/yuancheng.png"></image>
						</view>
						<view class="text">
							远程启动
						</view>
					</view>
					<view class="firing" @click="getsales">
						<view class="image">
							<image src=" ../../static/shouhou.png" mode=""></image>
						</view>
						<view class="text">
							申请售后
						</view>
					</view>
					<view class="firing" @click="getSufficient">
						<view class="image">
							<image src="../../static/chognzhi.png"></image>
						</view>
						<view class="text">
							充值
						</view>
					</view>
				</view>
			</view>


		</view>
		<view class="filterelement-progressbar-text">
			<view class="filterelement" v-for="(item, index) in detailDate.suppliesVoList" :key="item.id">
				<view class="name">
					{{ item.suppliesName }}
				</view>
				<view class="progressbar-text">
					<u-line-progress :showText="false" :percentage="item.leftPercent"
						:activeColor="item.leftPercent <= 10 ? 'red' : '#1DABF2'"></u-line-progress>
					<view class="text-reset">
						<view class="text">
							{{ item.suppliesRemark || '暂无描述' }}
						</view>

					</view>
				</view>
				<view class="textBfb">
					<view class="text">
						{{ item.leftPercent }}%
					</view>
					<view class="reset" @click="getreset(item)">
						复位
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="popupShow" mode="center" :round="10" @close="close" :safeAreaInsetBottom="false">
			<view class="remoteBoot">
				<view class="text-icon">
					<view class="text">
						远程启动
					</view>
				</view>
				<view class="mode-text">
					<view :class="kIndex == item.value ? 'texts' : 'text'" v-for="(item, index) in checkboxList"
						:key="index" @click="getscroll(item, index)">
						{{ item.text }}
					</view>
				</view>
				<view class="refuse-open">
					<view class="refuse" @click="popupShow = false">
						取消
					</view>
					<view class="refuse open" @click="opens">
						确认
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="popupBluetooth" mode="center" :round="10" :safeAreaInsetBottom="false"
			@close="popupBluetooth = false">
			<view class="Bluetooth">
				<bluetooth :isShowBlue="popupBluetooth" ref="bluet" @fail="fail" @connection="connection"
					@charErr="charErr" @writeSynchronization="writeSynchronization" :writeIn="writeIn" />
			</view>
		</u-popup>
	</view>
</template>

<script>
import {
	setTimeout
} from "timers";
import bluetooth from "./components/bluetooth.vue"
import {
	productDetail,
	suppliesResetByCode,
	syncResponse,
	productSyncData,
	productSendCommand,
	productSuppliesReset
} from "@/api/api.js"
export default {
	components: {
		bluetooth
	},
	data() {
		return {
			menuTop: uni.getMenuButtonBoundingClientRect(),
			kIndex: 11,
			checkboxList: [
				// {
				// 	value: 1,
				// 	text: '开机'
				// },
				// {
				// 	value: 0,
				// 	text: '关机'
				// },
				{
					value: 11,
					text: '同步'
				}
			],
			popupShow: false,
			popupBluetooth: false,
			detailDate: {},
			productId: "", //设备Id
			time: '12:01',
			writeIn: "5AA501060A0D", //写入的信息 默认为5AA501060A0D
			deviceId: "", //获取服务ID
		};
	},
	onLoad(ope) {
		if (ope.id) {
			this.productId = ope.id
			this.productDetail(ope.id)
		}
		uni.getLocation({
			success: function (res) {
				console.log('定位权限请求成功');
			},
			fail: function (res) {
				console.log('定位权限请求失败');
			}
		});
	},
	onShow() {
		uni.$once('getcbk', (data) => {
			console.log('监听到事件来自 getcbk ，携带参数为', data);
			this.productDetail(this.productId)
			uni.$off('getcbk');
		})
		uni.$once('submitReset', (data) => {
			console.log('监听到事件来自 submitReset ，携带参数为', data);
			this.getSubmitReset(data)
			uni.$off('submitReset');
		})
		this.deviceId = uni.getStorageSync("deviceId")
	},
	onHide() {
		// this.$refs.bluet.clooseBlue()
		// this.$refs.bluet.closeBLEConnection()
	},
	//离开页面时 断开蓝牙
	onUnload() {
		this.$refs.bluet.clooseBlue()
		this.$refs.bluet.closeBLEConnection()
	},
	methods: {
		// 初始化蓝牙
		async adddDevice() {
			// 初始化蓝牙模块
			return new Promise((resolve, reject) => {
				uni.openBluetoothAdapter({
					success: async (res) => {
						console.log('初始化蓝牙');
						let devices = await this.isBluetoothConnected();
						console.log(devices, '-----devices----');
						resolve(devices);
					},
					fail: (err) => {
						switch (this.systemType) {
							case 'android':
								// 跳转系统蓝牙设置页。仅支持安卓
								uni.openSystemBluetoothSetting({
									success: function (res) {
										console.log("打开设置", res);
									},
								})
								break;
							case 'ios':
								// 如果是ios
								uni.showToast({
									title: "IOS用户请手动打开蓝牙",
									icon: "none"
								})
								break;
						}
						reject(err);
					}
				})
			});
		},
		// 判断是否连接蓝牙
		async isBluetoothConnected() {
			return new Promise((resolve, reject) => {
				uni.getConnectedBluetoothDevices({
					services: ["0000FFF0-0000-1000-8000-00805F9B34FB"], // 你可以指定特定的服务 UUID 列表
					success: (res) => {
						if (res.devices.length > 0) {
							console.log('已连接的蓝牙设备', res);
							console.log('this.$refs.bluet::: ', this.$refs.bluet);
							this.$refs.bluet.stopScan();

							resolve(res.devices);
						} else {
							console.log('没有设备连接');
							this.popupBluetooth = true;
							resolve([]); // 返回空数组表示没有连接的设备
						}
					},
					fail: function (err) {
						console.error('获取已连接蓝牙设备失败', err);
						reject(err);
					}
				});
			});
		},
		//得到蓝牙数据  调用同步接口
		async writeSynchronization(e) {
			console.log(e, '得到蓝牙数据');
			let data = {
				productId: this.productId,
				devStatus: e.devStatus,
				faultStatus: e.faultStatus
			}
			let res = await productSyncData(data)
			if (res.code !== 0) {
				return uni.showToast({
					title: "同步失败请重新同步!",
					icon: "none"
				})
			}
		},
		close() {
			this.popupShow = false
		},
		//连接成功
		connection(e) {
			console.log('连接成功，关闭弹窗');
			this.deviceId = e
			this.popupBluetooth = false
		},
		//重新蓝牙打开弹窗
		charErr() {
			this.popupBluetooth = true
		},
		fail() {
			this.popupBluetooth = false
		},
		addLeadingHexZeros(value, length) {
			// 转换为十六进制，并确保长度为length位
			let hexString = parseInt(value).toString(16).toUpperCase();
			// 反转字符串以从右到左填充
			hexString = hexString.split('').reverse().join('');
			// 使用padStart确保长度，然后再次反转回正确的顺序
			hexString = hexString.padStart(length, '0').split('').reverse().join('');
			return hexString;
		},
		addLeadingZeros(value, length) {
			// 转换为十六进制，并确保长度为length位
			let hexString = parseInt(value).toString(16).toUpperCase();
			// 反转字符串以从右到左填充
			hexString = hexString.split('').reverse().join('');
			// 使用padStart确保长度，然后再次反转回正确的顺序
			hexString = hexString.padStart(length, '0').split('').reverse().join('');
			return hexString;
			// return String(value).padStart(length, '0');
		},
		async opens() {
			if (this.detailDate.signaType == 3) {
				try {
					let devices = await this.adddDevice();
					console.log(devices, 'devices');
					if (devices.length <= 0) {
						return uni.showToast({
							title: "请先连接蓝牙",
							icon: "none"
						});
					}
					let res = await syncResponse({
						productId: this.productId
					});
					if (res.code == 0) {
						console.log(res, '----同步获取数据----');
						// 定义字段和它们的预期长度
						const fields = {
							id: 8,
							type: 2,
							remain: 4,
							filterCurrent1: 4,
							filterCurrent2: 4,
							filterCurrent3: 4,
							filterCurrent4: 4,
							filterCurrent5: 4,
							filterTotal1: 4,
							filterTotal2: 4,
							filterTotal3: 4,
							filterTotal4: 4,
							filterTotal5: 4,
						};
						// 使用Object.keys和reduce来遍历字段并拼接字符串
						let data = Object.keys(fields).reduce((acc, key) => {
							if (key === 'id') {
								// 特殊处理id字段，转换为十六进制字符串
								return acc + this.addLeadingHexZeros(res.data[key], fields[key]);
							} else {
								return acc + this.addLeadingZeros(res.data[key], fields[key]);
							}
							// return acc + this.addLeadingZeros(res.data[key], fields[key]);
						}, '');
						data = "5AA50221" + data + "0A0D"
						console.log(data, '------');
						this.writeIn = data
						this.$refs.bluet.getServiceId(this.deviceId)
						this.popupShow = false
					}

				} catch (err) {
					console.error('opens 函数中发生错误', err);
				}
			} else {
				let data = {
					productId: this.productId,
					command: this.kIndex
				}
				let res = await productSendCommand(data)
				if (res.code == 0) {
					uni.showToast({
						title: "同步成功",
						icon: "none"
					})
					this.popupShow = false
					this.productDetail(this.productId)
				}
			}
		},
		getSubmitReset(e) {
			if (this.detailDate.signaType == 3) {
				syncResponse({
					productId: this.productId
				}).then(async res => {
					if (res.code == 0) {
						console.log(res, '----同步获取数据----');
						// 定义字段和它们的预期长度
						const fields = {
							filterCurrent1: 4,
							filterCurrent2: 4,
							filterCurrent3: 4,
							filterCurrent4: 4,
							filterCurrent5: 4,
							filterTotal1: 4,
							filterTotal2: 4,
							filterTotal3: 4,
							filterTotal4: 4,
							filterTotal5: 4,
						};
						// 使用Object.keys和reduce来遍历字段并拼接字符串
						let data = Object.keys(fields).reduce((acc, key) => {
							return acc + this.addLeadingZeros(res.data[key], fields[key]);
						}, '');
						data = "5AA5031a" + data + "0A0D"
						console.log(data, '------');
						this.writeIn = data
						suppliesResetByCode(e).then(suppres => {
							console.log(suppres, '---suppressuppressuppres---');
							if (suppres.code === 0) {
								console.log(suppres, '----复位----');
								this.$refs.bluet.getServiceId(this.deviceId)
								this.productDetail(this.productId)
							} else {
								setTimeout(() => {
									console.log('----复位失败----');
									uni.showToast({
										title: suppres.msg,
										icon: "none"
									})
								}, 1000)
							}
						})
					}
				})
			} else {
				suppliesResetByCode(e).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: "滤芯复位成功",
							icon: "none"
						})
						this.productDetail(this.productId)
					}
				})
			}
		},
		//复位
		async getreset(e) {
			if (this.detailDate.signaType == 3) {
				try {
					let devices = await this.adddDevice();
					if (devices.length <= 0) {
						return uni.showToast({
							title: "请先连接蓝牙",
							icon: "none"
						});
					}
					uni.navigateTo({
						url: "/subpackageA/pages/device/devicedetails/increaseDevice?id=" + e.id +
							"&productId=" +
							this.productId
					})
				} catch (err) {
					console.error('opens 函数中发生错误', err);
				}
			} else {
				uni.navigateTo({
					url: "/subpackageA/pages/device/devicedetails/increaseDevice?id=" + e.id +
						"&productId=" +
						this.productId
				})
			}
		},
		//设备id 获取信息
		async productDetail(id) {
			let res = await productDetail({
				id: id
			})
			if (res.data) {
				console.log(res, '----设备id 获取信息ID----');
				this.detailDate = res.data
			}
		},
		getscroll(item, index) {
			this.kIndex = item.value
		},
		getdevices() {
			uni.navigateBack()
		},
		handleCheckboxChange(event) {
			const checkedId = event.detail.value[0];
			this.paymentId = checkedId;
		},
		bindTimeChange(e) {
			this.time = e.detail.value
		},
		getsales() {
			uni.navigateTo({
				url: "/subpackageA/pages/device/salesService/salesService?productId=" + this.productId +
					"&detailDate=" +
					JSON.stringify(this.detailDate)
			})
		},
		//充值
		getSufficient() {
			this.$u.route({
				url: "/subpackageA/pages/device/recharge/recharge",
				params: {
					productId: this.productId
				}
			})
		},
	}
}
</script>

<style lang="scss">
.boxs {
	height: 100%;


	@keyframes real {
		0% {
			transform: translate(-50%, -60%) rotate(0deg);
		}

		100% {
			transform: translate(-50%, -60%) rotate(360deg);
		}
	}

	@keyframes virtual {
		0% {
			transform: translate(-50%, -55%) rotate(0deg);
		}

		100% {
			transform: translate(-50%, -55%) rotate(360deg);
		}
	}

	.poa {
		position: relative;
		height: 870rpx;
		padding: 0 30rpx;
		box-sizing: border-box;

		.deviceBj {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.tito {
			display: flex;
			box-sizing: border-box;
			margin-bottom: 62rpx;
			position: relative;

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

		.water-circle::after {
			//插入伪元素
			position: absolute; //伪元素定位属性
			content: '';
			background: linear-gradient((180deg, rgba(150, 225, 250, 1), rgba(37, 144, 250, 1))); //伪元素背景颜色渐变
			bottom: 0;
			right: 0;
			left: 0;
			top: 0; //定义伪元素出现的位置
			z-index: -1;
			transform: scale(1.1); //伪元素放大1.1倍
			border-radius: 50%; //伪元素也是个圆
		}

		/* 水位球样式 Create by trainer 2023/07/23 */
		.water-circle {
			position: relative;
			width: 336rpx;
			height: 336rpx;
			box-shadow: inset 0rpx 24rpx 40rpx 0rpx rgba(100, 200, 250, 0.5),
				inset 0rpx -50rpx 60rpx 0rpx rgba(5, 147, 242, 0.4),
				inset 0rpx 0rpx 20rpx 20rpx rgba(255, 255, 255, 0.5),
				0rpx 24rpx 60rpx 0rpx rgba(29, 171, 242, 0.3);
			border-radius: 50%;
			margin: 0 auto;

			.bolozhao {
				width: 460rpx;
				height: 460rpx;
				position: absolute;
				top: -12%;
				left: -20%;
			}

			.water {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #70C6F2;
				border-radius: 50%;
				overflow: hidden;
			}

			.water::after {
				content: '';
				position: absolute;
				top: 0;
				left: 50%;
				width: 150%;
				height: 150%;
				border-radius: 40%;
				background-color: #BCE5FB;
				animation: real 5s linear infinite;
			}

			/* 水位高度top: 35% ~ -65% */
			// .water::before {
			// 	content: '';
			// 	position: absolute;
			// 	top: 0;
			// 	left: 50%;
			// 	width: 150%;
			// 	height: 150%;
			// 	border-radius: 42%;
			// 	background-color: rgb(222, 237, 252);
			// 	animation: virtual 7s linear infinite;
			// }
		}

		/* 定制浮动水位样式 */
		.water-level-10::after,
		.water-level-10::before {
			top: 30%;
		}

		.filterate-number-rawWater {
			position: absolute;
			top: 50%;
			left: 50%;
			text-align: center;
			transform: translate(-50%, -50%);

			.filterate {
				font-size: 24rpx;
				color: #2590FA;
			}

			.number {
				font-weight: 600;
				font-size: 100rpx;
				color: #2590FA;
				border-bottom: 2rpx dashed #FFF;
				margin-bottom: 15rpx;
			}

			.rawWater {
				font-size: 20rpx;
				color: #FFF;
			}
		}

		.numberL {
			text-align: center;
			font-size: 28rpx;
			color: #2590FA;
			margin-top: 48rpx;
		}

		.firing-increase-recharge {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-top: 48rpx;

			.firing {
				text-align: center;

				.image {
					image {
						width: 96rpx;
						height: 96rpx;
					}
				}

				.text {
					font-size: 24rpx;
					color: #2E3033;
					margin-top: -16rpx;
				}
			}
		}

	}

	.filterelement-progressbar-text {
		margin-top: 5%;
		padding: 0 30rpx;
		box-sizing: border-box;

		::v-deep .u-line-progress {
			border-radius: 0 !important;

			.u-line-progress__background {
				border-radius: 0 !important;
			}

			.u-line-progress__line {
				border-radius: 0 !important;
			}
		}

		.filterelement:first-child {
			margin-top: 0rpx;
		}

		.filterelement {
			display: flex;
			margin-top: 32rpx;

			.name {
				font-size: 28rpx;
				color: #14171A;
				width: 17%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.progressbar-text {
				flex: 1;
				margin-top: 10rpx;

				.text-reset {
					display: flex;
					margin-top: 16rpx;

					.text {
						font-size: 20rpx;
						color: #616366;
					}


				}
			}

			.textBfb {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #14181A;
				margin-left: 24rpx;

				.reset {
					margin-top: 8rpx;
					width: 80rpx;
					height: 36rpx;
					background: #1DABF2;
					border-radius: 4rpx 4rpx 4rpx 4rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}

	.Bluetooth {
		width: 616rpx;
		min-height: 404rpx;
		background: #F5F7F7;
		border-radius: 32rpx;
		padding: 48rpx;
		box-sizing: border-box;
	}

	.remoteBoot {
		width: 616rpx;
		height: 404rpx;
		background: #FFFFFF;
		border-radius: 32rpx;
		padding: 48rpx;
		box-sizing: border-box;

		.text-icon {
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				font-weight: 600;
				font-size: 32rpx;
				color: #14171A;
			}

			.icon {}
		}

		.mode-text {
			margin-top: 64rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;



			.text {
				width: 152rpx;
				height: 72rpx;
				background: #F4F5F6;
				border-radius: 8rpx;
				line-height: 72rpx;
				text-align: center;
				font-size: 28rpx;
				color: #2E3033;
			}

			.texts {
				width: 152rpx;
				height: 72rpx;
				background: #E1EDFA;
				border-radius: 8rpx;
				border: 2rpx solid #2590FA;
				line-height: 72rpx;
				text-align: center;
				font-size: 28rpx;
				color: #2590FA;
			}
		}

		.refuse-open {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 48rpx;

			.refuse {
				width: 216rpx;
				height: 72rpx;
				border-radius: 100rpx 100rpx 100rpx 100rpx;
				border: 2rpx solid #2590FA;

				line-height: 72rpx;
				text-align: center;
			}

			.open {
				background-color: #2590FA;
				color: #FFF;
			}
		}
	}

	.checkboxGroup {
		margin-left: 62rpx;
		margin-top: 50rpx;

		::v-deep .checklist-group {
			// grid-gap: 60rpx;
			justify-content: space-between;
		}
	}
}
</style>