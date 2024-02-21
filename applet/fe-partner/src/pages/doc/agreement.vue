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
</style>
