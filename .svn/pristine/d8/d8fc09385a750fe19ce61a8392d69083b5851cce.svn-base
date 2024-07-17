<template>
	<view class="contenList">
		<tito title="我的售后" :leftIconShow="true"></tito>
		<view class="conten">
			<view class="text-number">
				<view class="text">
					设备编号
				</view>
				<view class="number">
					{{aftersalesDate.productCode}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					售后类型
				</view>
				<view class="number">
					{{withdeawalData[aftersalesDate.type - 1]}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					维修地址
				</view>
				<view class="number">
					{{aftersalesDate.provinceName + '-' + aftersalesDate.cityName + '-' + aftersalesDate.areaName + '-' +  aftersalesDate.address }}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					现场图片
				</view>
				<view class="number">
					<view class="number-image" v-if="aftersalesDate.logos">
						<view class="image" v-for="(item,index) in aftersalesDate.logos.split(',')" :key="index">
							<u--image :showLoading="true" :src="item" width="152rpx" height="152rpx"
								@click="clickImage(aftersalesDate.logos.split(','),index)"></u--image>
						</view>
					</view>
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					详细描述
				</view>
				<view class="number">
					{{aftersalesDate.remark}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					创建时间
				</view>
				<view class="number">
					{{aftersalesDate.createTime}}
				</view>
			</view>
			<view class="text-number">
				<view class="text">
					售后状态
				</view>
				<view class="number">
					{{status[aftersalesDate.status - 1]}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		aftersalesSingle
	} from "@/api/api.js"
	export default {
		data() {
			return {
				withdeawalData: [
					"水机安装",
					"滤芯更换",
					"故障报修",
					"其他",
				],
				status: [
					"未开始",
					"派发",
					"拒绝",
					"接单",
					"服务",
					"完成",
					"评价",
				],
				images: [{
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				}],
				aftersalesDate: {},
			};
		},
		onLoad(ope) {
			if (ope.id) {
				this.single(ope.id)
			}
		},
		methods: {
			//预览图片
			clickImage(e, inx) {
				uni.previewImage({
					urls: e,
					current: inx,
					loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//售后详情
			async single(e) {
				let res = await aftersalesSingle({
					id: e
				})
				if (res.data) {
					console.log(res, '----售后列表----');
					this.aftersalesDate = res.data
				}
			},
		},
	};
</script>
<style lang="scss">
	.contenList {
		height: 100%;
		background-color: #F0F3F5;

		.conten {
			margin: 48rpx 32rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 20rpx 0rpx #F0F1F2;
			border-radius: 16rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.text-number:first-child {
				margin-top: 0rpx;
			}

			.text-number {
				font-size: 28rpx;
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.text {
					color: #616366;
				}

				.number {
					color: #14171A;
					margin-left: 24rpx;
					flex: 1;

					.number-image {
						display: flex;
						// justify-content: space-between;
						grid-gap: 2%;
					}
				}

				.recharge {
					font-size: 24rpx;
					color: #2590FA;
					margin-left: auto;
				}
			}
		}
	}
</style>