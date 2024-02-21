<template>
  <view class="vcodePage commonPage">
    <view class="mobile-sign-t">
      输入验证码
    </view>
    <view class="mobile-sign-text">
      验证码已发送至<text class="mobile-txt u-padding-left-10">{{ mobile }}</text> 
    </view>
    <view class="mobile-box u-flex u-row-between">
      <view class="mobile-box-warp">
        <u-message-input
          class="mobile-box-item"
          mode="box"
          width="130"
          :focus="true"
          @finish="finishCode"
        />
        <!-- :breathe="true" -->
      </view>
    </view>
    <view class="mobile-sign-text u-padding-top-50">
      <view
        v-if="isSms"
        class="send-code"
        @click="handleSend"
      >
        获取验证码
      </view>
      <view v-else>
        剩余 {{ sms }} 秒
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "VerifyCode",
  data() {
    return {
      mobile: '',
      isSms: true,
      sms: 60,
    };
  },
  onLoad() {
    this.mobile = uni.getStorageSync("codePhone")
    
    this.isSms = false;
    this.timer = setInterval(() => {
      if (--this.sms <= 0) {
        this.sms = 60;
        this.isSms = true;
        clearInterval(this.timer);
      }
    }, 1000);
  },
  methods: {
    finishCode(e) {
      console.log(e)
      // 跳转
    },
    async handleSend() {
      uni.vibrateShort({})
      uni.showLoading({
          title: '正在发送'
      });
      const data = await this.$getRequest(this.$url.getIdentifyingCode, 'POST', {
        mobile: this.mobile
      })
      uni.hideLoading();
      
      if(data.code != 0) {
        uni.showToast({
          title: '验证码获取失败，请重试',
          duration: 1500
        });  
      } else {
        uni.showToast({
          title: '验证码已发送',
          duration: 1500
        });
      }
    },
    handleLogin(e) {
      console.log(e);
    },
    
  },
};
</script>
<style lang="scss">
  .vcodePage {
    .u-char-flex {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      justify-content: space-between !important;
    }
  }
</style>
<style lang="scss" scoped>
  .vcodePage {
    padding: 236rpx 50rpx;
    .mobile-sign-t {
      font-size: 48rpx;
      font-weight: bold;
      color: #333333;
    }
    .mobile-sign-text {
      padding-top: 18rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
      
      .mobile-txt {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }
    }
    .mobile-box {
      margin-top: 50rpx;
      
      .send-code {
        color: rgba(10, 15, 45, 0.3);
        font-size: 28rpx;
      }
      .mobile-box-value {
        color: #0A0F2D;
      }
    }
  }
  .mobile-box-warp {
    width: 100%;
  }
  .mobile-box ::v-deep .u-char-box {
      width: 100%;
  }
  .mobile-box ::v-deep .u-box {
    width: 100%;
    background: rgba(10, 15, 45, 0.04);
    border: none;
    border-radius: 16rpx;
  }
   
</style>
