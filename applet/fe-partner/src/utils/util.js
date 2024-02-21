/**
 * 接口URL 共通方法
 * @Author: mmm
 * @Date: 2022-03-23
 */
// 开发
const serverUrl = process.env.NODE_ENV === "development" ? "https://api.51cheyaoshi.com/" : "https://api.51cheyaoshi.com/";
// https://partner.51cheyaoshi.com/
// http://47.100.3.41:8082/doc.html
// https://manager.wecar-rental.com/
// https://uat-api.51cheyaoshi.com/
// 腾讯地图key
const QQMapWXKey = 'ONYBZ-WH6KF-BAIJO-NWS5O-KM4LS-BSFY4';
// 接口URL
const url = {
  getOpenId: 'partner/app/xcx/getOpenId', // 获取openid
  getIdentifyingCode: 'app/xcx/getIdentifyingCode', //获取验证码
  decryptData: 'partner/app/xcx/wechat/decryptData', //获取手机号
  wechatLoginByOpenId: 'partner/app/xcx/wechatLoginByOpenId', //登录
  partnerUserInfoAll: 'app/partner/user/info', // 全部用户信息
  
  //首页
  partnerUserInfo: 'partner/app/index/getPartnerUserInfo', // 用户统计信息
  partnerUserStatistics: 'partner/app/index/getPartnerUserStatistics',
  partnerOrderStatistics: 'partner/app/index/getPartnerOrderSubscribeStatistics',
  
  // 首页-订单
  orderList: 'app/order/list', // 订单列表
  orderDetail: 'app/order/getOrderInfo', // 订单详情
  orderPageList: 'partner/order/pageList', // 订单列表
  
  orderPagelist:'/partner/partner/order/pageList',//首页订单列表
  orderDet:'/partner/partner/order/detail',//首页订单列表详情
  
  // 首页-客户
  getCustomerList: 'partner/app/PartnerUser/getUserList',
  cityList: "partner/app/CarSubscribe/openCityList", // 城市列表
  getCarBrandList: 'app/CarSubscribe/getCarBrandList',
  getCarTypeList: 'app/CarSubscribe/getCarTypeList',
  getCarTypeYearProductList: 'app/CarSubscribe/getCarTypeYearProductList',
  getLoginUserInfo: 'partner/app/index/getLoginUserInfo', // 登录用户信息
	getWecarsQrCode: 'partner/app/partner/product/createUnlimitedQrCode', // 获取wecars小程序码
	createCustomOrder: 'app/CarSubscribe/createUserCarSubscribe',
  unbindCorp: 'app/partner/user/delete',
  
  // 首页-钱包
  walletInfo: 'app/wallet/info',
  getWalletDetailList: 'app/wallet/detailList',
  getBankCardList: '/app/PartnerBankCard/bankCardList',
  bindBankCard: 'app/PartnerBankCard/bindBankCard',
  getIdentifyingCode: 'app/PartnerBankCard/getIdentifyingCode',
  unboundBankCard: 'app/PartnerBankCard/unboundBankCard',
  ocrBankCard: 'app/PartnerBankCard/ocrBankCard',
  applyWithdrawal: '/app/partner/account/add',
  
  // 我的
  updateAvatar: 'partner/app/partner/user/updateLogoImage',
  
  // 产品
  getCarSubscribeList: 'partner/app/partner/product/getPartnerCarSubscribeList', // 新车列表
	getCertCarList: 'partner/app/partner/product/partnerSecondCarList', // 二手车列表
	partnerProductDetail: 'partner/app/partner/product/partnerProductDetail', // 新车详情
	getSubscribeList: 'partner/app/partner/product/getPartnerSubscribeListByCarAndSubscribeType', // 新车方案列表
	partnerSecondCarDetail: 'partner/app/partner/product/partnerSecondCarDetail', // 二手车详情
  carSubscribeDetail: 'app/CarSubscribe/carSubscribeDetail',
  carSubscribeDetailCommission: 'app/CarSubscribe/carSubscribeDetailCommission',
  
  // 合作
  ocrIdcard: 'partner/app/partner/user/ocrIdcard', // 身份证 解析正反
  personRegister: 'partner/app/partner/user/personRegister',
  getCooperList: 'app/company/cooperation', // 
  ocrCorpcard: 'app/company/ocrBusinessLicense',
  corpRegister: 'app/company/register',
  
  // 通用
  // upload: 'sysFiles/upload', //上传
  upload: 'partner/sysFiles/upload', //上传
  
  // partner
  /* 以下暂未调试 */
  businessMessageListByPage: 'app/user/message/businessMessageListByPage', //业务消息列表
  marketingMessageListByPage: 'app/user/message/marketingMessageListByPage', //营销消息列表
  
  getAccountList: 'app/my/accountDetail', // 余额 列表明细
  getDepositList: 'app/my/depositDetail', // 押金 列表明细
  
  paymentOrder: 'app/order/paymentOrder', //支付
  cancelOrder: 'app/order/cancelOrder', //取消订单
  updateOrder: 'app/order/updateOrder', // 修改订单
  feedback: 'app/feedback/create', //提交反馈
  searchCarTypeYearProduct: 'app/product/searchCarTypeYearProduct', //搜索
  
  userAuditSubmit: 'app/audit/userAuditSubmit', //提交认证
  userInfo: 'app/my/userInfo', // 用户信息
  likeProduct: 'app/product/likeProduct', //收藏
  payOrder: 'wx/pay/createOrder', //支付
  get4sList: 'app/product/get4SList', // 4S店接口
  createUserIntention: 'app/product/createUserIntention', //创建意向
  addCar: 'app/mycar/addCar', //添加爱车
  getMyCars: 'app/mycar/getMyCars',  //获取车辆接口
  getMyCarInfo: 'app/mycar/getMyCarInfo', //获取车辆详情接口
  getUserCarReport: 'app/mycar/getUserCarReport', //体验报告
  updateCarMileage: 'app/mycar/updateCarMileage', //修改里程数
  updateTyre: 'app/mycar/updateTyre', //更新轮胎
  updateInsurance: 'app/mycar/updateInsurance', //更新保险
  getMaintainItem: 'app/mycar/getMaintainItem', //保养列表
  updateMaintain: 'app/mycar/updateMaintain', //更新保养
  createUserCarDrivingLicense: 'app/mycar/createUserCarDrivingLicense', //添加行驶证
  // createUserCarDrivingLicense: 'app/mycar/createUserCarDrivingLicense', //创建车辆
	
	selectPartnerTemplateList: 'partner/app/partner/product/selectPartnerTemplateList', // 查询模板想信息
};

/**
 * @description: 请求
 * @param {url, method, data}
 * @return:
 */
const getRequest = (url, method, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: serverUrl + url,
			//url: 'https://uat-api.51cheyaoshi.com/' + url,
			//url: 'http://api-test.51cheyaoshi.com:6999/' + url,
      method: method,
      data: data,
      headers: {
        "content-type": "multipart/form-data",
      },
      success: (res) => {
        console.log(url, res.data);
        if (res.data.code != 0 ) {
          uni.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
        resolve(res.data);
      },
      fail(err) {
        console.log(err);
      },
    });
  });
};

// loginRoute 登录后跳转的路由
const getUserProfile = (loginRoute, cb) => {
  uni.showToast({
    title: '',
    duration: 1000,
    icon: 'loading'
  });
  uni.getUserProfile({
    desc: "获取头像用于展示",
    success: (result) => {
      console.log('resultresult', result)
      uni.setStorageSync('userInfo', {
        name: result.userInfo.nickName,
        avatarUrl: result.userInfo.avatarUrl
      });
      getApp().globalData.route = loginRoute
      cb && cb()
    },
    complete: () =>{
      uni.hideToast()
    },
    fail: (error) => {
      console.log('errorres', error)
    }
  })
}

/**
 * @description: 上传OSS  callback
 * @param {tempFilePaths, 上传callback}
 * @return:
 */
 const getFileUpload = (url, tempFilePaths) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: serverUrl +url,
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'file': tempFilePaths[0]
      },
      success: (uploadFileRes) => {
        console.log(uploadFileRes)
        const result = JSON.parse(uploadFileRes.data);
        if (result.code != 0 ) {
          uni.showToast({
            title: result.msg,
            duration: 2000,
            icon: 'none'
          });
        }
        resolve(result);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  });
};

/**
 * 微信支付
 */
const requestPayment = async (data, cb ) => {
  const res = await getRequest(url.payOrder, 'POST', data)
  if(res.code != 0) {
    return false;
  }
  uni.requestPayment({
    provider: 'wxpay',
    timeStamp: res.data.timeStamp,
    nonceStr: res.data.nonceStr,
    package: res.data.packageValue,
    signType: res.data.signType,
    paySign: res.data.paySign,
    success: async (res) => {
      if(res.errMsg == 'requestPayment:ok') {
        // code 支付成功
        uni.showToast({
          title: '支付成功',
          duration: 2500
        });
        return cb && cb('success')
      } else {
        console.log('订单已取消');
        return cb && cb('fail')
      }
    },
    fail: async () => {
      // uni.showToast({
      //     title: '取消支付',
      //     duration: 2500
      // });
      return cb && cb('fail')
    }
  })
}

/**
 * 跳转html或下载显示
 * @param {Object} url
 * @param {Object} title
 */
const goHtml = function(url, title) {
  const length = url.length
  const newString = url.substring(length-4, length)
  const newString2 = newString.toLowerCase()
  if (newString2 == '.pdf') {
    uni.downloadFile({
      url: url,
      success: function(res) {
        const filepath = res.tempFilePath
        uni.openDocument({
          filePath: filepath,
        })
      }
    })
  } else {
    uni.navigateTo({
      url: '/pages/html/html?h5url=' + url + '&title=' + title
    })
  }
};

export {
  url,
  getRequest,
  getUserProfile,
  getFileUpload,
  requestPayment,
  goHtml
};
