import request from "./request.js";

//登录
export const login = (data) => {
  return request({
    url: "/customer/login/accountLogin",
    method: "get",
    data,
  });
};
// 微信登录
export const wxLogin = (data)=>{
	return request({
	  url: "/customer/login/miniRegisterV1",
	  method: "get",
	  data,
	});
}
//找回密码
export const loginReset = (data) => {
  return request({
    url: "/customer/login/reset",
    method: "get",
    data,
  });
};

//通过code获得openid
export const getOpenid = (data) => {
  return request({
    url: "/customer/login/getOpenid",
    method: "POST",
    data,
    header: "application/x-www-form-urlencoded",
  });
};

//注册
export const loginRegister = (data) => {
  return request({
    url: "/customer/login/register",
    method: "get",
    data,
  });
};

//行政区域
export const regionList = (data) => {
  return request({
    url: "/customer/address/regionList",
    method: "get",
    data,
  });
};

//发送验证码
export const sendSms = (data) => {
  return request({
    url: "/customer/login/sendSms",
    method: "get",
    data,
  });
};

//取水下单
export const orderSave = (data) => {
  return request({
    url: "/sell/order/save",
    method: "get",
    data,
  });
};

//取水套餐
export const orderInfo = (data) => {
  return request({
    url: "/sell/order/info",
    method: "get",
    data,
  });
};

//取水介绍 和二维码前缀
export const sellEquipInfo = (data) => {
  return request({
    url: "/sell/sellEquip/info",
    method: "get",
    data,
  });
};
//积分列表
export const integralRecordInfo = (data) => {
  return request({
    url: "/customer/integralRecord/info",
    method: "get",
    data,
  });
};

//积分签到
export const signin = (data) => {
  return request({
    url: "/customer/integralRecord/sign",
    method: "get",
    data,
  });
};

//积分明细列表
export const integralRecordList = (data) => {
  return request({
    url: "/customer/integralRecord/list",
    method: "get",
    data,
  });
};

//优惠劵列表
export const getcouponlist = (data) => {
  return request({
    url: "/customer/coupon/list",
    method: "get",
    data,
  });
};

//获取用户信息
export const customerInfo = (data) => {
  return request({
    url: "/customer/customer/info",
    method: "get",
    data,
  });
};
//修改头像
export const customerUpdatePhoto = (data) => {
  return request({
    url: "/customer/customer/updatePhoto",
    method: "get",
    data,
  });
};
//修改昵称
export const customerUpdateNickname = (data) => {
  return request({
    url: "/customer/customer/updateNickname",
    method: "get",
    data,
  });
};
//修改电话
export const customerUpdatePhone = (data) => {
  return request({
    url: "/customer/customer/updatePhone",
    method: "get",
    data,
  });
};

//获取验证码
export const loginSendSms = (data) => {
  return request({
    url: "/customer/login/sendSms",
    method: "get",
    data,
  });
};

//银行卡列表
export const bankCardList = (data) => {
  return request({
    url: "/customer/bankCard/list",
    method: "get",
    data,
  });
};
//银行列表
export const bankCardBankList = (data) => {
  return request({
    url: "/customer/bankCard/bankList",
    method: "get",
    data,
  });
};

//添加银行卡
export const saveAddr = (data) => {
  return request({
    url: "/customer/bankCard/save",
    method: "get",
    data,
  });
};

//发起提现
export const withdrawal = (data) => {
  return request({
    url: "/customer/withdrawlRecord/save",
    method: "get",
    data,
  });
};

//我的设备 设备列表
export const productList = (data) => {
  return request({
    url: "/product/product/list",
    method: "get",
    data,
  });
};

//设备使用
export const productSetUse = (data) => {
  return request({
    url: "/product/product/setUse",
    method: "get",
    data,
  });
};

//添加设备
export const productActivate = (data) => {
  return request({
    url: "/product/product/activate",
    method: "get",
    data,
  });
};

//设备修改名字
export const productSetNamee = (data) => {
  return request({
    url: "/product/product/setName",
    method: "get",
    data,
  });
};

//行政区域
export const addressRegionList = (data) => {
  return request({
    url: "/customer/address/regionList",
    method: "get",
    data,
  });
};

//套餐列表
export const setMealList = (data) => {
  return request({
    url: "/customer/rechargeLog/setMealList",
    method: "get",
    data,
  });
};

//套餐支付
export const rechargeLogSave = (data) => {
  return request({
    url: "/customer/rechargeLog/save",
    method: "get",
    data,
  });
};

//设备售后 申请
export const aftersalesSave = (data) => {
  return request({
    url: "/customer/aftersales/save",
    method: "get",
    data,
  });
};

//我的售后 列表
export const aftersalesList = (data) => {
  return request({
    url: "/customer/aftersales/list",
    method: "get",
    data,
  });
};

//我的售后 详情
export const aftersalesSingle = (data) => {
  return request({
    url: "/customer/aftersales/single",
    method: "get",
    data,
  });
};

//推荐商品 列表
export const goodsList = (data) => {
  return request({
    url: "/home/home/goodsList",
    method: "get",
    data,
  });
};

//文章分类和推荐分类
export const article = (data) => {
  return request({
    url: "/home/home/article",
    method: "get",
    data,
  });
};

//文章列表
export const getligthList = (data) => {
  return request({
    url: "/home/article/list",
    method: "get",
    data,
  });
};

//文章详情
export const ligthList = (data) => {
  return request({
    url: "/home/article/detail",
    method: "get",
    data,
  });
};

//获取轮播图列表
export const getbanner = (data) => {
  return request({
    url: "/home/home/banner",
    method: "get",
    data,
  });
};

//提现列表
export const withdrawlRecordList = (data) => {
  return request({
    url: "/customer/withdrawlRecord/list",
    method: "get",
    data,
  });
};

//充值列表
export const rechargeLogList = (data) => {
  return request({
    url: "/customer/rechargeLog/list",
    method: "get",
    data,
  });
};

//充值列表
export const cardList = (data) => {
  return request({
    url: "/customer/bankCard/list",
    method: "get",
    data,
  });
};

//解绑银行卡
export const bankCardDelete = (data) => {
  return request({
    url: "/customer/bankCard/delete",
    method: "get",
    data,
  });
};

//余额 明细列表
export const accountList = (data) => {
  return request({
    url: "/customer/account/list",
    method: "get",
    data,
  });
};

//余额 统计
export const accountStatistics = (data) => {
  return request({
    url: "/customer/account/statistics",
    method: "get",
    data,
  });
};

//我的饮水 列表
export const drinkDataList = (data) => {
  return request({
    url: "/product/drinkData/list",
    method: "get",
    data,
  });
};

//邀请好友页面数据
export const shareInfo = (data) => {
  return request({
    url: "/customer/share/info",
    method: "get",
    data,
  });
};

//已邀请人员列表
export const shareList = (data) => {
  return request({
    url: "/customer/share/list",
    method: "get",
    data,
  });
};

//设备id 获取信息
export const productDetail = (data) => {
  return request({
    url: "/product/product/detail",
    method: "get",
    data,
  });
};

//设备 滤芯复位(增加滤芯编号)
export const suppliesResetByCode = (data) => {
  return request({
    url: "/product/product/suppliesResetByCode",
    method: "get",
    data,
  });
};

//设备同步 服务器发给设备
export const syncResponse = (data) => {
  return request({
    url: "/product/product/syncResponse",
    method: "get",
    data,
  });
};

//设备同步 设备同步给后端
export const productSyncData = (data) => {
  return request({
    url: "/product/product/syncData",
    method: "get",
    data,
  });
};

//设备同步 不是蓝牙设备
export const productSendCommand = (data) => {
  return request({
    url: "/product/product/sendCommand",
    method: "get",
    data,
  });
};

//设备 滤芯复位 不是蓝牙设备
export const productSuppliesReset = (data) => {
  return request({
    url: "/product/product/suppliesReset",
    method: "get",
    data,
  });
};

// 意见反馈
export const faqFeedback = (data) => {
  return request({
    url: "/customer/faq/feedback",
    method: "get",
    data,
  });
};

// 获得售后订单商品
export const orderItemInfo = (data) => {
  return request({
    url: "/shop/goodsOrderAftersales/orderItemInfo",
    method: "get",
    data,
  });
};

// 发起售后
export const goodsOrderAftersalesSave = (data) => {
  return request({
    url: "/shop/goodsOrderAftersales/save",
    method: "get",
    data,
  });
};

// 售后详情
export const goodsOrderAftersalesDetail = (data) => {
  return request({
    url: "/shop/goodsOrderAftersales/detail",
    method: "get",
    data,
  });
};

// 获得售后订单商品
export const goodsOrderAftersalesOrderItemInfo = (data) => {
  return request({
    url: "/shop/goodsOrderAftersales/orderItemInfo",
    method: "get",
    data,
  });
};

// 取消售后
export const goodsOrderAftersalesCancel = (data) => {
  return request({
    url: "/shop/goodsOrderAftersales/cancel",
    method: "get",
    data,
  });
};

// 合同列表
export const contractList = (data) => {
  return request({
    url: "/customer/contract/list",
    method: "get",
    data,
  });
};

// 修改签约地址
export const updateAddress = (data) => {
  return request({
    url: "/customer/contract/updateAddress",
    method: "get",
    data,
  });
};

// 合同预览(签名前)
export const contractPreview = (data, responseType) => {
  return request({
    url: "/customer/contract/preview",
    method: "get",
    data,
    responseType,
  });
};

// 合同预览(签名前)
export const contractSave = (data, responseType) => {
  return request({
    url: "/customer/contract/save",
    method: "get",
    data,
    responseType,
  });
};

// 拒绝签名
export const contractRefuse = (data, responseType) => {
  return request({
    url: "/customer/contract/refuse",
    method: "get",
    data,
    responseType,
  });
};

// 代理商各角色剩余名额
export const contractAgencyRemain = (data, responseType) => {
  return request({
    url: "/customer/contract/agencyRemain",
    method: "get",
    data,
    responseType,
  });
};

// 收益 收益列表
export const distributionIncomeList = (data) => {
  return request({
    url: "/customer/distribution/incomeList",
    method: "get",
    data,
  });
};

// 收益 收益数据(累计总收益/本月预估/上月结算)
export const distributionIncomeData = (data) => {
  return request({
    url: "/customer/distribution/incomeData",
    method: "get",
    data,
  });
};

// 收益 收益统计图
export const distributionStatisticsIncome = (data) => {
  return request({
    url: "/customer/distribution/statisticsIncome",
    method: "get",
    data,
  });
};

//我的团队列表
export const teamList = (data) => {
  return request({
    url: "/customer/team/list",
    method: "get",
    data,
  });
};

// 我的团队列表统计
export const teamStatistics = (data) => {
  return request({
    url: "/customer/team/statistics",
    method: "get",
    data,
  });
};

//  用户使用协议
export const loginAgreement = (data) => {
  return request({
    url: "/customer/login/agreement",
    method: "get",
    data,
  });
};

//  生成绑定
export const productBind = (data) => {
  return request({
    url: "/product/product/bind",
    method: "get",
    data,
  });
};

//  打印二维码
export const printerQrCode = (data) => {
  return request({
    url: "/product/product/printerQrCode",
    method: "get",
    data,
  });
};

// 获取产品编号
export const getProductCode = (data)=>{
	return request({
	  url: "/product/product/getCode",
	  method: "get",
	  data,
	});
}
