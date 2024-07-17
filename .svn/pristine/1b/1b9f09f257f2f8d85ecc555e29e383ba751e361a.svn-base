<template>
	<view class="box">
		<view class="conter">
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="userForm" labelWidth="70"
				:labelStyle="{ fontSize: '28rpx' }">
				<u-form-item prop="addss" label="签约地址">
					<view style="background: #F3F5F6;border-radius: 12rpx; position: relative;">
						<u-input placeholder="省、市、区" suffixIcon="arrow-right" ref="data7"
							suffixIconStyle="color: #909399" v-model="userInfo.addss"></u-input>
						<view style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
							@click="areaNmaeFocus"></view>
					</view>
				</u-form-item>
				<u-form-item prop="agencyType" label="签约类型">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<uni-data-select class="number-icon" v-model="userInfo.agencyType" :localdata="range"
							@change="change" :clear="false"></uni-data-select>
					</view>
				</u-form-item>
				<u-form-item prop="remark" label="备注" style="flex-direction: column;">
					<view style="background: #F0F3F5;border-radius: 12rpx;">
						<u-textarea v-model="userInfo.remark" placeholder="选填"></u-textarea>
					</view>
				</u-form-item>
			</u--form>
			<u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" @change="changeHandler"
				:loading="loadingPicker" @cancel="cancel"></u-picker>
		</view>
		<view class="bottom-btn">
			<view class="btn">
				<view @click="submit">下一步</view>
			</view>
			<safe-bottom-x></safe-bottom-x>
		</view>
	</view>
</template>

<script>
	import {
		updateAddress,
		addressRegionList,
		contractAgencyRemain
	} from "@/api/api.js"
	export default {
		data() {
			return {
				userInfo: {
					agencyProvinceId: "", //省份id
					agencyCityId: "", //城市id
					agencyAreaId: "", //区域id
					agencyType: 1, //代理商用户类型: 1-发起人, 2-服务股东, 3-推广股东
					remark: '', //备注
					addss: '',
					contractRecordId: '', //合同记录ID
					status: "",
				},
				show: false,
				columns: [
					[],
					[],
					[]
				],
				range: [{
						value: 1,
						text: "发起人"
					},
					{
						value: 2,
						text: "服务股东"
					},
					{
						value: 3,
						text: "推广股东"
					},
					// {
					// 	value: 4,
					// 	text: "普通员工(22)"
					// },
				],
				loadingPicker: false,
				rules: {
					'addss': {
						type: 'string',
						required: true,
						message: '签约地址不能为空',
						trigger: ['change']
					},
					'agencyType': {
						type: 'number',
						required: true,
						message: '签约类型不能为空',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onLoad(ope) {
			if (ope.contractRecordId) {
				this.userInfo.contractRecordId = ope.contractRecordId
				this.userInfo.agencyProvinceId = ope.agencyProvinceId
				this.userInfo.agencyCityId = ope.agencyCityId
				this.userInfo.agencyAreaId = ope.agencyAreaId
				this.userInfo.addss = ope.addss
				this.userInfo.agencyType = this.range[ope.agencyType - 1].value
			}
			if (ope.status) {
				this.status = ope.status
			}
			this.regionList(this.columns, 0)
			if (this.userInfo.agencyProvinceId != 0 && this.userInfo.agencyCityId != 0 && this.userInfo.agencyAreaId != 0) {
				this.agencyRemain()
			}
		},
		methods: {
			//代理商各角色剩余名额
			agencyRemain() {
				let data = {
					agencyProvinceId: this.userInfo.agencyProvinceId,
					agencyCityId: this.userInfo.agencyCityId,
					agencyAreaId: this.userInfo.agencyAreaId,
				}
				contractAgencyRemain(data).then(res => {
					if (res.data) {
						this.range[0].text = `发起人(${res.data.totalBoss})`
						this.range[1].text = `服务股东(${res.data.totalService})`
						this.range[2].text = `推广股东(${res.data.totalShare})`
					}
				})
			},

			changeHandler(e) {
				console.log('e::: ', e);
				const {
					columnIndex,
					value,
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				this.regionList(this.columns, columnIndex + 1, {
					level: value[columnIndex].level + 1,
					parentId: value[columnIndex].id
				})
			},
			change(e) {
				console.log("e:", e);
			},
			cancel() {
				this.show = false
			},
			// 回调参数为包含columnIndex、value、values
			confirm({
				value
			}) {
				console.log('value::: ', value);
				let str = ""
				value.forEach((item, index) => {
					if (str.length > 0) {
						str += '-';
					}
					str += item.name
					if (index == 0) {
						this.$set(this.userInfo, 'agencyProvinceId', item.id)
					} else if (index == 1) {
						this.$set(this.userInfo, 'agencyCityId', item.id)
					} else if (index == 2) {
						this.$set(this.userInfo, 'agencyAreaId', item.id)
					}
				})
				this.agencyRemain()
				this.userInfo.addss = str
				this.show = false
			},
			areaNmaeFocus() {
				this.show = true;
			},
			regionList(arr, key, data = {
				level: 1,
				parentId: 0
			}) {
				const {
					parentId,
					level
				} = data
				if (level == 4) return
				addressRegionList(data, ).then(res => {
					if (res.code == 0) {
						console.log(res);
						this.$set(arr, key, res.data)
						this.regionList(arr, key + 1, {
							level: level + 1,
							parentId: res.data[0].id
						})
					}
				})
			},
			submit() {
				this.$refs["userForm"].validate().then(async res => {
					let contract = await updateAddress(this.userInfo)
					if (contract.code == 0) {
						uni.$u.route({
							url: '/subpackageA/pages/my/contractManagement/contractDetails',
							params: {
								contractRecordId: this.userInfo.contractRecordId,
								status: this.status,
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100vh;
		background-color: #F3F5F6;
		display: flex;
		flex-direction: column;
	}

	.conter {
		background: #FFFFFF;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin: 0 32rpx;
		padding: 32rpx;
		box-sizing: border-box;
		// overflow: auto;

		::v-deep .u-textarea {
			background: #F3F5F6 !important;
			border-radius: 12rpx;
		}
	}

	.bottom-btn {
		background: #fff;
		margin-top: auto;

		.btn {
			padding: 24rpx 30rpx;
			box-sizing: border-box;

			view {
				height: 88rpx;
				background: #2590FA;
				border-radius: 8rpx;
				display: grid;
				place-content: center;
				color: #fff;
			}
		}
	}
</style>