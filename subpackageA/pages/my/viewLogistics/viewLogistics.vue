<template>
	<view class="box">
		<u-navbar :leftIconShow="true" title="物流进度" :autoBack="true" bgColor="transparent">

		</u-navbar>
		<map style="width: 100%; min-height: 80vh;" :latitude="latitude" :longitude="longitude" :polyline="polyline"
			:markers="markers" :include-points="includePoints">
			<cover-view slot="callout">
				<cover-view marker-id="1" class="dian">
					<cover-view class="shou">发</cover-view>
					<cover-view class="text">起点</cover-view>
				</cover-view>
				<cover-view marker-id="2" class="dian">
					<cover-view class="shou">收</cover-view>
					<cover-view class="text">{{ trackQuery.provinceName }}</cover-view>
				</cover-view>
			</cover-view>
		</map>
		<!-- <ww-bottom-drawerapp :proportionShow='proportionvc' :dragHandleHeight="handleHeight">
			<slot>
			
			</slot>
		</ww-bottom-drawerapp> -->
		<!--填入你的抽屉View-->
		<view class="drawer">
			<view class="image-text-cop">
				<view class="image">
					<!-- <image src="../../static/zhifubao.png" mode=""></image> -->
				</view>
				<view class="text">
					<text>{{ trackQuery.logisticsCompany }}:</text> {{ trackQuery.trackingNumber }}
				</view>
				<view class="cop" @click="getcop(trackQuery.trackingNumber)">
					复制
				</view>
			</view>
			<view class="image-text-cop arddss">
				<view class="image">
					<!-- <image src="../../static/dingwei.png" mode=""></image> -->
				</view>
				<view class="text-number">
					<view class="texts">
						订单编号:{{ trackQuery.code }}
						<view class="cop" @click="getcop(trackQuery.code)">
							复制
						</view>
					</view>
					<view class="number">
						<view :class="expands ? 'address' : 'addresss'">
							收货地址:{{ trackQuery.provinceName }} {{ trackQuery.cityName }} {{ trackQuery.areaName }}
							{{ trackQuery.address }}
						</view>
						<view class="copoff" @click="expand" v-if="expands">
							展开
							<uni-icons type="down" size="18" color="#B1B2B2"></uni-icons>
						</view>
					</view>
				</view>

			</view>
			<view class="steps">
				<uni-steps :options="orderTraces.Traces" active-color="#007AFF" :active="orderTraces.State"
					direction="column" />
				<u-safe-bottom></u-safe-bottom>
			</view>
		</view>
	</view>
</template>

<script>

import amapFile from '@/api/amap-wx.130.js'
export default {
	data() {
		return {
			expands: true,
			proportionvc: 0.25,
			handleHeight: 20,
			active: 0,
			id: "", //订单id
			longitude: "", // 經度
			latitude: "", // 緯度
			// 地图标记点
			markers: [{
				id: 1,
				// iconPath: '../../../../static/image/Frame.png',
				longitude: 116.481028,
				latitude: 39.989643,
				width: 32,
				height: 32,
				customCallout: {
					// anchorY: 70,
					// anchorX: 0,
					display: 'ALWAYS',
				}
			},
			{
				id: 2,
				// iconPath: '../../../../static/image/Frame.png',
				longitude: 114.13166,
				latitude: 22.34221,
				width: 32,
				height: 32,
				customCallout: {
					// anchorY: 70,
					// anchorX: 0,
					display: 'ALWAYS',
				}
			}
			],
			polyline: [], // 途径点
			//缩放视野以包含所有给定的坐标点
			includePoints: [{
				longitude: "",
				latitude: "",
			},
			{
				longitude: "",
				latitude: "",
			}
			],
			trackQuery: {}, //物流信息
			mapCtx: null,
			orderTraces: {
				// "EBusinessID": "1237100",
				// "ShipperCode": "YD",
				// "Success": true,
				// "LogisticCode": "390141793061",
				// "State": "3",
				// "StateEx": "304",
				// "Location": "威海市",
				// "Traces": [{
				// 	"desc": "2016-10-26 18:31:38",
				// 	"title": "【北京环铁站】的【互优图书】已收件",
				// 	"Location": "北京市",
				// 	"Action": "1"
				// },
				// {
				// 	"desc": "2016-10-26 19:53:50",
				// 	"title": "快件在【北京环铁站】装车,正发往【北京分拨中心】",
				// 	"Location": "北京市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-26 21:00:13",
				// 	"title": "快件到达【北京分拨中心】,上一站是【北京环铁站】",
				// 	"Location": "北京市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-26 21:06:27",
				// 	"title": "快件在【北京分拨中心】装车,正发往【青州分拨中心】",
				// 	"Location": "北京市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-27 11:04:43",
				// 	"title": "快件到达【北京分拨中心】,上一站是【】",
				// 	"Location": "北京市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-27 13:04:43",
				// 	"title": "快件在【北京分拨中心】装车,正发往【青州分拨中心】",
				// 	"Location": "北京市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-27 20:06:03",
				// 	"title": "快件到达【青州分拨中心】,上一站是【】",
				// 	"Location": "潍坊市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-27 22:06:03",
				// 	"title": "快件在【青州分拨中心】装车,正发往【威海】",
				// 	"Location": "潍坊市",
				// 	"Action": "2"
				// },
				// {
				// 	"desc": "2016-10-28 09:53:53",
				// 	"title": "快件到达【威海】,上一站是【青州分拨中心】",
				// 	"Location": "威海市",
				// 	"Action": "2"
				// },
				// ]
			},
		};
	},
	onLoad(ope) {
		if (ope.id) {
			this.id = ope.id
			this.getTrackQuery()
		}
		// this.getLocation()
	},
	onReady(event) { },
	methods: {
		//复制
		getcop(e) {
			uni.setClipboardData({
				data: e,
				success(res) {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
					})
				},
			})
		},
		//获取物流信息
		async getTrackQuery() {
			let res = await this.$request.get("/water-platform-app-api/shop/goodsOrder/trackQuery", {
				id: this.id
			})
			if (res.data) {
				console.log(res.data);
				this.trackQuery = res.data
				// this.orderTraces = JSON.parse(res.data.orderTraces)
				// console.log(this.orderTraces);
				this.orderTraces = JSON.parse(res.data.orderTraces)
				this.orderTraces.Traces = JSON.parse(res.data.orderTraces).Traces.map(item => ({
					...item,
					desc: item.AcceptTime,
					title: item.AcceptStation,
				}))
				this.longitude = res.data.startLng
				this.latitude = res.data.startLat
				this.markers[0].longitude = res.data.startLng
				this.markers[0].latitude = res.data.startLat
				this.markers[1].longitude = res.data.endLng
				this.markers[1].latitude = res.data.endLat
				this.includePoints[0].longitude = res.data.startLng
				this.includePoints[0].latitude = res.data.startLat
				this.includePoints[1].longitude = res.data.endLng
				this.includePoints[1].latitude = res.data.endLat
				this.setAddress(res.data) // 當前經緯度設為起點
			}
		},
		//获取当前位置
		getLocation() {
			// 獲取當前位置
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					this.longitude = res.longitude // 當前經度
					this.latitude = res.latitude // 當前緯度
					this.markers[0].longitude = res.longitude
					this.markers[0].latitude = res.latitude
					this.includePoints[0].longitude = res.longitude
					this.includePoints[0].latitude = res.latitude
					const longitude = `${res.longitude},${res.latitude}` // 起點
					this.setAddress(longitude) // 當前經緯度設為起點
				},
				fail: err => { }
			})
		},
		setAddress(e) {
			const myAmapFun = new amapFile.AMapWX({
				key: '395ce53cef247073428e8edfe5557b69' // 高德key
			})
			myAmapFun.getDrivingRoute({
				origin: `${e.startLng},${e.startLat}`, // 起點
				destination: `${e.endLng},${e.endLat}`, // 終點
				success: data => {
					const points = []
					if (data.paths && data.paths[0] && data.paths[0].steps) {
						const steps = data.paths[0].steps // 獲取途徑點
						steps.forEach(item => {
							const poLen = item.polyline.split(';') // 對每一組途徑點的經緯度進行分割
							poLen.forEach(data => {
								points.push({
									longitude: parseFloat(data.split(',')[0]),
									latitude: parseFloat(data.split(',')[1])
								})
							})
						})
					}
					// 绑定路线
					this.polyline = [{
						points: points,
						color: '#ff00f0',
						width: 3
					}]
					console.log(points, '-----------');
				}
			})
		},
		//展开
		expand() {
			this.expands = false
		},
	}
}
</script>

<style lang="scss">
.dian {
	width: 132rpx;
	height: 52rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(76, 76, 77, 0.2);
	font-size: 24rpx;
	color: #2E3033;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.shou {
		width: 44rpx;
		height: 52rpx;
		background: #2590FA;
		color: #FFFFFF;
		text-align: center;
		line-height: 52rpx;
	}

	.text {
		width: 88rpx;
		height: 52rpx;
		text-align: center;
		line-height: 52rpx;
	}
}

.box {
	min-height: 100vh;
}

.drawer {
	height: 20vh;
	padding: 32rpx;
	box-sizing: border-box;

	.image-text-cop {
		display: flex;
		align-items: center;

		.image {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 4rpx;
				vertical-align: middle;
			}
		}

		.text {
			margin-left: 24rpx;
			font-size: 28rpx;
			color: #2E3033;

			text {
				color: #2590FA;
			}
		}

		.cop {
			width: 72rpx;
			height: 36rpx;
			background: #F4F5F6;
			border-radius: 100rpx 100rpx 100rpx 100rpx;
			font-size: 20rpx;
			color: #2E3033;
			text-align: center;
			line-height: 36rpx;
			margin-left: auto;
		}
	}

	.arddss {
		margin-top: 48rpx;

		.image {
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.text-number {
			margin-left: 24rpx;
			flex: 1;

			.texts {
				font-size: 28rpx;
				color: #2E3033;
				display: flex;

				.cop {
					width: 72rpx;
					height: 36rpx;
					background: #F4F5F6;
					border-radius: 100rpx 100rpx 100rpx 100rpx;
					font-size: 20rpx;
					color: #2E3033;
					text-align: center;
					line-height: 36rpx;
					margin-left: auto;
				}
			}

			.number {
				font-size: 28rpx;
				color: #2E3033;
				margin-top: 8rpx;
				display: flex;

				.address {
					width: 530rpx;
					flex: 1;
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
					white-space: nowrap; //溢出不换行
				}

				.addresss {
					width: 530rpx;
					flex: 1;
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
				}

				.copoff {
					display: flex;
					align-items: center;
					font-size: 28rpx;
				}
			}
		}
	}

	.steps {
		margin-top: 48rpx;

		::v-deep .uni-steps__column-title {
			font-size: 28rpx !important;
		}

		::v-deep .uni-steps__column-desc {
			margin-top: 8rpx;
		}
	}
}
</style>