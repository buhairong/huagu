<template>
  <view class="faqPage commonPage">
	  
	  <web-view :src="url" bindmessage="getMessage"></web-view>
  <!--  <u-collapse :item-style="itemStyle" :head-style="headStyle" event-type="close" :accordion="accordion">
      <u-collapse-item
        v-for="(item, index) in itemList"
        :index="index"
        :title="item.head"
        :key="index"
        :open="item.open"
        :disabled="item.disabled"
        @change="itemChange"
      >
        <view class="m-qa">{{ 'Q' + index}}</view>
        <view class="collapse-item">
          {{item.body}}
        </view>
      </u-collapse-item>
    </u-collapse>
 -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
		url:'',
        itemStyle: {
          paddingTop: '5px',
          paddingBottom: '5px',
          borderBottom: '0.5px solid #E6E6E6',
        },
        headStyle: {
          paddingLeft: '35px',
          fontSize: '32rpx',
          fontWeight: 'bold',
          color: '#333333',
        }
      }
    },
    methods: {
      
    },
	onLoad(options) {
		this.url = options.url;
	}

  }
</script>

<style lang="scss" scoped>
.faqPage {
  padding: 66rpx 40rpx;
  .collapse-item {
    // padding-bottom: 10px;
    padding: 0 40rpx 24rpx 70rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666660;
  }
  .m-qa {
    width: 24px;
    max-height: 22px;
    border-radius: 12rpx;
    background: #31C37B;
    padding: 10rpx;
    font-size: 10px;
    font-weight: bold;
    color: #FFFFFF;
    position: absolute;
    margin-top: -30px;
    line-height: 12px;
    border-bottom-left-radius: initial;
  }
}
</style>
