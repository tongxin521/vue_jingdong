<template>
  <div class="buy-now-container">
    <!-- 标题 -->
    <van-nav-bar title="立即购买" left-arrow @click-left="$router.back()"/>
    <good-item :goodId="id"></good-item>
    <!-- 支付方式 -->
    <div class="payment-method" @click="isShow=true">
      <div class="left">
        <img src="@/assets/img/zhifubao.svg">
      </div>
      <div class="center">
        <p class="title">支付宝支付</p>
        <span class="price">数亿用户都在用,安全可托付</span>
      </div>
      <div class="right">
        <img v-if="isShow" src="@/assets/img/11.svg" alt="">
        <img v-else src="@/assets/img/22.svg" alt="">
      </div>
    </div>
    <div class="payment-method" @click="isShow=false">
      <div class="left">
        <img src="@/assets/img/weixin.png">
      </div>
      <div class="center">
        <p class="title">微信支付</p>
        <span class="price">亿万用户选择,更快更安全</span>
      </div>
      <div class="right">
        <img v-if="isShow" src="@/assets/img/22.svg" alt="">
        <img v-else src="@/assets/img/11.svg" alt="">
      </div>
    </div>
    <button class="btn-buy">立即购买</button>
  </div>
</template>
<script>
import GoodItem from '@/components/gooddetails/GoodItem.vue'
export default {
  name: 'buynow',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    GoodItem,
  },
  data() {
    return {
      goods: {},
      isShow: true,
    }
  },
  created() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.buy-now-container {
  .van-nav-bar {
    height: 134px;
  }
  .payment-method {
    height: 100px;
    border-bottom: 1px solid #e5e5e5;
    padding: 16px;
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    .left {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .center {
      flex: 1;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      p.title {
        margin: 0;
        font-size: 32px;
        color: #333;
      }
      span.price {
        font-size: 28px;
        color: #999;
      }
    }
    .right {
      width: 32px;
      height: 32px;
      // background-color: red;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .btn-buy {
    background-color: #d81e06;
    color: #fff;
    width: 90%;
    margin: 520px 40px 0;
    border: unset;
    height: 92px;
    border-radius: 46px;
    font-size: 32px;
  }
}
</style>
