<template>
  <view class="sign">
    <view class="sign-logo">
      <u-image
        width="180rpx"
        height="180rpx"
        src="https://image.51cheyaoshi.com/xcx/partner/static/logo.png"
      />
    </view>
    <view class="slogan">
      全民合伙人
    </view>
    <view class="btu-wx">
      <u-button
        :ripple="true"
        type="primary"
        open-type="getPhoneNumber"
        @getphonenumber="handleLogin"
      >
        <u-image
            width="56rpx"
            mode="aspectFit"
            height="70rpx"
            class="wx-icon"
            src="https://image.51cheyaoshi.com/xcx/partner/static/wx_icon.png"
        >
          <u-loading slot="loading" />
        </u-image>
        微信用户一键登录
      </u-button>
    </view>
    <!-- <view
      class="mobile-sign"
      @click="handleMobileSign"
    >
      手机号验证码登陆
    </view> -->
  </view> 
</template>

<script>
export default {
  name: "SignLogin",
  data() {
    return {
      title: "login",
      form: {
          name: "",
      },
      openId: '',
      session_key: ''
    };
  },
  onLoad() {
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: (loginRes) => {
        console.log(loginRes)
        this.$getRequest(this.$url.getOpenId, 'POST', {
            code: loginRes.code,
        }).then( async (res) => {
            this.openId = res.data.openid
            this.session_key = res.data.session_key
            console.log(this.session_key)
        }).catch(()=> {})
      }
    })

    getApp().globalData.getUserInfo((data) => {
      console.log(data);
      this.userInfo = data;
    })
  },
  methods: {
    handleMobileSign() {
      this.$u.route('/pages/sign/mobile-sign')
    },
    async login(data) {
      const pageThis = this
      uni.setStorageSync('token', data.token);
      const userInfo = uni.getStorageSync('userInfo');
      getApp().globalData.openId = this.openId;
      var mt = setInterval(intLogin, 500)
      
      function intLogin() {
        getApp().globalData.getMemberInfo(data.phoneNumber, userInfo.avatarUrl, userInfo.name, function(data) {
          if(data && data.username) {
            clearInterval(mt)
            uni.removeStorageSync('userInfo');
            uni.setStorageSync('openId', data.xcxOpenid);
            uni.showToast({
              title: '登录成功',
              duration: 1000,
              success: () => {
				  uni.setStorageSync('username',data.username)
                pageThis.$u.route({
                  type: 'navigateBack',
                  delta: 1,
                })
              }
            });
          }
        })
      }
    },
		
    async handleLogin(e) {
			const self = this;
			const  {encryptedData, iv } = e.detail;
			const data =  await this.$getRequest(this.$url.decryptData, 'POST', {
				encryptedData: encryptedData,
				iv: iv,
				sessionKey: this.session_key
			}).catch(()=> {})

			if(data.code != 0) {
				uni.showToast({
					title: '手机号获取失败',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			self.login(data.data);
		}
  },
};
</script>

<style lang="scss" scoped>
  .sign {
    text-align: center;
    .sign-logo {
      display: inline-block;
      margin-top: 300rpx;
      margin-bottom: 40rpx;
    }
    .slogan {
      font-family: zihun35hao-jindianyahei, zihun35hao;
      font-weight: normal;
      letter-spacing: 6rpx;
      color: #343434;
      margin-bottom: 320rpx;
      font-size: 40rpx;
    }
    .mobile-sign {
      margin-top: 40rpx;
      color: rgba(10, 15, 45, 0.8);
    }
    .wx-icon {
      margin-right: 24rpx;
    }
  }
  .btu-wx {
    margin: 0 80rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }
  .btu-wx ::v-deep button {
    background: #07C160;
    color: #ffffff;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 36rpx;
    font-weight: 600;
    border-radius: 50rpx;
  }
</style>
