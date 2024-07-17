<template>
	<view class="box">
		<view class="titos">
			<view class="deviceBj">
				<image src="../../static/wy-jf.png" mode=""></image>
			</view>
			<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 7 +'px', }">
				<view class="image-text" @click="getdevices">
					<u-icon name="arrow-left" size="24" color="#161A1B"></u-icon>
				</view>
				<view class="textE">
					我的积分
				</view>
				<view class="right"></view>
			</view>
			<view class="card-content">
				<view class="number-ts">
					<view class="number">{{infoData.integral}}</view>
					<view class="ts">我的积分</view>
				</view>
				<view class="mx" @click="getdetails">
					积分明细
				</view>
			</view>

		</view>
		<view class="conter">
			<view class="check-in">
				<view class="check">
					您已经连续签到{{infoData.conDays}}天
				</view>
				<view class="in" v-if="!infoData.signToday" @click="signin">
					签到
				</view>
				<view class="yilinqu" v-else>
					已签到
				</view>
			</view>
			<view class="signchenck-chencklist">
				<view class="signchenck" v-for="(item, index) in dates" :key="index">
					<view :class="item.times ? 'chencklist' : 'huichencklist'">
						<view class="riqi">
							{{ item.text }}
						</view>
						<view class="jfimage" v-if="item.times">
							<image src="../../static/yiqd.png" mode=""></image>
						</view>
						<view class="jfimage" v-else>
							<image src="../../static/weiqd.png" mode=""></image>
						</view>
						<view class="want">
							+{{item.integral || 0}}
						</view>
					</view>
				</view>
			</view>
			<view class="earns">
				<view class="tiet">
					积分任务
				</view>
				<view class="receiveList">
					<view class="recelist" v-for="(item,index) in infoData.integralTypeList" :key="item.id">
						<view class="jrqd">
							<image src="../../static/jrqd.png" mode=""></image>
						</view>
						<view class="jin-ji">
							<view class="jin">
								{{integralTypes[item.type]}}
							</view>
							<view class="ji">
								奖励{{item.integral}}积分
							</view>
						</view>
						<view class="complete" v-if="item.type == 7 || item.type == 8" @click="getlete">
							去完成
						</view>
						<view class="linqu"
							v-if="!infoData.signToday && (item.type == 1 || item.type == 2 || item.type == 3)"
							@click="signin">
							签到
						</view>
						<view class="yilinqu"
							v-if="infoData.signToday && (item.type == 1 || item.type == 2 || item.type == 3)">
							已签到
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		integralRecordInfo,
		signin
	} from "@/api/api.js"
	export default {
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
				paymentId: '0',
				money: "", //金额
				bankCardData: [],
				page: 1,
				limit: 10,
				bank: "",
				currentDate: new Date(),
				infoData: {},
				dates: [],
				integralTypes: {
					1: '签到',
					2: '指定日期签到',
					3: '连续签到',
					4: '积分兑换余额',
					5: '商城购买',
					6: '套餐充值',
					7: '邀请好友注册',
					8: '好友首单奖励'
				}
			};
		},
		computed: {
			// 使用计算属性来展示日期
			monthDates() {
				return this.getCurrentMonthDates();
			},
		},
		onLoad() {
			this.integralRecordInfo()
		},
		methods: {
			getdevices(){
				uni.navigateBack()
			},
			//得到签到过的日期
			signindate() {
				// 得到签到过的日期
				if (this.infoData.integralRecordList) {
					const updatedDates = this.dates.map(item2 => {
						const matchingItem = this.infoData.integralRecordList.find(item => item.times === item2
							.text);
						if (matchingItem) {
							return {
								...item2,
								...matchingItem
							};
						}
						return item2;
					});
					this.dates = updatedDates;
					return this.dates;
				}
			},
			//时间列表
			getCurrentMonthDates() {
				// 获取当前月份的时间范围
				const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
				const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

				// 创建一个包含三十一个日期条目的数组
				const dates = [];
				for (let i = 0; i < endDate.getDate(); i++) {
					// 计算当前日期
					const currentDay = new Date(startDate);
					currentDay.setDate(currentDay.getDate() + i);

					// 获取日期字符串并补零
					const dateString =
						`${(currentDay.getMonth() + 1).toString().padStart(2, '0')}/${currentDay.getDate().toString().padStart(2, '0')}`;

					// 将日期字符串添加到数组中
					dates.push({
						"text": dateString
					});
				}

				this.dates = dates
				this.signindate()
			},
			//去完成
			getlete() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/lnviteFriends/lnviteFriends"
				})
			},
			//签到
			async signin() {
				let res = await signin()
				if (res.code == 0) {
					uni.showToast({
						title: "签到成功",
						icon: "none"
					})
					this.integralRecordInfo()
				}
			},
			//我的积分页面数据
			async integralRecordInfo() {
				let res = await integralRecordInfo()
				if (res.data) {
					res.data.integralRecordList.forEach(record => {
						record.times = record.updateTime.split(' ')[0].split('-').slice(1).join(
							'/') // 转换为 "04/12" 格式
					});
					this.infoData = res.data
				}
			},
			//积分明细
			getdetails() {
				uni.navigateTo({
					url: "/subpackageA/pages/my/pointsDetails/pointsDetails"
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;

	}

	.titos {
		position: relative;
		padding: 0 0 32rpx 32rpx;
		box-sizing: border-box;

		.deviceBj {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			image {
				width: 100%;
				height: 480rpx;
			}
		}

		.tito {
			display: flex;
			box-sizing: border-box;
			position: relative;
			justify-content: space-between;
			.textE {
				color: #161A1B;
				font-size: 32rpx;
				transform: translateX(-30%);
			}
		}

		.card-content {
			margin-top: 70rpx;
			font-family: PingFang SC, PingFang SC;
			position: relative;
			display: flex;
			justify-content: space-between;

			.number-ts {
				.number {
					font-weight: 600;
					font-size: 60rpx;
					color: #14181A;
				}

				.ts {
					font-size: 24rpx;
					color: #616466;
				}
			}

			.mx {
				background-color: #EFF9FC;
				font-size: 24rpx;
				color: #1DABF2;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
			}
		}
	}

	.conter {
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 48rpx 32rpx;
		position: relative;
		padding: 32rpx;
		box-sizing: border-box;
		font-family: PingFang SC, PingFang SC;

		.check-in {
			display: flex;
			justify-content: space-between;

			.check {
				font-weight: 600;
				font-size: 32rpx;
				color: #2E3033;
			}

			.in {
				width: 112rpx;
				height: 50rpx;
				background: linear-gradient(135deg, #04D9D9 0%, #1DACF2 100%);
				border-radius: 4rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 50rpx;
			}
		}

		.signchenck-chencklist {
			margin-top: 32rpx;
			display: flex;
			grid-gap: 16rpx;
			overflow-x: auto;

			.signchenck {
				.chencklist {
					width: 102rpx;
					height: 170rpx;
					background: linear-gradient( 135deg, #04D9D9 0%, #1DACF2 100%);
					border-radius:8rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.riqi {
						font-size: 24rpx;
						color: rgba(255,255,255,0.7);
					}

					.jfimage {
						margin: 8rpx 0;

						image {
							width: 48rpx;
							height: 48rpx;
							vertical-align: middle;

						}
					}

					.want {
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.huichencklist {
					width: 102rpx;
					height: 170rpx;
					background: linear-gradient( 199deg, #C8E9FA 0%, rgba(200,233,250,0) 100%);
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.riqi {
						font-size: 24rpx;
						color: #1DABF2;
					}

					.jfimage {
						margin: 8rpx 0;

						image {
							width: 48rpx;
							height: 48rpx;
							vertical-align: middle;

						}
					}

					.want {
						font-size: 24rpx;
						color: #1DABF2;
					}
				}
			}
		}

		.text-icon {
			font-size: 24rpx;
			color: #616366;
			text-align: center;
			margin-top: 32rpx;
		}

		.earns {
			background: #FFFFFF;
			box-sizing: border-box;

			.tiet {
				font-weight: 600;
				font-size: 32rpx;
				color: #14171A;
			}

			.receiveList {
				margin-top: 32rpx;

				.recelist:first-child {
					margin-top: 0rpx;
				}

				.recelist {
					display: flex;
					align-items: center;
					margin-top: 24rpx;

					.jrqd {
						image {
							width: 64rpx;
							height: 64rpx;
							vertical-align: middle;
						}
					}

					.jin-ji {
						margin-left: 24rpx;

						.jin {
							font-weight: 600;
							font-size: 28rpx;
							color: #2E3033;
						}

						.ji {
							font-size: 24rpx;
							color: #616366;
							margin-top: 8rpx;
						}
					}

					.complete {
						width: 112rpx;
						height: 50rpx;
						border-radius: 40rpx;
						border: 2rpx solid #FA6B05;
						font-size: 24rpx;
						color: #FA6B05;
						text-align: center;
						line-height: 50rpx;
						margin-left: auto;
					}

					.linqu {
						width: 112rpx;
						height: 50rpx;
						background: linear-gradient(135deg, #04D9D9 0%, #1DACF2 100%);
						border-radius: 4rpx;
						text-align: center;
						line-height: 50rpx;
						margin-left: auto;
						font-size: 24rpx;
						color: #FFFFFF;
					}

					.yilinqu {
						width: 112rpx;
						height: 50rpx;
						background: #D7D8D9;
						border-radius: 40rpx;
						text-align: center;
						line-height: 50rpx;
						margin-left: auto;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>