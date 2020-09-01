<template>
  <div class="goods-details" @scroll="onScroll">
    <!-- 标题 -->
    <van-nav-bar title="商品详情" :style="navbarStyle">
      <div slot="left" @click="$router.back()">
        <img :src="navbarLeftImg" alt="">
      </div>
    </van-nav-bar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
      <van-swipe-item v-for="(item, index) in goods.swiperImgs" :key="index">
        <img slot="default" :src="item" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <!-- 商品介绍 -->
    <van-cell :title="'￥' + goods.price" size="large" class="goods-referral">
      <div slot="label">
        <span v-if="goods.isDirect">直营</span>
        {{ goods.name }}
      </div>
    </van-cell>
    <!-- 商品参数 -->
    <van-cell class="goods-param">
      <div slot="title">
        已选
        <span>{{ goods.name }}</span>
      </div>
      <div slot="label">
        <ul>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>可配送海外</span>
          </li>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>京东发货&amp;售后</span>
          </li>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>京准达</span>
          </li>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>211限时达</span>
          </li>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>可自提</span>
          </li>
          <li>
            <img src="@/assets/img/33.svg" alt="">
            <span>不可使用优惠卷</span>
          </li>
        </ul>
      </div>
    </van-cell>
    <!-- 商品展示 -->
    <div class="goods-show">
      <ul>
        <li v-for="(item, index) in goods.detailImgs" :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>
    <!-- 加入购物车立即购买 -->
    <div class="footer">
      <!-- 加入购物车 -->
      <van-button type="warning" class="shopping-cart" @click="addShoppingCart">加入购物车</van-button>
      <!-- 立即购买 -->
      <van-button
        type="warning"
        class="buy-now"
        @click="$router.push({name:'buynow',params:{
        id:id,
        routerType:'push'
      }})"
      >立即购买</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsdetails',
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      current: 0,
      goods: {},
      scrollTopValue: 0,
      ANCHOR_SCROLL_TOP: 66,
      navbarStyle: {
        backgroundColor: 'rgba(216, 30, 6, 0)',
        color: 'rgba(255,255,255,0)',
      },
      navbarLeftImg: require('@/assets/img/44.svg'),
    }
  },
  created() {
    this.getGoodsDate()
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    // 获取商品数据
    async getGoodsDate() {
      try {
        const { data } = await this.$http.get(`/goodsDetail?goodsId=${this.id}&token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0`)
        this.goods = data.data.goodsData
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 加入购物车
    addShoppingCart() {
      this.$dialog
        .confirm({
          message: '您是否要跳转到购物车?',
        })
        .then(() => {
          this.$router.push({
            name: 'shopping',
            params: {
              routerType: 'push',
            },
          })
        })
      this.$store.commit('addGoods', this.goods)
    },
    onScroll($event) {
      // console.log($event.target.scrollTop)
      this.scrollTopValue = $event.target.scrollTop
      const opcity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if (opcity >= 1) {
        this.navbarLeftImg = require('@/assets/img/55.svg')
      } else {
        this.navbarLeftImg = require('@/assets/img/44.svg')
      }
      this.navbarStyle.backgroundColor = `rgba(216, 30, 6, ${opcity})`
      this.navbarStyle.color = `rgba(255,255,255,${opcity})`
    },
  },
}
</script>
<style lang="less" scoped>
.goods-details {
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 94px;
  background-color: #eee;
  // 标题
  .van-nav-bar {
    height: 132px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /deep/ .van-nav-bar__title {
      color: unset;
      font-weight: 700;
    }
    /deep/ .van-nav-bar__left {
      img {
        width: 52px;
        height: 52px;
      }
    }
  }
  /deep/ .van-hairline--bottom::after {
    border-bottom: unset;
  }
  // 轮播图
  .my-swipe .van-swipe-item {
    height: 728px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .custom-indicator {
    position: absolute;
    box-sizing: border-box;
    right: 0;
    bottom: 70px;
    padding: 12px 36px;
    font-size: 40px;
    background: rgba(0, 0, 0, 0.3);
    height: 56px;
    width: 136px;
    line-height: 30px;
    border-radius: 56px 0 0 56px;
    color: #fff;
  }
  // 商品介绍
  .goods-referral {
    margin-bottom: 16px;
    .van-cell__title {
      > span {
        font-size: 40px;
        color: #d81e06;
        font-weight: 500;
      }
    }
    .van-cell__label {
      > div {
        font-size: 32px;
        color: #333;
        // font-weight: 700;
        > span {
          font-size: 24px;
          color: #fff;
          background-color: #d81e06;
          padding: 0 10px;
          border-radius: 5px;
          margin-right: 10px;
        }
      }
    }
  }
  // 商品参数
  .goods-param {
    height: 234px;
    padding: 0 20px;
    margin-bottom: 16px;
    .van-cell__title {
      color: #999;
      width: 100%;
      > div:nth-child(1) {
        padding-top: 20px;
        height: 90px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 28px;
        display: flex;
        align-items: center;
        > span {
          display: inline-block;
          width: 70%;
          font-size: 32px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 10px;
        }
      }
      .van-cell__label {
        height: 96px;
        padding-top: 20px;
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          li {
            font-size: 24px;
            margin-right: 20px;
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  // 商品展示
  .goods-show {
    width: 100%;
    > ul {
      width: 100%;
      > li {
        font-size: 0;
        width: 100%;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 94px;
    background-color: #fff;
    .shopping-cart,
    .buy-now {
      float: right;
      background-color: #d81e06;
      border: unset;
      border-radius: unset;
      width: 200px;
      height: 100%;
    }
    .buy-now {
      background-color: #b8860b;
    }
  }
}
</style>
