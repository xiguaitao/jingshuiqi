<template>
	<view class="box">
		<tito :title="title"></tito>
		<view class="conten-text">
			<view class="conten" v-for="(item,index) in ligthList" :key="index" @click="getdetails(item.id)">
				<view class="image">
					<!-- <image v-if="item.video" :src="item.video" mode=""></image> -->
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
		getligthList
	}
	from "@/api/api.js"
	export default {
		data() {
			return {
				title: "",
				id: "", //文章Id
				page: 1, //页
				limit: 10, //条 
				ligthList: [], //文章列表
			};
		},
		onLoad(ope) {
			if (ope.title) {
				this.title = ope.title
				this.id = ope.id
			}
			this.getligthList()
		},
		methods: {
			//详情
			getdetails(id) {
				this.$u.route({
					url: "/subpackageA/pages/home/details/details",
					params: {
						id
					}
				})
			},
			//文章列表
			getligthList() {
				let data = {
					articleTypeId: this.id,
					page: this.page,
					limit: this.limit,
				}
				getligthList(data).then(res => {
					console.log(res, '文章列表');
					if (res.data.length > 0) {
						this.ligthList.push(...res.data)

					} else {
						uni.showToast({
							title: "没有更多了!",
							icon: "none"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F7F7F7;
	}

	.conten-text {
		margin: 32rpx;


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
				// background-color: red;
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