<template>
	<view class="box">
		<view class="text-text">
			{{ligthdata.name}}
		</view>
		<view class="time-icon">
			<view class="time">
				{{ligthdata.createTime}}
			</view>
			<view class="icon">
				<image src="../../static/yuedu.png" mode=""></image>
				{{ligthdata.viewCount}}
			</view>
		</view>
		<view class="video" v-if="ligthdata.video">
			<video :src="ligthdata.video" controls></video>
		</view>
		<view class="richText">
			<rich-text :nodes="ligthdata.details"></rich-text>
		</view>
		<view class="text-more">更多内容</view>
		<view class="conten-text">
			<view class="conten" v-for="(item,index) in ligthdata.articleList" :key="index"
				@click="getdetails(item.id)">
				<view class="image">
					<video v-if="item.video" :src="item.video"></video>
					<image v-else :src="item.logo" mode=""></image>
					<image v-if="item.video" class="bofang" src="../../static/bofang.png" mode=""></image>
				</view>
				<view class="text">
					<view class="title-text">
						{{item.name}}
					</view>
					<view class="text-ellipsis">
						<rich-text :nodes="item.details"></rich-text>
					</view>
					<view class="time-yuedu">
						<view class="time">
							{{item.createTime}}
						</view>
						<view class="yuedu">
							<image src="../../static/yuedu.png" mode=""></image>
							<view class="text">{{item.viewCount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ligthList
	}
	from "@/api/api.js"
	export default {
		data() {
			return {
				id: "",
				ligthdata: {}
			};
		},
		onLoad(ope) {
			if (ope) {
				this.id = ope.id
			}
			this.getligthList()
		},
		methods: {
			//详情
			getdetails(id) {
				uni.navigateTo({
					url: "/subpackageA/pages/home/details/details?id=" + id
				})
			},
			//文章详情
			getligthList() {
				let data = {
					id: this.id,
				}
				ligthList(data).then(res => {
					console.log(res, '文章详情');
					this.ligthdata = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
	}

	.text-text {
		padding: 32rpx 0rpx;
		line-height: 50rpx;
		box-sizing: border-box;
		font-weight: 600;
		font-size: 36rpx;
		color: #14171A;
	}

	.time-icon {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.time {
			font-size: 24rpx;
			color: #B1B2B2;
		}

		.icon {
			display: flex;
			align-items: center;
			color: #B1B2B2;
			font-size: 24rpx;
			color: #B1B2B2;

			image {
				width: 32rpx;
				height: 32rpx;
				vertical-align: middle;
			}
		}
	}

	.video {
		width: 100%;
		margin-top: 64rpx;

		video {
			width: 100%;
			border-radius: 12rpx 12rpx 12rpx 12rpx;
		}
	}

	.richText {
		margin-top: 48rpx;
		margin-bottom: 96rpx;
	}

	.text-more {
		font-weight: 600;
		font-size: 36rpx;
		color: #14171A;
		margin-left: 40rpx;
		position: relative;
	}

	.text-more::after {
		content: "";
		width: 24rpx;
		height: 24rpx;
		background: linear-gradient(180deg, #04D9D9 0%, #1DABF2 100%);
		border-radius: 2rpx;
		position: absolute;
		left: -40rpx;
		top: 10rpx;
		transform: rotateZ(45deg);
	}

	.conten-text {
		.conten {
			height: 228rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #E4E5E6;
			padding: 24rpx;
			box-sizing: border-box;
			margin-top: 32rpx;

			.image {
				width: 240rpx;
				height: 180rpx;
				border-radius: 4rpx;
				background-color: red;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					border-radius: 4rpx;
				}

				video {
					width: 100%;
					height: 100%;
				}

				.bofang {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
					position: absolute;
					top: 58rpx;
					left: 88rpx;
				}
			}



			.text {
				flex: 1;
				margin-left: 24rpx;

				.title-text {
					font-size: 28rpx;
					color: #2E3033;
				}

				.text-ellipsis {
					margin-top: 16rpx;
					font-size: 24rpx;
					color: #616366;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.time-yuedu {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 24rpx;

					.time {
						font-size: 24rpx;
						color: #B1B2B2;
					}

					.yuedu {
						display: flex;

						image {
							width: 32rpx;
							height: 32rpx;
							vertical-align: middle;
						}

						.text {
							margin-left: 8rpx;
							font-size: 24rpx;
							color: #AFB1B2;
						}
					}

				}
			}
		}
	}
</style>