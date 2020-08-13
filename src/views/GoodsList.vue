<template>
  <div class="goods-list-container">
    <van-nav-bar title="商品列表" left-arrow @click-left="$router.back()">
      <div slot="left">
        <img src="@/assets/img/4444.svg" alt />
      </div>
      <div slot="right">
        <img src="@/assets/img/1111.svg" v-if="layoutType === 0" @click="layoutType = 1" />
        <img src="@/assets/img/2222.svg" v-else-if="layoutType === 1" @click="layoutType = 2" />
        <img src="@/assets/img/3333.svg" v-else @click="layoutType = 0" />
      </div>
    </van-nav-bar>

    <!-- 商品列表导航 -->
    <div class="goods-nav">
      <ul class="goods-hearder-nav">
        <li v-for="item in currentCurSelList" :key="item.id" @click="onCurrentCurSel(item)">
          <a href="javascript:;" :class="{activeRed:item.isCheck}">
            <span>{{item.currentCurSel||item.name}}</span>
            <span v-if="item.id===1" class="triangle"></span>
          </a>
        </li>
      </ul>
      <ul v-show="isShowGoodsRank" class="goods-rank">
        <li v-for="item in currentRankList" :key="item.id" @click="onCurrentRank(item)">
          <a href="javascript:;" :class="{activeRed:item.isCheck}">
            <span>{{item.name}}</span>
            <img v-if="item.isCheck" src="@/assets/img/duihao.svg" alt />
          </a>
        </li>
      </ul>
    </div>

    <!-- 标准流布局 -->
    <template v-if=" layoutType === 0 ">
      <div class="standard" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="item.img" />
        </div>
        <div class="right">
          <p :class="{active:!item.isHave}">
            <span v-show="item.isDirect">直营</span>
            <span v-show="!item.isHave">缺货</span>【二手95新】劳力士 日志型系列 奢侈品18K白金男腕表 自动机械男士手表 116264 白色表盘
          </p>
          <div>
            <span class="price">￥{{item.price}}</span>
            <span class="sales-volume">销量:{{item.volume}}</span>
          </div>
        </div>
      </div>
    </template>
    <!-- 网格布局 -->
    <div v-if="layoutType===1" class="gridding">
      <div class="gridding-item" v-for="item in list" :key="item.id">
        <img :src="item.img" alt />
        <p :class="{active:!item.isHave}">
          <span v-show="item.isDirect">直营</span>
          <span v-show="!item.isHave">缺货</span>
          {{item.name}}
        </p>
        <div>
          <span class="price">￥{{item.price}}</span>
          <span class="sales-volume">销量:{{item.volume}}</span>
        </div>
      </div>
    </div>
    <waterfall-list class="waterfall" v-if="layoutType===2" :goodsList="list"></waterfall-list>
  </div>
</template>
<script>
import WaterfallList from '@/components/goodslist/WaterfallList.vue'
import { cloneDeep } from 'lodash'
export default {
  name: 'GoodsList',
  components: { WaterfallList },
  data() {
    return {
      layoutType: 0,
      goodsList: [],
      isShowGoodsRank: false,
      currentCurSelList: [
        { id: 1, name: '默认', isCheck: true },
        { id: 2, name: '有货优先', isCheck: false },
        { id: 3, name: '直营优先', isCheck: false },
      ],
      currentRankList: [
        { id: 1, name: '默认', isCheck: true, currentCurSel: '' },
        { id: 2, name: '价格由高到底', isCheck: false },
        { id: 3, name: '销量由高到低', isCheck: false },
      ],
      list: [],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      try {
        const { data } = await this.$http.get(
          '/goods?token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0'
        )
        this.goodsList = data.data.list
        this.list = cloneDeep(this.goodsList)
      } catch (err) {
        console.log('获取商品列表数据')
      }
    },
    onCurrentCurSel(item) {
      this.initCurSel(item, this.currentCurSelList)
      if (item.id === 1) {
        this.isShowGoodsRank = !this.isShowGoodsRank
      }
      this.list = this.initGoodsList(item.name)
    },
    onCurrentRank(item) {
      this.initCurSel(item, this.currentRankList)
      this.isShowGoodsRank = false
      this.currentCurSelList[0].currentCurSel = item.name
      this.list = this.initGoodsList(item.name)
    },
    initCurSel(item, list) {
      list.forEach((item) => (item.isCheck = false))
      switch (item.id) {
        case 1:
          item.isCheck = true
          break
        case 2:
          item.isCheck = true
          break
        case 3:
          item.isCheck = true
          break
      }
    },
    initGoodsList(name) {
      switch (name) {
        case '默认':
          console.log(this.goodsList)
          return cloneDeep(this.goodsList)
        case '有货优先':
          return [
            ...this.goodsList.filter((item) => item.isHave === true),
            ...this.goodsList.filter((item) => item.isHave === false),
          ]
        case '直营优先':
          return [
            ...this.goodsList.filter((item) => item.isDirect === true),
            ...this.goodsList.filter((item) => item.isDirect === false),
          ]
        case '价格由高到底':
          return this.list.sort((goods1, goods2) => {
            return parseFloat(goods2.price) - parseFloat(goods1.price)
          })
        case '销量由高到低':
          return this.list.sort((goods1, goods2) => {
            return parseFloat(goods2.volume) - parseFloat(goods1.volume)
          })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.goods-list-container {
  padding-top: 238px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 134px;
    border-bottom: 1px solid #e5e5e5;
  }
  .van-nav-bar__left {
    img {
      width: 52px;
      height: 52px;
    }
  }
  .van-nav-bar__right {
    img {
      width: 52px;
      height: 52px;
    }
  }
  .goods-nav {
    position: fixed;
    top: 134px;
    left: 0;
    right: 0;
    z-index: 1;
    .goods-hearder-nav {
      display: flex;
      background-color: #fff;
      height: 104px;
      border-bottom: 1px solid #e5e5e5;
      li {
        flex: 1;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 28px;
          color: #666;
          .triangle {
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 16px solid #d81e06;
            margin-left: 16px;
            transition: all 0.3s;
            transform: rotate(0deg);
          }
        }
      }
    }
    .goods-rank {
      height: 82vh;
      background-color: rgba(0, 0, 0, 0.4);
      li {
        background-color: #fff;
        box-sizing: border-box;
        height: 104px;
        width: 100%;
        padding: 18px;
        border-bottom: 1px solid #e5e5e5;
        a {
          width: 100%;
          height: 100%;
          display: flex;
          font-size: 32px;
          color: #333;
          align-items: center;
          justify-content: space-between;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
  .standard {
    display: flex;
    background-color: #fff;
    padding: 16px;
    .left {
      width: 240px;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px;
      p {
        font-size: 30px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        span {
          padding: 0 10px;
          font-size: 24px;
          color: #fff;
        }
        span:nth-child(1) {
          background-color: #d81e06;
        }
        span:nth-child(2) {
          background-color: #909090;
        }
      }
      > div {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        span:nth-child(1) {
          font-size: 32px;
          color: #d81e06;
        }
        span:nth-child(2) {
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  .gridding {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 16px;
    .gridding-item {
      width: 49%;
      background-color: #fff;
      padding: 16px;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom: 16px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
      p {
        font-size: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        span {
          padding: 0 10px;
          font-size: 24px;
          color: #fff;
        }
        span:nth-child(1) {
          background-color: #d81e06;
        }
        span:nth-child(2) {
          background-color: #909090;
        }
      }
      > div {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        span:nth-child(1) {
          font-size: 32px;
          color: #d81e06;
        }
        span:nth-child(2) {
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  .waterfall {
    margin: 16px;
  }
}
.active {
  color: #999 !important;
}
.activeRed {
  color: #d81e06 !important;
}
</style>
