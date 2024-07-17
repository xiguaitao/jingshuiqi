<template>
	<view class="box">
		<view class="swiper">
			<uni-swiper-dot @clickItem=clickItem :info="bannerList" :current="currents" field="content" :mode="mode"
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
		<notice :title="item.name" :imageTop="(index + 1) % 2 == 0 ? kap2Top : kap1Top"
			@getmore="getmore($event,item.id)" v-for="(item,index) in articledata.recommendArticleTypeList"
			:key="item.id">
			<view class="conter-text">
				<view class="image">
					<image :src="(index + 1) % 2 == 0 ? kap2Btn : kap1Btn" mode=""></image>
				</view>
				<view class="corten" v-for="(item2,index2) in item.articleList" :key="index2"
					@click="getdetails(item2.id)">
					<view class="videotext">
						{{item2.name}}
					</view>
					<view class="time">
						{{ dateTimeString(item2.createTime)}}
					</view>
				</view>
			</view>
		</notice>
		<view class="commodityList">
			<commodity :list="item.goodsList" :title="item.name" v-for="(item,index) in goodsList" :key="item.id"
				@getProductDetails="getProductDetails">
			</commodity>
		</view>
		<view class="bottom">
			<text>没有更多内容了</text>
		</view> 
	</view>
</template>

<script>
	import {
		goodsList,
		article,
		getbanner
	}
	from "@/api/api.js"
	export default {
		data() {
			return {
				kap1Top: require("@/static/image/kap1-top.png"),
				kap1Btn: require("@/static/image/kap1-btn.png"),
				kap2Top: require("@/static/image/kap2-top.png"),
				kap2Btn: require("@/static/image/kap2-btn.png"),
				bannerList: [],
				currents: 0,
				mode: 'round',
				dotStyle: {
					backgroundColor: 'rgba(255,255,255,0.5)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: '#FFFFFF',
					selectedBorder: '1px #FFFFFF solid'
				},
				swiperDotIndex: 0,
				goodsList: [],
				articledata: [],
			};
		},
		onLoad() {
			this.getbanner()
			this.getarticle()
			this.getgoodsList()
		},
		onPullDownRefresh() {
			this.getbanner()
			this.getarticle()
			this.getgoodsList()
		},
		methods: {
			change(e) {
				this.currents = e.detail.current
			},
			//时间解析只要 月日
			dateTimeString(e) {
				return e.match(/\d{4}-(\d{2})-(\d{2})/).slice(1).join('-')
			},
			//跳转文章详情
			getmore(title, id) {
				this.$u.route({
					url: "/subpackageA/pages/home/detailsList/detailsList",
					params: {
						title,
						id,
					}
				})
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			//获取轮播图列表
			getbanner() {
				getbanner().then(res => {
					console.log(res, '获取轮播图列表');
					this.bannerList = res.data
				})
			},
			//跳转商品详情
			getProductDetails(e) {
				uni.navigateTo({
					url: "/subpackageA/pages/mall/productDetails/productDetails?id=" + e.id
				})
			},
			//推荐商品列表
			getgoodsList() {
				goodsList().then(res => {
					console.log(res, '推荐商品列表');
					this.goodsList = res.data
				})
			},
			//文章分类和推荐分类
			getarticle() {
				article().then(res => {
					console.log(res, '文章分类和推荐分类');
					this.articledata = res.data
				})
			},
			//文章详情
			getdetails(id) {
				uni.navigateTo({
					url: "/subpackageA/pages/home/details/details?id=" + id
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 100vh;
		background-color: #F0F3F5;
	}

	.swiper {
		height: 422rpx;
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
				border-radius: 0 0 30rpx 30rpx;
			}
		}
	}

	.commodityList {
		margin: 0 32rpx;

	}

	.bottom {
		text-align: center;
		padding-bottom: 32rpx;
		box-sizing: border-box;

		text {
			font-size: 24rpx;
			color: #B1B2B2;
		}
	}

	.conter-text {
		// min-height: 440rpx;
		background-color: #FFFFFF;
		position: relative;
		padding: 0 10rpx 10rpx 10rpx;
		box-sizing: border-box;

		.image {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: -2rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.corten {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #E1E4E6;
			position: relative;
			background-color: #FFF;

			.videotext {
				font-weight: 600;
				font-size: 28rpx;
				color: #2E3033;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				flex: 1;
			}

			.time {
				font-size: 24rpx;
				color: #B1B2B2;
			}
		}
	}
</style>