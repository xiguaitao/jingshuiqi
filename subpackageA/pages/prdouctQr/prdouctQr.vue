<template>
	<view class='enrollment'>

		<view class="content">
			<view class="form">
				<u--form labelPosition="left" :model="inputData" :rules="rules" ref="corporationsData" labelWidth="90"
					:labelStyle="{ fontSize: '28rpx' }">

					<view class="tipView">
						<view>请使用安卓手机扫描蓝牙, 并确保打印机在线</view>
					</view>
					<u-form-item prop="macId" label="蓝牙MAC">
						<view style="background: #F3F5F6;border-radius: 12rpx;">
							<u-input placeholder="请输入蓝牙MAC" border="surround" v-model="inputData.macId">
								<template slot="suffix">
									<view class="suffix">
										<u-button @tap.stop="getMac" :text="tips" type="primary"
											size="mini">扫描蓝牙</u-button>
									</view>
								</template>
							</u-input>
						</view>
					</u-form-item>
				</u--form>
			</view>

		</view>

		<uni-popup ref="popup" type="center">
			<view class="popup-content">
				<view v-for="device in devices" :key="device.deviceId" @click="connectDevice(device)"
					class="deviceList">
					<view class="deviceName">设备名: {{ device.name }} </view>
					<view class="deviceId">设备id:{{ device.deviceId }}</view>

				</view>
			</view>
		</uni-popup>
		<view class="bottom-btn">
			<view class="btn">
				<view v-if="!loading" @click="submit">打印二维码</view>
				<view v-else>提交中...</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>


	</view>
</template>

<script>
import { printerQrCode } from "@/api/api.js";

export default {

	data() {
		return {
			inputData: {
				macId: ''

			},
			rules: {
				'macId': {
					type: 'string',
					required: true,
					message: '蓝牙Mac地址不能为空',
					trigger: ['blur', 'change']
				},

			},
			devices: [


			], // 用于存储扫描到的设备信息
			connectedDeviceId: '', // 存储已连接设备的ID
			show: false,
			systemType: '',
			loading: false,
		}
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				this.systemType = res.osName
			}
		});

	},
	onUnload() {
		uni.stopBluetoothDevicesDiscovery({
			success: (res) => {
			}
		});
		uni.closeBluetoothAdapter({
			success: (res) => {
			}
		});
	},
	methods: {
		submit() {
			this.$refs["corporationsData"].validate().then(res => {
				this.loading = true;
				const data = {
					mac: this.inputData.macId
				}
				printerQrCode(data).then(res => {
					if (res.code == 0) {
						uni.$u.toast('生成二维码成功')
						this.inputData.macId = ''
						this.loading = false;
					} else {

						uni.$u.toast(res.msg)

						this.loading = false;
					}


				}).catch(err => {

					this.loading = false;

				})
			}).catch(errors => {
				this.loading = false;
				uni.$u.toast('校验失败')
			})
		},
		getMac() {
			if (this.systemType == 'ios') {
				uni.$u.toast('请使用安卓手机来扫描蓝牙设备')
				return
			}

			this.openBluetooth()
		},
		openBluetooth() {
			// 初始化蓝牙模块
			uni.openBluetoothAdapter({
				success: (res) => {
					this.$refs.popup.open('center')
					this.startDiscovery();
				},
				fail: (err) => {
					// 处理初始化失败的情况
					uni.showToast({
						title: '请打开蓝牙',
						icon: 'none'
					});
					this.$refs.popup.close()

				}
			});
		},
		startDiscovery() {
			// 开始扫描附近的蓝牙设备
			uni.startBluetoothDevicesDiscovery({
				success: (res) => {
					// 监听找到新设备的事件
					uni.onBluetoothDeviceFound((res) => {
						// 创建一个Set来存储不重复的设备名
						const uniqueNames = new Set(this.devices.map(device => device.deviceId));
						// 将设备加入设备列表，根据名称进行过滤，确保名称不重复
						if (res.devices) {
							res.devices.forEach((item, index) => {
								if (item.name && !uniqueNames.has(item.name)) {
									// 如果设备名不存在于Set中，添加到列表和Set
									uniqueNames.add(item.deviceId);
									this.devices.push(item);
								}
							});
						}
					});
				},
				fail: (err) => {
					// 处理扫描失败的情况
					uni.showToast({
						title: '扫描蓝牙设备失败',
						icon: 'none'
					});
				}
			});
		},
		connectDevice(item) {
			this.inputData.macId = item.deviceId;
			this.$refs.popup.close()
			uni.stopBluetoothDevicesDiscovery({
				success: (res) => {
				}
			});
			// 连接到蓝牙设备
			// uni.createBLEConnection({
			// 	deviceId: device.deviceId,
			// 	success: (res) => {
			// 		this.connectedDeviceId = device.deviceId;
			// 		this.getDeviceMac(device);
			// 	},
			// 	fail: (err) => {
			// 		// 处理连接失败的情况
			// 		uni.showToast({
			// 			title: '连接设备失败',
			// 			icon: 'none'
			// 		});
			// 	}
			// });
		},
		// getDeviceMac(device) {
		// 	this.inputData.deviceId = device.deviceId;
		// 	if (this.systemType == 'ios') {
		// 		//苹果端 解析mac地址
		// 		let arrayBuff = Array.prototype.map.call(new Uint8Array(item.advertisData), x => ('00' + x.toString(
		// 			16)).slice(-2))
		// 			.join(':');
		// 		this.inputData.deviceId = arrayBuff.toUpperCase();
		// 	} else {
		// 		this.inputData.deviceId = device.deviceId;
		// 	}

		// }
	},

}

</script>

<style lang="scss">
.enrollment {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #EFF2F4;


	.content {
		// flex: 1;
		overflow: auto;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		margin: 32rpx;

		.button {
			height: 24px;
			font-size: 28rpx;
		}

		.form {
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 24rpx;



		}


	}

	.tipView {
		margin-bottom: 10rpx;
		font-size: 24rpx;
		color: grey;
	}

	.checkbox {
		margin: 32rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;

		text {
			color: #23ADF2;
		}
	}

	.bottom-btn {
		background: #fff;
		margin-top: auto;

		.btn {
			padding: 24rpx 30rpx;
			box-sizing: border-box;

			view {
				height: 88rpx;
				background: #2590FA;
				border-radius: 8rpx;
				display: grid;
				place-content: center;
				color: #fff;
			}
		}
	}
}

.popup-content {
	padding: 32rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
	border-radius: 24rpx;
	width: 80vw;
	height: 75vh;
	overflow: auto;

	.deviceList {
		display: flex;
		flex-direction: column;
		padding: 32rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #eee;

		.deviceName {
			font-size: 32rpx;

		}

		.deviceId {
			margin-top: 16rpx;
			font-size: 24rpx;
		}

		&:last-child {

			border-bottom: none;
		}
	}
}
</style>
