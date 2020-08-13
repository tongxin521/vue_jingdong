<template>
  <div class="page-container">
    <!-- 头部搜索框区域 -->
    <van-nav-bar class="navBar" ref="navBar" @scroll="onScrollChange">
      <span slot="left" class="iconfont icon-gengduo"></span>
      <van-button slot="title" icon="search" round class="btn-search">大前端开发，混合京东商城系统</van-button>
      <span slot="right" class="iconfont icon-dkw_xiaoxi"></span>
    </van-nav-bar>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in slideshow" :key="item.id">
        <img class="slideshow-img" slot="default" :src="item.icon" />
      </van-swipe-item>
    </van-swipe>
    <!-- 活动内容模块 -->
    <div class="activity">
      <div class="activity-item" v-for="item in activitys" :key="item.id">
        <img :src="item.icon" alt />
      </div>
    </div>
    <!-- 商品导航模块 -->
    <van-grid :column-num="5" class="shopping-nav">
      <van-grid-item text="京东超市" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/1.png" />
      </van-grid-item>
      <van-grid-item text="海屯全球" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/2.png" />
      </van-grid-item>
      <van-grid-item text="京东服饰" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/3.png" />
      </van-grid-item>
      <van-grid-item text="京东生鲜" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/4.png" />
      </van-grid-item>
      <van-grid-item text="京东到家" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/5.png" />
      </van-grid-item>
      <van-grid-item text="充值缴费" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/6.png" />
      </van-grid-item>
      <van-grid-item text="9.9元拼" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/7.png" />
      </van-grid-item>
      <van-grid-item text="领劵" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/8.png" />
      </van-grid-item>
      <van-grid-item text="赚钱" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/9.png" />
      </van-grid-item>
      <van-grid-item text="全部" @click="$router.push('/goods/list')">
        <img slot="icon" src="@/assets/img/10.png" />
      </van-grid-item>
    </van-grid>
    <!-- 京东秒杀模块 -->
    <div class="seckill">
      <div class="title">
        <p>京东秒杀</p>
        <count-down :activeTime="activeTime"></count-down>
      </div>
      <div class="seckill-list">
        <div class="seckill-list-item" v-for="item in seckill" :key="item.id">
          <img :src="item.icon" alt />
          <span class="price">￥{{ item.price }}</span>
          <span class="current-price">￥{{ item.oldPrice }}</span>
        </div>
      </div>
    </div>

    <!-- 好货限量抢购模块 -->
    <div class="shopping-run-on">
      <img src="@/assets/img/advertising.gif" alt />
    </div>

    <!-- 商品列表 -->
    <waterfall-list :goodsList="goodsList"></waterfall-list>
  </div>
</template>
<script>
import WaterfallList from '@/components/goodslist/WaterfallList.vue'
import CountDown from '@/components/countdown/CountDown.vue'
export default {
  name: 'Page',
  components: {
    WaterfallList,
    CountDown,
  },
  data() {
    return {
      slideshow: [],
      activitys: [],
      seckill: [],
      goodsList: [],
      time: 4 * 60 * 60 * 1000,
      isShowStatus: 0,
      activeTime: 21,
      scrollTop: 0,
    }
  },
  created() {
    this.getSlideshowDate()
    this.getActivityDate()
    this.getSeckillDate()
    this.getGoodsListDate()
    this.onScrollChange()
  },
  mounted() {
    document.addEventListener('scroll', this.onScrollChange)
  },
  methods: {
    // 获取轮播图数据
    async getSlideshowDate() {
      try {
        const { data } = await this.$http.get(
          '/swiper?token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0'
        )
        this.slideshow = data.data.list
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 获取活动内容
    async getActivityDate() {
      try {
        const { data } = await this.$http.get(
          '/activitys?token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0'
        )
        this.activitys = data.data.list
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 获取秒杀数据
    async getSeckillDate() {
      try {
        const { data } = await this.$http.get(
          '/seconds?token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0'
        )
        // console.log(data)
        this.seckill = data.data.list
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 获取商品列表数据
    async getGoodsListDate() {
      try {
        const { data } = await this.$http.get(
          '/goods?token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0'
        )
        this.goodsList = data.data.list
      } catch (err) {
        console.log('获取商品列表数据')
      }
    },
    onScrollChange($event) {
      // console.log($event)
      console.log(this.$refs.navBar)
      this.$refs.navBar.$refs.navBar.scrollTop = 0
      // console.log($event.target.scrollTop)
      // console.log(this.$refs.navBar.scrollTop)
    },
  },
  watch: {
    scrollTop() {
      this.onScrollChange()
    },
  },
}
</script>
<style lang="less" scoped>
.page-container {
  padding-bottom: 96px;
  .van-hairline--bottom::after {
    border-bottom: unset;
  }
  .slideshow-img {
    width: 100%;
    height: 100%;
  }
  .navBar {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0);

    /deep/.van-nav-bar__title {
      max-width: unset;
      .btn-search {
        width: 520px;
        height: 64px;
        .van-button__text,
        .van-icon {
          font-size: 24px;
          color: rgb(153, 153, 153);
        }
        .van-icon {
          font-size: 36px;
        }
      }
    }
  }
  .iconfont {
    font-size: 52px;
    color: #fff;
  }
  .activity {
    display: flex;
    height: 200px;
    .activity-item {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .van-swipe-item {
    height: unset;
  }
  .shopping-nav {
    img {
      width: 80px;
      height: 80px;
    }
  }
  // 京东秒杀
  .seckill {
    height: 306px;
    margin: 16px;
    border-radius: 16px;
    background-color: #fff;
    .title {
      box-sizing: border-box;
      height: 72px;
      padding: 16px;
      font-size: 36px;
      display: flex;
      align-items: center;
      p {
        margin: 0;
        font-size: 36px;
        margin-right: 16px;
      }
    }
    .seckill-list {
      height: 224px;
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      /deep/ .seckill-list-item {
        padding: 0 24px;
        width: 180px;
        height: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          width: 132px;
          height: 132px;
        }
        .price {
          font-size: 32px;
          color: #d81e06;
        }
        .current-price {
          font-size: 30px;
          color: #999;
          text-decoration: line-through;
        }
      }
    }
  }
  // 好货限量抢购模块
  .shopping-run-on {
    height: 230px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 商品列表
  .good-list {
    margin: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .good-list-item {
      width: 49%;
      background-color: #fff;
      border-radius: 20px;
      margin-bottom: 16px;
      > img {
        width: 100%;
        border-top-left-radius: 19px;
        border-top-right-radius: 19px;
      }
      > p {
        padding: 0 10px;
        margin: 0;
        font-size: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        span:nth-child(1) {
          color: #fff;
          background-color: #d81e06;
          padding: 0 8px;
          font-size: 24px;
          margin-right: 4px;
        }
        span:nth-child(2) {
          color: #fff;
          background-color: #909090;
          padding: 0 8px;
          font-size: 24px;
        }
      }
      > div {
        padding: 0 10px;
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 32px;
          // font-weight: 700;
        }
        span.price {
          color: #d81e06;
        }
        span.sales {
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
}
</style>
