<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular autoplay='true' interval='5000' duration='500' @change="swiperChange">
				<swiper-item class="swiper-img" v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="nav_bar" v-if="menuTop" :style="{ top: menuTop.top + 'px' }">
				<view class="return_left" @click="handleBack">
					<uni-icons type="left" size="25" color="#000"></uni-icons>
				</view>
			</view>
			<view class="pic_count">{{ current }}/{{ info.length }}</view>
		</view>
		<view class="conter">
			<view class="money">
				<view class="two">
					<text class="moneyIcon">￥</text>{{ goodsDetaildata.goods.money }}
				</view>
				<view class="three">
					￥{{ goodsDetaildata.goods.originalMoney }}
				</view>
			</view>
			<view class="textwater">
				{{ goodsDetaildata.goods.name }}
			</view>
			<view class="texttext">
				{{ goodsDetaildata.goods.keywords }}
			</view>
			<!-- <view class="img-text">
				<image src="../../static/fuwucishu.png" mode=""></image>
				<text class="texts">已提供{{ goodsDetaildata.goods.sales }}次服务</text>
			</view> -->
			<view class="title">
				商品详情
			</view>
			<view class="detaimage">
				<rich-text :nodes="goodsDetaildata.goods.desc"></rich-text>
			</view>
		</view>
		<view class="bottoms">
			<view class="mall-image" @click="getmore">
				<image src="../../static/shagncheng.png" mode=""></image>
				<view class="mall">
					商城
				</view>
			</view>
			<view class="mall-image gxc" @click="cart">
				<uni-badge size="small" :text="getNumberData" absolute="rightTop" type="error">
					<view class="box">
						<image src="../../static/gouwuches.png" mode=""></image>
					</view>
					<view class="mall ">
						购物车
					</view>
				</uni-badge>
			</view>
			<view class="purchase">
				<view class="gwc" @click="purchase(false)">
					加入购物车
				</view>
				<view class="gwc gm" @click="purchase(true)">
					立即购买
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<uni-popup ref="products" type="bottom" :safeArea="false" border-radius="10px 10px 0 0">
			<view class="aquaticProduct" v-if="goodsSkuData">
				<view class="image-money-icon">
					<view class="image">
						<image :src="goodsSkuData.logo" mode=""></image>
					</view>
					<view class="money">
						<view>
							<span class="money-icon">￥</span>
							<span class="moneyMonth">{{ goodsSkuData.money }}</span>
						</view>
						<view class="text">
							<text style="font-size: 30rpx; font-weight: 700;margin-right: 16rpx;">规格</text>
							{{ goodsSkuData.name }}
						</view>
						<view class="text">
							<text style="font-size: 30rpx; font-weight: 700;margin-right: 16rpx;">库存</text>
							{{ goodsSkuData.stock }}
						</view>
					</view>
					<view class="icon" @click="$refs.products.close()">
						<uni-icons type="closeempty" size="25"></uni-icons>
					</view>
				</view>
				<view class="specifications" v-for="(item, index) in goodsDetaildata.goodsSpecList" :key="item.id">
					<view class="text">
						{{ item.name }}
					</view>
					<view class="list">
						<view class="text" v-for="(item2, index2) in item.storeSpuSpecItemList" :key="item2.id"
							:class="selectedOptions[item.id] === item2.id ? 'text' : 'texts'"
							@click="gettions(goodsDetaildata.goods.id, item2, item.id)">
							{{ item2.name }}
						</view>
					</view>
				</view>
				<view class="text-number-box">
					<view class="text">
						套餐数量
					</view>
					<view class="number-box">
						<uni-number-box :min="1" :max="goodsSkuData.stock" v-model="vModelValue"
							@change="changeValue" />
					</view>
				</view>
				<view v-if="ifcart" class="orderplacement" @click="placement">
					确认下单
				</view>
				<view v-else class="orderplacement" @click="getshopCartadd">
					加入购物车
				</view>
			</view>

			<view class="aquaticProduct" v-else>
				<view class="image-money-icon">
					<view class="image">
						<image :src="goodsDetaildata.goods.logo" mode=""></image>
					</view>
					<view class="money">
						<view>
							<span class="money-icon">￥</span>
							<span class="moneyMonth">{{ goodsDetaildata.goods.money }}</span>
						</view>
						<view class="text">
							<text style="font-size: 30rpx; font-weight: 700;margin-right: 16rpx;">名称</text>
							{{ goodsDetaildata.goods.name }}
						</view>
					</view>
					<view class="icon" @click="$refs.products.close()">
						<uni-icons type="closeempty" size="25"></uni-icons>
					</view>

				</view>
				<view v-if="ifcart" class="orderplacement" @click="placement">
					确认下单
				</view>
				<view v-else class="orderplacement" @click="getshopCartadd">
					加入购物车
				</view>
			</view>
		</uni-popup>
		<u-modal :show="modalShow" title="提示" content='完善资料后才能进行购买，是否前往完善资料？' :showCancelButton="true"
			@confirm="confirm" @cancel=cancel></u-modal>
		<safe-bottom-x></safe-bottom-x>
	</view>
</template>

<script>
export default {
	data() {
		return {
			modalShow: false,
			info: [],
			current: 1,
			menuTop: uni.getMenuButtonBoundingClientRect(),
			vModelValue: 1,
			id: "",
			goodsDetaildata: {},
			selectedOptions: {}, // 保存每个规格的选中状态
			goodsSkuData: null, //规格 商品信息
			ifcart: false, //false 加入购物车   true 立即购买
			getNumberData: 0,
		};
	},
	onLoad(ope) {
		if (ope) {
			this.id = ope.id
		}
	},
	onShow() {
		this.getligthList()
		this.getNumber()
	},
	methods: {
		confirm() {
			uni.navigateTo({
				url: "/subpackageA/pages/my/personalCenter/personalCenter"
			})
			setTimeout(() => {
				this.modalShow = false;
			}, 1000);
			// 
		},
		cancel() {
			this.modalShow = false;
		},
		//获取购物车数量
		async getNumber() {
			let res = await this.$request.get("/water-platform-app-api/shop/shopCart/getNumber")
			console.log('res::: ', res);
			if (res.code === 0) {
				this.getNumberData = res.data
			}
		},
		//跳转商品
		getmore() {
			uni.switchTab({
				url: "/pages/mall/mall"
			})
		},
		// 轮播图滚动事件
		swiperChange(e) {
			this.current = e.detail.current + 1
		},
		// 返回按钮
		handleBack() {
			uni.navigateBack()
		},
		//进入购物车
		cart() {
			uni.navigateTo({
				url: "/subpackageA/pages/mall/cart/cart"
			})
		},
		//购买打开弹窗
		purchase(e) {
			if (this.goodsDetaildata.needFinish) {
				this.modalShow = true;
				return
			}
			// this.$refs.popup.open('bottom')
			this.ifcart = e
			this.vModelValue = 1
			this.$refs.products.open('bottom')
		},
		//加减数量
		changeValue(value) {
		},
		//选择规格
		gettions(goodsId, item2, specId) {
			if (this.selectedOptions[specId] === item2.id) {
				this.$set(this.selectedOptions, specId, null);
			} else {
				this.$set(this.selectedOptions, specId, item2.id);
			}
			const specString = Object.values(this.selectedOptions).join('_');
			this.getgoodsSku(goodsId, specString)
		},
		//获取规格 商品信息
		getgoodsSku(goodsId, specString) {
			let data = {
				goodsId: goodsId,
				specs: specString,
			}
			this.$request.get("/water-platform-app-api/shop/shop/goodsSku", data).then(res => {
				this.goodsSkuData = res.data
			})
		},
		//确认下单
		placement() {
			if (this.goodsSkuData) {
				if (this.goodsSkuData.stock == 0) {
					this.$u.toast("库存不足")
					return
				}
			} else {
				if (this.goodsDetaildata.goods.stock == 0) {
					this.$u.toast("库存不足")
					return
				}
			}

			let data = {
				goodsIds: this.id,
				goodsOptionsIds: this.goodsSkuData ? this.goodsSkuData.id : 0,
				numbers: this.vModelValue
			}
			this.$u.route({
				url: "/subpackageA/pages/mall/ConfirmOrderPlacement/ConfirmOrderPlacement",
				params: {
					data: JSON.stringify(data)
				}
			})

		},
		//商品详情
		getligthList() {
			let data = {
				goodsId: this.id,
			}
			this.$request.get("/water-platform-app-api/shop/shop/goodsDetail", data).then(res => {
				// return
				this.goodsDetaildata = res.data
				this.goodsDetaildata.goods.desc = res.data.goods.desc.replace(/((?<=\<\S+)\s+(?=.+))|((?<=\<[^\/])(?=\>))/g, ' style="width: 100%;" ');
				this.info = res.data.goods.logos.split(","); //处理轮播图
				res.data.goodsSpecList.forEach(spec => {
					if (spec.storeSpuSpecItemList.length > 0) {
						this.$set(this.selectedOptions, spec.id, spec.storeSpuSpecItemList[0].id);
					}
				});
				if (this.selectedOptions && res.data.goodsSpecList.length != 0) {
					const specString = Object.values(this.selectedOptions).join('_');
					this.getgoodsSku(this.goodsDetaildata.goods.id, specString)
				}
			})
		},
		// 添加购物车
		getshopCartadd() {
			if (this.goodsSkuData) {
				if (this.goodsSkuData.stock == 0) {
					this.$u.toast("库存不足")
					return
				}
			} else {
				if (this.goodsDetaildata.goods.stock == 0) {
					this.$u.toast("库存不足")
					return
				}
			}
			let data = {
				goodsId: this.goodsDetaildata.goods.id,
				goodsOptionId: this.goodsSkuData ? this.goodsSkuData.id : 0,
				number: this.vModelValue
			}
			this.$request.get("/water-platform-app-api/shop/shopCart/add", data).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: "添加购物车成功!",
						icon: "none"
					})
					this.getNumber()
					this.$refs.products.close()
				}
			})
		},
	}
}
</script>

<style lang="scss">
.uni-margin-wrap {
	width: 100%;
	height: 750rpx;
	position: relative;
	z-index: 1;

	.pic_count {
		position: absolute;
		right: 32rpx;
		bottom: 32rpx;
		// width: 33px;
		// height: 22px;
		background: rgba(0, 0, 0, .49);
		border-radius: 22rpx;
		padding: 4rpx 16rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #FFFFFF;
	}

	.swiper {
		height: 100%;
		// background-color: red;
	}

	.swiper-img {
		display: block;
		width: 100%;
		height: 750rpx;
		// height: 272rpx;
		// line-height: 300rpx;
		text-align: center;

		.swiper-item {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	::v-deep .uni-swiper-dot {
		width: 10rpx;
		height: 10rpx;
		background: rgba(207, 207, 207, 0.69);
	}

	::v-deep .uni-swiper-dot-active {
		background-color: #fff !important;
	}

	.nav_bar {
		position: absolute;
		// top: 118rpx;
		left: 32rpx;
		right: 0%;


		.return_left {
			// width: 48rpx;
			// height: 48rpx;
			// background: #00000037;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// border-radius: 50%;
		}
	}
}

.conter {
	position: relative;
	background: #FFF;
	margin-top: -25rpx;
	box-shadow: 0rpx -8rpx 20rpx 0rpx rgba(255, 255, 255, 0.2);
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	z-index: 5 !important;
	padding: 30rpx 32rpx 136rpx;
	box-sizing: border-box;

	.money {
		display: flex;
		align-items: center;
		margin-top: 16rpx;

		.two {
			font-size: 44rpx;
			color: #FA6B05;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;

			.moneyIcon {
				font-size: 32rpx;
			}

			.moneyMonth {
				font-size: 28rpx;
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

	.textwater {
		font-weight: 600;
		font-size: 32rpx;
		color: #2E3033;
		margin-top: 16rpx;
	}

	.texttext {
		font-size: 28rpx;
		color: #2E3033;
		margin-top: 16rpx;
	}

	.img-text {
		margin-top: 16rpx;
		position: relative;

		image {
			width: 244rpx;
			height: 64rpx;
		}

		.texts {
			position: absolute;
			top: 18rpx;
			left: 64rpx;
			font-size: 20rpx;
			color: #FAEBE1;
		}
	}

	.title {
		margin-top: 48rpx;
		font-weight: 600;
		font-size: 32rpx;
		color: #14171A;
	}

	.detaimage {
		width: 100%;
		margin-top: 32rpx;

		img {
			width: 100%;
		}
	}
}

.bottoms {
	width: 100%;
	height: 136rpx;
	background-color: #FFF;
	position: fixed;
	bottom: 0%;
	left: 0%;
	z-index: 9;
	display: flex;
	padding: 24rpx 30rpx;
	box-sizing: border-box;

	.mall-image {
		text-align: center;

		image {
			width: 48rpx;
			height: 48rpx;
			display: block;
		}

		.box {
			width: 48rpx;
			height: 48rpx;
			position: relative;
			margin: auto;
		}

		.mall {
			margin-top: 8rpx;
			font-size: 24rpx;
			color: #2E3033;
		}

	}

	.gxc {
		margin-left: 40rpx;
	}

	.purchase {
		width: 464rpx;
		height: 72rpx;
		margin-left: 50rpx;
		display: flex;
		border: 2rpx solid #FAA805;
		border-radius: 50rpx;
		line-height: 72rpx;
		text-align: center;

		.gwc {
			width: 232rpx;
			font-size: 28rpx;
			color: #FA6B05;
		}

		.gm {
			font-size: 28rpx;
			color: #FFFFFF;
			width: 232rpx;
			background: linear-gradient(144deg, #FAA805 0%, #FA6B05 100%);
			border-radius: 0rpx 100rpx 100rpx 0rpx;
		}
	}
}

.aquaticProduct {
	height: 952rpx;
	background: #FFF;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding: 30rpx 32rpx;
	box-sizing: border-box;

	.image-money-icon {
		display: flex;

		.image {
			image {
				width: 168rpx;
				height: 168rpx;
				border-radius: 12rpx 12rpx 12rpx 12rpx;
			}
		}

		.money {
			color: #FA6B05;
			margin-left: 16rpx;

			.money-icon {
				font-size: 28rpx;
			}

			.moneyMonth {
				font-size: 36rpx;
			}

			.moneyText {
				font-size: 24rpx;
				color: #616366;
			}
		}

		.text {
			font-size: 24rpx;
			color: #616366;
			margin-top: 16rpx;
		}

		.icon {
			margin-left: auto;
		}
	}

	.specifications {
		margin-top: 64rpx;

		.text {
			font-size: 28rpx;
			color: #14171A;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			grid-gap: 16rpx;
			margin-top: 24rpx;

			.text {
				width: 106rpx;
				height: 66rpx;
				background: #FAEBE1;
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				border: 2rpx solid #FA6B05;
				line-height: 66rpx;
				text-align: center;
				color: #FA6B05;
				font-size: 24rpx;
			}

			.texts {
				width: 106rpx;
				height: 66rpx;
				background: #F4F5F6;
				border-radius: 8rpx 8rpx 8rpx 8rpx;
				border: 2rpx solid #F4F5F6;
				line-height: 66rpx;
				text-align: center;
				color: #2E3033;
				font-size: 24rpx;
			}
		}
	}

	.text-number-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 66rpx;

		.text {
			font-size: 28rpx;
			color: #14171A;
		}
	}

	.orderplacement {
		width: 690rpx;
		height: 88rpx;
		background: linear-gradient(144deg, #FAA805 0%, #FA6B05 100%);
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 88rpx;
		text-align: center;
		color: #FFF;
		position: absolute;
		bottom: 92rpx;
	}
}
</style>