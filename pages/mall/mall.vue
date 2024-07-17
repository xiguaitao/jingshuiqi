<template>
	<view class="content">
		<view class="swiper">
			<uni-swiper-dot @clickItem=clickItem :info="bannerList" :current="current" field="content" :mode="mode"
				:dotsStyles="dotStyle">
				<swiper class="swiper-box" @change="change" :circular="true" :current="swiperDotIndex" autoplay="true"
					:interval="2000" :duration="500">
					<swiper-item v-for="(item, index) in bannerList" :key="index">
						<view class="swiper-img">
							<image :src="item.logo" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="scrollView">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="scroll-list">
					<view :class="item.id == listID ? 'scroll-view-item_H' : 'scroll-view-item_N'"
						v-for="(item, index) in articledata" :key="index" @click="getscroll(item, index)">
						<image v-if="item.logo" :src="item.logo" mode=""></image>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="">
			<cx-screen :list="list" @scree-n="screeN"></cx-screen>
		</view>
		<view class="commodity">
			<view class="corten-list" v-if="goodsListData.length !== 0">
				<view class="corten" v-for="(item, index) in goodsListData" :key="item.id"
					@click="getProductDetails(item)">
					<view class="image">
						<image class="image" :src="item.logo" mode=""></image>
					</view>
					<view class="text-water">
						<view class="textwater">
							{{ item.name }}
						</view>
						<view class="checkTheNumber">
							{{ item.name }}
						</view>
						<view class="money">
							<view class="two">
								<text class="moneyIcon">￥</text>{{ item.money }}
								<!-- <text class="moneyMonth">/月</text> -->
							</view>
							<view class="three">
								￥{{ item.originalMoney }}
								<!-- /月 -->
							</view>
						</view>
						<view class="service">
							已销售{{ item.sales }}
						</view>
					</view>
				</view>
			</view>
			<dataText v-else></dataText>
		</view>
		<view class="crown" v-show="crown" @click="getcrown">
			<image src="@/static/image/zhiding.png" mode=""></image>
		</view>
		<view class="wuche" @click="getcart">
			<image src="@/static/image/gouwuche.png" mode=""></image>
			<view class="hzs">
				<u-badge :type="type" max="99" :value="getNumberData" :offset="[0, 5]" :absolute="true">
				</u-badge>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: "error",
			getNumberData: 0,
			bannerList: [],
			current: 0,
			mode: 'round',
			dotStyle: {
				backgroundColor: 'rgba(255,255,255,0.5)',
				border: '1px rgba(0, 0, 0, .3) solid',
				color: '#fff',
				selectedBackgroundColor: '#FFFFFF',
				selectedBorder: '1px #FFFFFF solid'
			},
			swiperDotIndex: 0,
			list: [{
				name: '默认',
				id: 1,
				ishow: true,
			}, {
				name: '销量',
				id: 2,
				ishow: false,
			}, {
				name: '价格',
				id: 3,
				ishow: false,
			}],

			listID: 0,
			crown: false,
			articledata: [],
			goodsListData: [],
			page: 1, //页
			limit: 10, //条
			seqType: 1,
			seqOrder: 2,
		};
	},
	onPageScroll(e) {
		if (e.scrollTop > 0) {
			this.crown = true
		} else {
			this.crown = false
		}
	},
	async onLoad() {
		await this.getbanner()
		await this.getarticle()
		await this.getgoodsList(this.seqType, this.seqOrder)
	},
	async onShow() {
		await this.getNumber()
	},
	onReachBottom() {
		this.page++
		this.getgoodsList(this.seqType, this.seqOrder)
	},
	onTabItemTap(e) {
		console.log(e, '我点击了商城底部tab');
	},
	methods: {
		//获取购物车数量
		async getNumber() {
			let res = await this.$request.get("/water-platform-app-api/shop/shopCart/getNumber")
			if (res.code === 0) {
				this.getNumberData = res.data;
			}
		},
		change(e) {
			this.current = e.detail.current
		},
		clickItem(e) {
			this.swiperDotIndex = e
		},
		//筛选
		screeN(e, i) {
			this.list[i].ishow = !e.ishow
			this.seqType = e.id
			this.page = 1
			this.goodsListData = []
			if (e.id == 1) {
				this.getgoodsList(this.seqType, this.seqOrder)
			} else {
				this.seqOrder = this.list[i].ishow ? 1 : 2
				this.getgoodsList(this.seqType, this.seqOrder)
			}
		},
		//滑动标签选择
		getscroll(item, index) {
			this.listID = item.id
			this.page = 1
			this.goodsListData = []
			this.getgoodsList(this.seqType, this.seqOrder)
		},
		//回到顶部
		getcrown() {
			uni.pageScrollTo({
				scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
				duration: 100 // 滚动动画的时长
			})
		},
		//跳转商品详情
		getProductDetails(e) {
			uni.navigateTo({
				url: "/subpackageA/pages/mall/productDetails/productDetails?id=" + e.id
			})
		},
		//跳转到购物车
		getcart() {
			uni.navigateTo({
				url: "/subpackageA/pages/mall/cart/cart"
			})
		},
		//获取轮播图列表
		async getbanner() {
			await this.$request.get("/water-platform-app-api/shop/shop/banner").then(res => {
				console.log(res, '获取轮播图列表');
				this.bannerList = res.data
			})
		},
		//商品分类列表
		async getarticle() {
			await this.$request.get("/water-platform-app-api/shop/shop/goodsTypeList").then(res => {
				console.log(res, '商品分类列表');
				this.articledata = res.data
				this.listID = this.articledata[0].id
			})
		},
		//商品列表
		async getgoodsList(seqType, seqOrder) {
			let data = {
				goodsTypeId: this.listID,
				seqType: seqType, //	 1-默认, 2-销量, 3- 价格
				seqOrder: seqOrder, // 1-升序, 2-降序
				page: this.page,
				limit: this.limit,

			}
			await this.$request.get("/water-platform-app-api/shop/shop/goodsList", data).then(res => {
				console.log(res, '商品列表');
				if (res.data.length > 0) {
					this.goodsListData.push(...res.data)
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
.content {
	min-height: 100vh;
	background: #F4F5F6;
	overflow: auto;
	position: relative;

	.swiper {
		height: 422rpx;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		// background-color: red;
		// padding-top: 88rpx;
		box-sizing: border-box;

		.swiper-box {
			height: 422rpx;
		}

		.swiper-img {
			display: block;
			width: 100%;
			height: 422rpx;
			text-align: center;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.scrollView {
	padding: 0rpx 30rpx;
	box-sizing: border-box;
	margin-top: 30rpx;

	.scroll-list {
		display: flex;
		align-items: center;

		.scroll-view-item_H {
			padding: 5rpx 10rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			background: #E1EDFA;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 2rpx solid #2590FA;
			margin-right: 16rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 24rpx;
			color: #2590FA;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 2.5rpx;
				vertical-align: text-bottom;
			}
		}

		.scroll-view-item_N {
			padding: 5rpx 10rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			background: #E4E5E6;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			margin-right: 16rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 24rpx;
			color: #2E3033;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 2.5rpx;
				vertical-align: text-bottom;
			}
		}
	}
}

.commodity {
	width: 690rpx;
	margin: 32rpx auto;

	.corten-list {

		.corten {
			// height: 280rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-top: 24rpx;

			.image {
				width: 232rpx;
				height: 232rpx;
				border-radius: 12rpx 12rpx 12rpx 12rpx;
			}

			.text-water {
				margin-left: 16rpx;

				.textwater {
					font-weight: 600;
					font-size: 32rpx;
					color: #2E3033;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.checkTheNumber {
					width: 350rpx;
					font-size: 24rpx;
					color: #616366;
					margin-top: 16rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					// display: flex;
					// position: relative;
					// align-items: center;

					.water-number {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.number {
							font-weight: 600;
							font-size: 32rpx;
							color: #2E3033;
						}

						.waterThe {
							font-size: 24rpx;
							color: #616366;
						}
					}

					.lineView {
						width: 2rpx;
						height: 48rpx;
						background-color: #E4E5E6;
						margin: 0 48rpx;
					}
				}

				.money {
					display: flex;
					align-items: center;
					margin-top: 16rpx;

					.two {
						font-size: 36rpx;
						color: #FA6B05;
						font-weight: 700;
						display: flex;
						justify-content: center;
						align-items: center;

						.moneyIcon {
							font-size: 28rpx;
						}

						.moneyMonth {
							font-size: 24rpx;
							color: #616366;
							font-weight: 400;
						}
					}

					.three {
						margin-left: 16rpx;
						font-size: 24rpx;
						color: #B1B2B2;
						text-decoration: line-through;
					}
				}

				.service {
					margin-top: 16rpx;
					font-size: 20rpx;
					color: #B1B2B2;
					margin-top: 8rpx;
				}

			}
		}

		.corten:first-child {
			margin-top: 0;
		}
	}
}

.crown {
	position: fixed;
	right: 32rpx;
	top: 85%;

	image {
		width: 88rpx;
		height: 88rpx;
	}
}

.wuche {
	border-radius: 50%;
	position: fixed;
	right: 32rpx;
	top: 78%;
	width: 96rpx;
	height: 96rpx;

	image {
		width: 100%;
		height: 100%;
	}

	.hzs {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

}
</style>