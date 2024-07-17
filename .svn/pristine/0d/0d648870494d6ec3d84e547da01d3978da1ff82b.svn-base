<template>
	<view class="box">
		<tito title="我的团队" :leftIconShow="true"></tito>
		<view class="tuandui">
			<image src="../../static/tuandui.png" mode=""></image>
			<view class="text-number-text">
				<view class="number-text">
					<view class="number">
						{{statistics.directCount || 0}}
					</view>
					<view class="text">
						直推客户
					</view>
				</view>
				<view class="number-text">
					<view class="number">
						{{statistics.indirectCount || 0}}
					</view>
					<view class="text">
						转介绍客户
					</view>
				</view>
			</view>
		</view>
		<view class="subsection">
			<subsection :list="list" :current="current" @change="sectionChange"></subsection>
		</view>
		<view class="kehu" v-if="current == 0 && teamData.length > 0">
			<view class="text-time" v-for="(item,index) in teamData" :key="index">
				<view class="text">
					<image :src="item.logo" mode=""></image>
					<view class="name">
						{{ item.name }}
					</view>
				</view>
				<view class="time">
					{{ getTime(item.createTime) }}
				</view>
			</view>
		</view>
		<view class="kehuZhuan" v-else-if="current == 1  && teamData.length > 0">
			<view class="text-time-text-time" v-for="(item,index) in teamData" :key="index">
				<view class="text-time">
					<view class="text">
						<image :src="item.parentLogo" mode=""></image>
						<view class="name">
							{{ item.parentName }}
						</view>
					</view>
					<view class="time">
						{{ getTime(item.createTime) }}
					</view>
				</view>
				<view class="refer">
					转介
				</view>
				<view class="text-time">
					<view class="text">
						<image :src="item.logo" mode=""></image>
						<view class="name">
							{{ item.name }}
						</view>
					</view>
					<view class="time">
						{{ getTime(item.createTime) }}
					</view>
				</view>
			</view>
		</view>
		<dataText v-else></dataText>
	</view>
</template>

<script>
	import {
		teamList,
		teamStatistics
	} from "@/api/api.js";
	export default {
		data() {
			return {
				listID: "0",
				list: ['直推客户', '转介绍客户'],
				goodsList: [], //产品列表
				teamData: [],
				statistics: {},
				current: 0,
				listData: {
					page: 1,
					limit: 10,
					type: null,
				},
			};
		},
		onShow() {
			this.teamStatistics()
			this.getteamData()
		},
		methods: {
			getTime(e) {
				if (!e) return
				return e.split(" ")[0]
			},
			//我的团队列表统计
			async teamStatistics() {
				let res = await teamStatistics()
				if (res.code == 0) {
					this.statistics = res.data
				}
			},
			//团队列表
			async getteamData() {
				this.listData.type = this.current == 0 ? 1 : 2
				let res = await teamList(this.listData)
				if (res.code == 0) {
					this.teamData = res.data
				}
			},
			//滑动标签选择
			getscroll(item, index) {
				this.listID = item.id
				this.getteamData()
			},
			sectionChange(index) {
				this.current = index;
				this.getteamData()
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.scrollView {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		margin-bottom: 48rpx;

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}

		.scroll-list {
			display: flex;
			align-items: center;

			.scroll-view-item {
				margin-right: 24rpx;
				text-align: center;
				height: 72rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
			}

			.scroll-view-item_H {
				line-height: 72rpx;
				background: #E1F2FA;
				border: 2rpx solid #1DABF2;
				color: #1DABF2;
			}

			.scroll-view-item_N {
				line-height: 72rpx;
				background: #FFFFFF;
				color: #2E3133;
				border: 2rpx solid #FFF;
			}
		}
	}

	.tuandui {
		height: 160rpx;
		margin: 0 32rpx 64rpx;
		position: relative;

		image {
			position: absolute;
			top: 0%;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.text-number-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 100%;

			.number-text {
				display: flex;
				flex-direction: column;
				align-items: center;

				.number {
					font-weight: 600;
					font-size: 44rpx;
					color: #FFFFFF;
				}

				.text {
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.7);
				}
			}
		}
	}

	.subsection {
		margin: 0 32rpx;
	}

	.kehu {
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
		border-radius: 8rpx;
		padding: 32rpx;
		box-sizing: border-box;
		margin: 34rpx 32rpx 30rpx;
		// flex: 1;
		overflow-y: auto;

		.text-time {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 96rpx;
			border-bottom: 2rpx solid #F0F1F2;

			.text {
				display: flex;
				align-items: center;

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					vertical-align: middle;
				}

				.name {
					font-size: 28rpx;
					color: #14181A;
					margin-left: 24rpx;
				}
			}

			.time {
				font-size: 24rpx;
				color: #616466;
			}
		}

	}

	.kehuZhuan {
		flex: 1;
		overflow-y: auto;
		margin-bottom: 30rpx;

		.text-time-text-time {
			height: 288rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx;
			margin: 32rpx;
			padding: 32rpx;
			box-sizing: border-box;

			.refer {
				font-size: 24rpx;
				color: #1DABF2;
				position: relative;
				text-align: center;

				&::after,
				&::before {
					content: "";
					width: 223rpx;
					height: 2rpx;
					background: #E1E4E6;
				}

				&::after {
					position: absolute;
					left: 0%;
					top: 50%;
				}

				&::before {
					position: absolute;
					right: 0%;
					top: 50%;
				}
			}

			.text-time {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 96rpx;

				.text {
					display: flex;
					align-items: center;

					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						vertical-align: middle;
					}

					.name {
						font-size: 28rpx;
						color: #14181A;
						margin-left: 24rpx;
					}
				}

				.time {
					font-size: 24rpx;
					color: #616466;
				}
			}
		}
	}
</style>