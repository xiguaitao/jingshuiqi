<template>
	<view class="box">
		<view class="tito" v-if="menuTop" :style="{ paddingTop: menuTop.top + 'px', height: menuTop.top + 44 + 'px' }">
			<view class="icon" @click="getleft">
				<uni-icons type="left" size="25" color="#000"></uni-icons>
			</view>
			<view class="text">
				购物车
			</view>
			<view class="edit" @click="getedit">
				{{ edit ? '编辑' : '取消' }}
			</view>
		</view>
		<view class="shopCartList">
			<view class="glance-shop-cart" style="background-color: #F5F5F5;">

				<view class="scrollsList">
					<scroll-view :scroll-y="true" :refresher-enabled="true" :refresher-threshold="0"
						@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto; "
						:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20">
						<view class='content'>
							<u-checkbox-group v-model="checkboxValue1" placement="column">
								<u-transition :show="true" v-for="(item, index) in shopCartList" :key="item.id"
									mode="slide-left">
									<view style="display: flex;align-items: center;">
										<view class="checkbox">
											<u-checkbox activeColor="red" shape="circle" :name="item.id">
											</u-checkbox>
										</view>
										<view class="content" style="flex: 1;">
											<cart-list v-model="shopCartList[index]" :del="!edit"
												@del="getshopCartdelete(item.id)" @change="change"
												@getDelete="getDelete"></cart-list>
										</view>
									</view>
								</u-transition>
							</u-checkbox-group>
						</view>
						<u-loadmore v-if="shopCartList.length > 0" :status="status" />
						<view v-if="shopCartList.length == 0" class="nodata" v-show="shopCartList.length <= 0">
							<view class="contents">
								<view class="text"> 暂无数据</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 金额合计 -->
				<view class="glance-shop-cart-order">
					<view class="cart-btn">
						<!-- 全选 -->
						<view @click="clickitemselectedall"
							style="width: 17%; display: flex; justify-content: space-between;align-items: center;">
							<!-- 勾选 -->
							<view class="glance-shop-cart-scrollx-items-item-sel"
								:class="[isselectedall ? 'glance-shop-cart-itemselected-img' : 'glance-shop-cart-itemunselected-img']">
							</view>
							<view>
								全选
							</view>
						</view>
						<!-- 总数量 -->
						<view class="glance-shop-cart-total-cnt">
							<span class="xZh">已选中{{ checkboxValue1.length }}件</span>
							<span class="hJi">合计:</span>
							<span class="money">
								<span class="icon">￥</span>
								{{ totalamounts }}
							</span>
						</view>
						<!-- 立即下单 -->
						<view class="glance-shop-cart-create-order" v-if="edit" @click="createorder">结算</view>
						<view class="glance-shop-cart-create-order" v-else @click="creatDelete">删除</view>
					</view>

					<safe-bottom-x></safe-bottom-x>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
			<view class="popur">
				<view class="delete">
					确定要删除这些商品吗？
				</view>
				<view class="cance-sbmer">
					<view class="cance" @click="$refs.popup.close()">
						取消
					</view>
					<view class="cance sbmer" @click="getsbmer">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import CartList from './cartList.vue';

export default {
	data() {
		return {
			menuTop: null,
			shopCartList: [], //购物车列表
			checkboxValue1: [],
			scrollposition: 0,
			totalamount: 0, // 合计金额
			cntitems: 0, // 购物车商品数量
			edit: true, //编辑取消
			listData: {
				page: 1,
				limit: 10,
			},
			status: "loading",
			refresherTriggered: false,
		};
	},
	components: {
		CartList
	},
	onLoad() {
		this.menuTop = uni.getMenuButtonBoundingClientRect()
	},
	onShow() {
		this.getList()
	},
	//计算属性
	computed: {
		totalamounts: {
			get() {
				let numDict = {};
				this.shopCartList.forEach(item => {
					if (item.optionMoney) {
						numDict[item.id] = item.number * +item.optionMoney;
					} else {
						numDict[item.id] = item.number * +item.goodsMoney;
					}
				});
				// 对data中的每个id求和其对应的num值
				let totalSum = this.checkboxValue1.reduce((sum, id) => {
					return sum + (numDict[id] || 0);
				}, 0);
				return totalSum
			},
			set(val) {

			}
		},
		isselectedall: {
			get() {
				if (this.checkboxValue1.length == this.shopCartList.length && this.shopCartList.length > 0) {
					return true;
				} else {
					return false;
				}
			},
			set(val) {
				if (val) {
					this.checkboxValue1 = this.shopCartList.map(item => item.id);
				} else {
					this.checkboxValue1 = [];
				}
			}
		},
	},
	methods: {
		//左滑删除
		getDelete(inx, e, options1) {
			this.getshopCartdelete(e.id)
		},
		//自定义下拉刷新被触发
		refresherrefresh() {
			this.refresherTriggered = true;
			this.status = "loading"
			this.listData.page = 1;
			this.getList()
		},
		//滚动到底部/右边，会触发 scrolltolower 事件
		scrolltolower() {
			if (this.status == "nomore") return;
			if (!this.loading) {
				this.listData.page++;
				this.status = "loading"
				this.getList(false);
			}
		},
		//获取购物车数据
		getList(state = true) {
			this.$request.get("/shop/shopCart/list", this.listData).then(res => {
				setTimeout(() => {
					this.loading = false;
				}, 200);
				this.refresherTriggered = false;
				if (res.code == 0) {
					if (this.listData.limit > res.data.length) {
						this.status = "nomore"
					} else {
						this.status = "loadmore"
					}
					if (state) {
						this.shopCartList = res.data;
						this.checkboxValue1 = res.data.map(item => item.id);
					} else {
						this.shopCartList.push(...res.data)
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			})
		},
		//编辑删除
		getsbmer() {
			this.getshopCartdelete(this.checkboxValue1.toString())
			this.$refs.popup.close()
		},
		change(number, item) {
			this.getmodifyNumber(item.id, number)
		},
		// 点击全选
		clickitemselectedall() {
			this.isselectedall = !this.isselectedall
		},
		//返回
		getleft() {
			uni.navigateBack()
		},
		//编辑
		getedit() {
			this.edit = !this.edit
		},
		//编辑删除 打开弹框
		creatDelete() {
			if (this.totalamounts == 0) {
				uni.showModal({
					content: '请选择删除的商品！'
				})
			} else {
				this.$refs.popup.open('center')
			}
		},
		//动态修改购物车数量
		async getmodifyNumber(id, number) {
			let data = {
				id: id,
				number: number,
			}
			await this.$request.get("/water-platform-app-api/shop/shopCart/modifyNumber", data).then(res => { })
		},
		//动态删除购物车
		async getshopCartdelete(id) {
			let data = {
				ids: id,
			}
			await this.$request.get("/water-platform-app-api/shop/shopCart/delete", data)
			this.getList()
		},
		// 生成订单
		createorder() {
			// 合计金额大于0 创建订单
			if (this.totalamounts == 0) {
				uni.showModal({
					content: '请选择下单的商品！'
				})
			} else {
				let numDict = {};
				this.shopCartList.forEach(item => {
					numDict[item.id] = item;
				});
				let totalSum = this.checkboxValue1.reduce((item, id, inds) => {
					if (this.checkboxValue1.length - 1 != inds) {
						item.goodsIds += numDict[id].goodsId + ","
						item.goodsOptionsIds += numDict[id].goodsOptionId + ","
						item.numbers += numDict[id].number + ","
					} else {
						item.goodsIds += numDict[id].goodsId
						item.goodsOptionsIds += numDict[id].goodsOptionId
						item.numbers += numDict[id].number
					}
					return item
				}, {
					goodsIds: "",
					goodsOptionsIds: "",
					numbers: ""
				});
				console.log(totalSum, "totalSumtotalSumtotalSum");
				this.$u.route({
					url: "/subpackageA/pages/mall/ConfirmOrderPlacement/ConfirmOrderPlacement",
					params: {
						data: JSON.stringify(totalSum),
						shoppingCartIds: this.checkboxValue1.toString()
					}
				})
			}
		},
	}
}
</script>

<style lang="scss">
.box {
	background-color: #F1F3F4;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.nodata {
	display: grid;
	place-content: center;
	height: 100%;

	.contents {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		image {
			width: 150px;
			height: 114px;
		}

		.text {
			font-size: 20rpx;
		}
	}

}

.popur {
	width: 552rpx;
	height: 264rpx;
	background: #FFFFFF;
	border-radius: 16rpx 16rpx 16rpx 16rpx;
	padding: 48rpx;
	box-sizing: border-box;

	.delete {
		font-size: 28rpx;
		color: #14171A;
		text-align: center;
	}

	.cance-sbmer {
		display: flex;
		justify-content: center;
		margin-top: 64rpx;

		.cance {
			width: 216rpx;
			height: 64rpx;
			border-radius: 100rpx 100rpx 100rpx 100rpx;
			font-size: 28rpx;
			color: #14171A;
			line-height: 64rpx;
			text-align: center;
			border: 2rpx solid #B5B6B6;
		}

		.sbmer {
			background: #2590FA;
			border: none;
			margin-left: 24rpx;
			color: #FFF;
		}
	}
}

.glance-shop-cart-items-item-opt-number-delete {
	width: 36rpx;
	height: 36rpx;
	background: #FA4225;
	color: #FFF;
	line-height: 36rpx;
	border-radius: 4rpx 4rpx 4rpx 4rpx;
	margin-left: auto;
}

.tito {
	display: flex;
	align-items: center;
	background: linear-gradient(360deg, rgba(212, 231, 250, 0) 10%, #D4E7FA 100%);
	padding: 0 30rpx;
	box-sizing: border-box;

	.text {
		font-weight: 600;
		font-size: 32rpx;
		color: #14171A;
		margin-left: 250rpx;
	}

	.edit {
		font-size: 24rpx;
		color: #14171A;
		margin-left: 58rpx;
	}
}

.shopCartList {
	margin-top: 32rpx;
	flex: 1;
	overflow: auto;

	.scrollsList {
		flex: 1;
		overflow: auto;
		height: 100%;
		padding: 0rpx 30rpx;
		box-sizing: border-box;

		.scrolls:first-child {
			margin-top: 0rpx;
		}

		.scrolls {
			background-color: #FFFFFF;
			margin-top: 24rpx;
			border-radius: 12rpx;
			display: flex;
			align-items: center;

			.checkbox {
				height: 100%;
				display: grid;
				padding-left: 32rpx;

			}

			.content {
				flex: 1;

				.content {
					flex: 1;
				}
			}
		}
	}

	// 单行文本样式
	.sigle-line-text {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: left;
	}

	.glance-shop-cart {
		height: 100%;
		// font-family: Arial, Helvetica, sans-serif;
		/* background-color: red; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	// 滑动item 样式
	.glance-shop-cart-scrollx-items {
		width: 100%;
		height: 90px;
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: space-between;
		// padding: 10px 0 10px 0;
		padding-top: 10px;
		box-sizing: border-box;
	}

	// 滑动区域内item 样式
	.glance-shop-cart-scrollx-items-item {
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
	}

	// // item 勾选样式
	// .glance-shop-cart-scrollx-items-item-sel {
	// 	position: relative;
	// 	top: 30%;
	// 	left: 60%;
	// }

	// item 描述信息样式
	.glance-shop-cart-items-item-des {
		width: 60%;
		height: 100%;
		display: -webkit-flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;
	}

	// 价格和数量样式
	.glance-shop-cart-items-item-pq {
		width: 100%;
		height: 33.33%;
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: space-between;
	}

	// 数量操作
	.glance-shop-cart-items-item-opt {
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		width: 50%;
		height: 100%;
		font-size: 20px;
		margin-right: 10px;
		text-align: center;
		color: #6C6C6C;
		line-height: 100%;

		// 减数量
		&-number-minus {
			border-style: solid;
			border-width: 1px 0px 1px 1px;
			border-color: #E0E0E0;
			width: 33.33%;
			height: 80%;
			position: relative;
			top: 25%;
			transform: translateY(-50%)
		}

		// 数量
		&-number {
			border-style: solid;
			border-width: 1px 1px 1px 1px;
			border-color: #E0E0E0;
			width: 33.33%;
			height: 80%;
			font-size: 13px;
			position: relative;
			top: 25%;
			transform: translateY(-50%);
		}

		// 加数量
		&-number-plus {
			border-style: solid;
			border-width: 1px 1px 1px 0;
			border-color: #E0E0E0;
			width: 33.33%;
			height: 80%;
			position: relative;
			top: 25%;
			transform: translateY(-50%);
		}
	}

	// 底部汇总和订单样式
	.glance-shop-cart-order {
		width: 100%;
		background-color: #ffffff;

		.cart-btn {
			flex: 1;
			height: 60px;
			display: flex;
			display: -webkit-flex;
			flex-flow: row nowrap;
			align-items: center;
			padding: 0 0 0 30rpx;
			box-sizing: border-box;
		}
	}

	// 合计金额样式
	.glance-shop-cart-total-cnt {
		// line-height: 40px;
		// font-size: 13px;
		// margin-left: 15px;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		flex: 1;
	}

	.xZh {
		font-size: 20rpx;
		color: #B1B2B2;
		margin-left: 42rpx;
		margin-top: 2rpx;
	}

	.money {
		font-size: 36rpx;
		color: #FA6B05;

		.icon {
			font-size: 28rpx;
		}
	}

	.hJi {
		font-size: 20rpx;
		color: #2E3033;
		margin-left: auto;
		margin-top: 2rpx;
	}

	// 合计金额样式
	.glance-shop-cart-total-amt {

		margin-right: 15px;
		line-height: 40px;
		font-size: 16px;
		margin-left: 10px;
		color: #f40;
	}

	// 生成订单样式
	.glance-shop-cart-create-order {
		width: 176rpx;
		height: 72rpx;
		background: linear-gradient(144deg, #FAA805 0%, #FA6B05 100%);
		border-radius: 100rpx 100rpx 100rpx 100rpx;
		font-weight: 600;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 72rpx;
		text-align: center;
		margin-left: 16rpx;
		margin-right: 30rpx;
	}

	// item 选择样式
	// 不勾选
	.glance-shop-cart-itemunselected-img {
		width: 16px;
		height: 16px;
		border: solid 1px lightgray;
		border-radius: 50%;
	}

	// 勾选
	.glance-shop-cart-itemselected-img {
		width: 20px;
		height: 20px;
		background-size: 20px 20px;
		background-repeat: no-repeat;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC+ElEQVRYR8WXy2vUUBTGv5OZpCIqRexDp8miYpOBurEuFLQKirR26wsKgv4F/gW2de9G16IbQbFrW0TEtjtfiKiT6dQuklatuJCWgk0mcySxHSeTTPMYYbLL5J7v+91zz9x7LqHFD7XYH7EBSkAbK9lBh2kIhOME6gI4xwyHiFYA/sqMVwBPO2b5ZT9gxZlcLICiLF1m4jsAdcYRZeC7wLihmtbjqPHbAix2ostqk+6DMBwlFPqdMSVtWNd6f2ClUXxDgPlcZqQiCA9AtC+V+VYQ808Gj+bN8rMwnVCAgpw9R6BpEMVaokhAZgbzeW2pPF0/NmBQ7EGOBfEjQO2RwokG8C+q2P3qEpZrwwIAuizOguhkIu24g5nnNNMebAig5zIXkMk8iauXapzjXNSWncmtWF8GdEX6AqA3lXBNEDOXiagEIB+itagZ1sEAQEERBwj0pllzgFeJcVY17de6LM6B6ES9JoOP5g37rft7NQMFRRonYKw5AF4VHJzqW7bfl7rR4YjiJxB1BAEwkTescR+ArojPATqTHqDOXJJmAWjhevxCM2zP618GZKlIhL50AEnMAWbM501LrQMQ14loZwhAIbthnXYkcZSB28HNKZm5q8/M63nT3lW/BKsA7Q4DUA3rMAFOURGvMsPdnjczl9z8rz6vaYa9pw5A0gF4aQl5JlXDuuKHwJqv4LZd84BiUTMsrz6qNRCjCH0Q5OBDtdqTmbsZCBZhsSd7kwVhIqIIqxDuOO+vltgcoEplTF0q3/JloLRfPOKI5G0OcSAWurE3jbmrnbF54NA3+50PwH3RZWkBhOo22QiEgc/EaAfhQBRtyPfwrdgDaPVh5EIUZHGGiHxHZopZhodEHcduVMsbEm8perJDEISp/zhztycbCusLG/Z8m33hw5Y0pVszd9vyjR3SPQJGUmbjqfTbup6qLa811BXpEsB3419MeEVgci8mj6LAY7fdNVezYRCONbqaZYinLKM881+vZlGzaOZ77Aw0Y7Jd7B9C42gwboolDgAAAABJRU5ErkJggg==)
	}

	.glance-shop-cart-del {
		display: inline-block;
		width: 18%;
		height: 90px;
		background-color: red;
	}

	// 删除商品背景样式
	.glance-shop-cart-del-img {
		width: 30px;
		height: 30px;
		background-repeat: no-repeat;
		position: relative;
		top: 25%;
		transform: translateY(-50%);
		left: 50%;
		transform: translateX(-50%);
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABoklEQVRYR+2XTSttURzGf08kLzHxBUgpE4qSMvAhcOtmxPhkYmxgSpmRqYnXGN3u7M7uxOhmcKUU8g2QZMCjddpOB/s4i72ltPdw77We9dvPf708S3zxo9jxbTcDs8AY0Faj3w3wB1iRdBej/R6ADeAHcAhc1xBvBwaAXUk/8wa4BJYlLbwlbDt8L0nqzA3AdnDqHpiQtF8HYBzYkdSQG0AQsj0C/JdUy/7yeLY7gD5JB+8CsD0MtMZ0yqHNhaTToFOZhLaPAnkO4jES/yQNPgOI6fUZbV4tQ9vdwJykUp4D2l4FFiWdV+umAYS1vi0peo+IAbXtsI9I2i0APuRAUsMlSWdPArangAdJm1XvUudQ5hKkCdgO9bSkMG+eNqLUOVQAFA4UDhQOfAsHQiacrM6EtreSnbCSgG2nZsI8HHiVCW33JADlePVWJswMEHPm10nL0XlgIrlYfEYgCbF+r95xPAr8TaL1cdY/T8rSn9yoeiWd1ANoTAC6gHXgNiNECzAN/JI081Ir1Wbb4X4wDwwBTRkBroA1Sb/TdHKt80dAHwFIXaswp43kfwAAAABJRU5ErkJggg==)
	}

	// 空购物车背景样式
	.glance-shop-cart-nullcart {
		width: 120px;
		height: 120px;
		position: relative;
		transform: translateY(-50%);
		left: 50%;
		transform: translateX(-50%);
		background-repeat: no-repeat;
		background-image: url(data:image/png;base64,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)
	}

	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}
}
</style>