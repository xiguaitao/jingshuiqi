<template>
	<view class="box">

		<!-- <tito title="添加设备" lefticon="left" @clickLeft="clickLeft" /> -->
		<view class="increase" v-if="scanBlueList.length <= 0">
			<view class="image-text">
				<view class="image-guang">
					<image class="image" src="../../../static/shousuoshebei.png" mode=""></image>
					<image class="guang" src="../../../static/guang.png" mode=""></image>
				</view>
				<view class="text" @click="connection">
					正在搜索附近的设备…
				</view>
				<view class="texts">
					请打开WiFi和蓝牙，尽可能靠近想连接的设备
				</view>
			</view>
		</view>
		<view class="device" v-else>
			<view class="picture" v-for="(item, index) in scanBlueList" :key="index">
				<view class="picture-content">
					<image class="picture-img" :src="loaderImage" mode="aspectFit|aspectFill|widthFix" />
				</view>
				<view class="name-text">
					<view>{{ item.name }}</view>
					<view class="id-text">已断开</view>
				</view>
				<!-- <view class="icon" @click="connect(item)" :class="{ 'break': true }">
					连接
				</view> -->
			</view>
		</view>
		<uni-popup :is-mask-click="false" ref="bluetooth" type="center" border-radius="10px 10px 0 0">
			<view class="openBluetooth">
				<image v-if="showLoader" class="img" src="../../../static/jiazai.png" mode=""></image>
				<image v-else class="imgs" :src="loaderImage" mode=""></image>
				<view class="text">
					{{ wait }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {
	setTimeout
} from 'timers';
export default {
	data() {
		return {
			wait: "正在添加设备，请稍后..",
			searchfor: true,
			showLoader: true, // 控制加载图片和动画显示与隐藏
			isScanning: false, // 是否正在扫描蓝牙设备
			loaderImage: require('../../../static/kaiqilanya.png'),
			scanBlueList: [],
			buffer: '', // 缓冲区，用于存储已接收到的数据片段
			systemType: '',
			arrayMac: "", //mac地址
			deviceID: null, //设备id
			deviceId: "", //设备id
			serviceId: "", //服务id
			characteristicId: "", //蓝牙特征值的 uuid
			executionCount: 0, //得到蓝牙给的数据后，第二次获取到数据就调用同步接口
		};
	},
	props: {
		//写入的信息
		writeIn: {
			type: String,
			default: "5AA501060A0D"
		},
		isShowBlue: {
			type: Boolean,
			default: false
		}
	},

	watch: {
		isShowBlue(newVal, oldVal) {
			console.log(newVal)
			if (newVal && this.scanBlueList.length == 0) {

				this.adddDevice()
			}
		}
	},
	created() {
		uni.getSystemInfo({
			success: (res) => {
				this.systemType = res.osName
			}
		});
	},
	mounted() {
		
		
		
	},
	onUnload() {
		console.log("1111222333");
		this.stopScan()
	},
	methods: {
		connection() {
			this.$emit("connection")
		},
		//初始化蓝牙
		adddDevice() {
			//初始化蓝牙模块
			uni.openBluetoothAdapter({
				success: (res) => {
					console.log('初始化蓝牙');
					this.startScan()
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
				}
			})
		},

		// 开始搜索设备
		startScan() {
			if (this.isScanning) {
				return;
			}
			console.log('我进来了');
			this.isScanning = true;
			// 开始搜索蓝牙设备
			uni.startBluetoothDevicesDiscovery({
				// services: ['0000ff'],
				allowDuplicatesKey: false,
				success: (res) => {
					console.log(res, 'res111')
					// 监听搜索到新设备的事件
					uni.onBluetoothDeviceFound((resFound) => {
						console.log(resFound, 'resFound')
						// 创建一个Set来存储不重复的设备名
						const uniqueNames = new Set(this.scanBlueList.map(device => device.name));
						// 将设备加入设备列表，根据名称进行过滤，确保名称不重复
						if (resFound.devices) {
							resFound.devices.forEach((item, index) => {
								if (item.name && item.name.startsWith('BLE') && !uniqueNames.has(item.name)) {
									// 如果设备名不存在于Set中，添加到列表和Set
									uniqueNames.add(item.name);
									this.scanBlueList.push(item);
								}
							});
						}
						if (this.scanBlueList.length == 1) {
							this.stopScan()
							this.connect(this.scanBlueList[0])
						}
						console.log(this.scanBlueList, '设备列表');
					});
				},
				fail: (err) => {
					console.log(err, '---------');
				},
				// complete: () => {
				// 	setTimeout(() => {
				// 		this.isScanning = false;
				// 		this.stopScan()
				// 	}, 30000)
				// }
			});
		},
		// 停止搜索
		stopScan() {
			uni.stopBluetoothDevicesDiscovery({
				success: (res) => { },
				fail: (res) => { }
			});
		},
		// 关闭蓝牙
		clooseBlue() {
			uni.closeBluetoothAdapter({ // 关闭蓝牙
				success: (res) => { },
				fail: (err) => { }
			});
		},
		//断开蓝牙
		closeBLEConnection() {
			if (this.deviceId) {
				uni.closeBLEConnection({
					deviceId: this.deviceId,
					success(res) {
						console.log(res)
					}
				})
			}
		},
		//连接蓝牙
		connect(item) {
			this.deviceId = item.deviceId

			if (this.systemType == 'ios') {
				//苹果端 解析mac地址
				let arrayBuff = Array.prototype.map.call(new Uint8Array(item.advertisData), x => ('00' + x.toString(
					16)).slice(-2))
					.join(':');
				this.arrayMac = arrayBuff.toUpperCase();
				console.log(this.arrayMac, 'this.arrayMac');
			}
			this.showLoader = true; // 加载图片和动画
			this.wait = "正在连接设备，请稍后..！"
			this.$refs.bluetooth.open('center')
			uni.createBLEConnection({
				deviceId: item.deviceId,
				success: (res) => {
					console.log(res, '连接');
					if (res.errCode == 0) {
						this.showLoader = false; // 隐藏加载图片和动画
						setTimeout(() => {
							this.getServiceId(item.deviceId) //获取服务ID
							this.wait = "连接设备成功！"
							uni.setStorageSync("deviceId", item.deviceId)
							this.$emit("connection", item.deviceId)
							//连接成功操作
						}, 2000)
					}
				},
				fail: (err) => {
					// console.log('连接失败', err);
					// 开始搜索设备
					this.startScan()
					uni.showToast({
						title: "请连接相关设备!!",
						icon: "none"
					})
				},
				complete: () => {
					this.$refs.bluetooth.close()
				},
			})
		},
		//获取服务ID
		getServiceId(deviceId) {
			uni.getBLEDeviceServices({
				deviceId: deviceId,
				success: (res) => {
					console.log("获取服务Id", res);
					let foundService = false;
					res.services.forEach((uuidItem, uuidIndex) => {
						if (uuidItem.uuid == "0000FFF0-0000-1000-8000-00805F9B34FB") {
							this.serviceId = uuidItem.uuid;
							foundService = true;
						}
					});
					// 如果找到了服务ID，则继续执行
					if (foundService) {
						this.getCharacteId(deviceId, this.serviceId);

					} else {
						console.log("没有找到设备相关的服务id，停止执行");
						this.$emit("characteId")
						// 开始搜索设备
						this.startScan()
						uni.showToast({
							title: "请连接相关设备!!",
							icon: "none"
						})

					}
				},
				fail(err) {
					console.log('获取服务失败', err);
				}
			})
		},
		//获取蓝牙低功耗设备某个服务中所有特征
		getCharacteId(deviceId, serviceId) {
			uni.getBLEDeviceCharacteristics({
				deviceId: deviceId, // 蓝牙设备id
				serviceId: serviceId, // 蓝牙服务UUID
				success: (res) => {
					console.log('数据监听', res);
					if (res.errCode == 0) {
						res.characteristics.forEach(item => {
							if (item.properties.write === true && item.properties.notify ===
								true) {
								console.log('这是符合的特征', item.uuid);
								// 监听特征值变化（设备数据变化）
								this.characteristicId = item.uuid
								this.notifyBLECharacteristicValueChange(deviceId, serviceId, item
									.uuid, this.writeIn)
							}
						});
					}
				},
				fail(err) {
					console.log("数据监听失败", err)
				}
			})
		},

		ArrayBuffer(hexString) {
			// 计算需要多少字节
			const byteLength = hexString.length / 2;
			// 创建ArrayBuffer
			const buffer = new ArrayBuffer(byteLength);
			// 创建DataView
			const dataView = new DataView(buffer);
			// 将十六进制字符串转换为字节并写入DataView 
			for (let i = 0; i < byteLength; i++) {
				const byte = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
				dataView.setUint8(i, byte);
			}
			return buffer;
		},

		// 向蓝牙写入通知消息
		bluetoothWriting(deviceId, serviceId, characteristicID, writeIn) {
			console.log(writeIn, 'this.writeIn');
			const maxChunkSize = 20; // 每批最大的字节数
			let offset = 0;
			let chunk;
			// 检查是否超过20个字节
			if (writeIn.length > maxChunkSize * 2) {
				// 如果超过，则分批处理
				while (offset < writeIn.length) {
					// 获取当前分片
					chunk = writeIn.substring(offset, Math.min(offset + maxChunkSize * 2, writeIn.length));
					// 发送当前分片
					this.sendChunk(deviceId, serviceId, characteristicID, chunk);
					// 移动到下一个分片
					offset += maxChunkSize * 2;
				}
			} else {
				// 如果没有超过，直接发送
				this.sendChunk(deviceId, serviceId, characteristicID, writeIn);
			}
		},

		// 发送单个分片的函数
		sendChunk(deviceId, serviceId, characteristicID, chunk) {
			const buffer = this.ArrayBuffer(chunk);
			console.log(buffer, 'buffer');
			uni.writeBLECharacteristicValue({
				deviceId: deviceId,
				serviceId: serviceId,
				characteristicId: characteristicID,
				value: buffer,
				success: res => {
					console.log(res, '向蓝牙写入通知消息');
					// 监听低功耗蓝牙设备的特征值变化事件
					this.onBLECharacteristicValueChange();
				},
				fail: err => {
					console.log("向蓝牙写入通知消息失败", err);
				}
			});
		},
		// 监听特征值变化（设备数据变化）
		notifyBLECharacteristicValueChange(deviceId, serviceID, characteristicID, writeIn) {
			uni.notifyBLECharacteristicValueChange({
				deviceId: deviceId,
				serviceId: serviceID,
				characteristicId: characteristicID,
				state: true,
				success: res => {
					console.log(res, '设备数据变化');
					// 写入
					this.bluetoothWriting(deviceId, serviceID, characteristicID, writeIn);
					uni.onBLEConnectionStateChange((res) => {
						// 该方法回调中可以用于处理连接意外断开等异常情况
						if (res.connected) {
							console.log("连接  该方法回调中可以用于处理连接意外断开等异常情况", res.connected);
						} else {
							console.log("断开  该方法回调中可以用于处理连接意外断开等异常情况", res.connected);
							uni.removeStorageSync("deviceId")
						}
					})
				},
				fail(err) {
					console.log("监听特征值变化失败", err)
				}
			})
		},
		// 监听低功耗蓝牙设备的特征值变化事件
		onBLECharacteristicValueChange() {
			uni.onBLECharacteristicValueChange(res => {
				this.buffer += this.ab2hex(res.value);
				// 如果是安卓设备且缓冲区中的数据以结束标识符结尾
				if (this.systemType == 'android' && this.buffer.endsWith("0d")) {
					// 进行处理
					this.resolvingData(this.buffer);
					// 处理完后清空缓冲区
					this.buffer = '';
				} else if (this.systemType == 'ios') {

					// 如果是苹果设备，直接处理缓冲区中的数据
					this.resolvingData(this.buffer);
					// 处理完后清空缓冲区
					this.buffer = '';
				}
			})
		},
		// ArrayBuffer转16进制字符串
		ab2hex(buffer, split = '') {
			var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
				return ('00' + bit.toString(16)).slice(-2)
			})
			return hexArr.join(split)
		},
		resolvingData(res) {
			console.log(res, '解析数据解析res res数据解析数据');
			// 解析数据 
			if (res.length >= 50) {
				const parsedData = this.parseBinaryData(res);
				// console.log(parsedData, '解析数据');
				// 增加执行次数
				this.executionCount++;

				// 只在第二次执行时调用 this.aaa()
				if (this.executionCount === 2) {
					this.$emit("writeSynchronization", parsedData)
				}
			}
		},
		// 这个方法是  解析设备发送给我的数据  这里是同步
		parseBinaryData(data) {
			// 将16进制字符串转换为ASCII字符  mac地址解析
			function hexToAscii(hexString) {
				let asciiString = '';
				for (let i = 0; i < hexString.length; i += 2) {
					asciiString += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
				}
				return asciiString;
			}

			// 解析设备  状态  报警
			function parseAlarm(hexString, statusMap) {
				// 确保十六进制字符串的长度是偶数
				if (hexString.length % 2 !== 0) {
					throw new Error('Invalid hexString');
				}
				// 创建一个Buffer对象，使用十六进制字符串作为参数
				const buffer = Buffer.from(hexString, 'hex');
				// 将Buffer对象转换为字节数组
				const byteArray = Array.from(buffer);
				// return statusMap[byteArray.length]; //返回文字
				return byteArray.length; //返回数字
			}
			//mac地址翻转解析
			function reverseMac(mac) {
				// 将MAC地址分割成每两个字符一组
				var groups = mac.match(/.{1,2}/g);
				// 翻转每一组
				var reversedGroups = groups.reverse();
				// 将翻转后的组重新组合成字符串，并在组之间加上冒号
				var reversedMac = reversedGroups.join(':');
				return reversedMac;
			}

			// 提取各个部分
			let infoHeader1 = data.substring(0, 2);
			let infoHeader2 = data.substring(2, 4);
			let command = data.substring(4, 6);
			let messageLength = data.substring(6, 8);
			let deviceNumber = data.substring(8, 16);
			let macHex = data.substring(16, 40);
			let statusHex = data.substring(40, 44);
			let alarmHex = data.substring(44, 46);
			let endMarker1 = data.substring(46, 48);
			let endMarker2 = data.substring(48, 50);
			let statusMap = {
				0: "待激活",
				1: "欠费",
				2: "故障",
				3: "关机",
				4: "缺水",
				5: "锁机",
				6: "水满",
			};
			let alarmMap = {
				0: "漏水",
				1: "超时",
				2: "缺水",
				3: "TDS报警",
			};
			// mac地址
			let macAddress = hexToAscii(macHex);
			//设备类型
			let deviceStatus = parseAlarm(statusHex, statusMap);
			//设备报警
			let alarmStatus = parseAlarm(alarmHex, alarmMap);
			macAddress = reverseMac(macAddress);
			// 返回结果
			return {
				infoHeader1: infoHeader1,
				infoHeader2: infoHeader2,
				command: command,
				messageLength: messageLength,
				deviceNumber: deviceNumber,
				macAddress: macAddress,
				devStatus: deviceStatus,
				faultStatus: alarmStatus,
				endMarker1: endMarker1,
				endMarker2: endMarker2
			};
		}
	},
}
</script>

<style lang="scss">
.box {
	height: 100%;
	background-color: #F5F7F7;

	.image-text {
		text-align: center;

		.image-guang {
			position: relative;
			width: 320rpx;
			height: 320rpx;
			margin: 0 auto;

			.image {
				width: 320rpx;
				height: 320rpx;

			}

			.guang {
				width: 120rpx;
				height: 120rpx;
				position: absolute;
				top: 40rpx;
				right: 40rpx;
				transform-origin: bottom left;
				animation: rotate 2s linear infinite;
			}
		}


		.text {
			font-size: 28rpx;
			color: #141A18;
			margin-top: 96rpx;
		}

		.texts {
			font-size: 24rpx;
			color: #646665;
			margin-top: 32rpx;
		}
	}

	.device {

		.picture {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;

			.picture-content {
				width: 80rpx;
				height: 80rpx;

				.picture-img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.name-text {
				margin-left: 30rpx;
				font-size: 28rpx;
				color: #333333;
				flex: 1;

				.id-text {
					margin-top: 10rpx;
					color: #F5504A;
					font-size: 20rpx;
				}
			}

			.icon {
				width: 176rpx;
				height: 56rpx;
				font-size: 28rpx;
				border-radius: 100rpx 100rpx 100rpx 100rpx;
				margin-left: auto;
				color: #FFF;
				background: #373838;
				text-align: center;
				line-height: 56rpx;
			}

			.break {
				background-color: #FFF;
				color: black;
				border: 2rpx solid black;
			}
		}

	}

	.openBluetooth {
		width: 560rpx;
		height: 144rpx;
		background: linear-gradient(180deg, #DAF2EA 0%, rgba(36, 178, 136, 0) 40%), #FFFFFF;
		border-radius: 32rpx 32rpx 32rpx 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			width: 48rpx;
			height: 48rpx;
			margin-right: 22rpx;
			animation: rotateImage 2s linear infinite;
		}

		.imgs {
			width: 48rpx;
			height: 48rpx;
			margin-right: 22rpx;
		}

		.text {
			font-size: 28rpx;
		}
	}

}

/* 图片旋转 */
@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes rotateImage {
	from {
		transform: rotate(0deg)
	}

	to {
		transform: rotate(360deg)
	}
}
</style>