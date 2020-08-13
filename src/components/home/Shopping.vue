<template>
  <div class="shopping-container">
    <van-nav-bar title="购物车" />

    <div class="goods" v-for="item in $store.state.goodsList" :key="item.id">
      <div class="left" @click="$store.commit('checked',item.id)">
        <img v-if="item.Checked" src="@/assets/img/11.svg" alt />
        <img v-else src="@/assets/img/22.svg" alt />
      </div>
      <div class="center">
        <img :src="item.img" alt />
      </div>
      <div class="right">
        <p>
          <span v-if="item.isDirect">直营</span>
          {{item.name}}
        </p>
        <div>
          <span>￥{{item.price}}</span>
          <div>
            <span @click="$store.commit('reduce',item.id)">-</span>
            <span>{{item.num}}</span>
            <span @click="$store.commit('add',item.id)">+</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <!-- 全选 -->
      <div class="check-all" @click="$store.commit('allChecked')">
        <img v-if="$store.state.isAllChecked" src="@/assets/img/11.svg" alt />
        <img v-else src="@/assets/img/22.svg" alt />
        <span>全选</span>
      </div>
      <!-- 总价 -->
      <div class="total-prices">
        <div>
          <span>合计:</span>
          <span class="fw">￥{{$store.getters.totalPrices===0?'0.00':$store.getters.totalPrices}}</span>
        </div>
        <div>
          <div>
            <span>总额:</span>
            <span class="fw">￥{{$store.getters.totalPrices===0?'0.00':$store.getters.totalPrices}}</span>
          </div>
          <div>
            <span>立减:</span>
            <span class="fw">￥00.00</span>
          </div>
        </div>
      </div>
      <!-- 结算 -->
      <div class="settle-accounts">
        <button>去结算({{$store.getters.checkedNum}})</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shopping',
}
</script>
<style lang="less" scoped>
.shopping-container {
  padding-bottom: 210px;
  .van-nav-bar {
    height: 140px;
    margin-bottom: 4px;
  }
  .footer {
    position: fixed;
    bottom: 96px;
    left: 0;
    right: 0;
    height: 112px;
    display: flex;
    background-color: #fff;
    // 全选
    .check-all {
      width: 116px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      span {
        font-size: 28px;
      }
    }
    // 结算
    .settle-accounts {
      width: 240px;
      height: 100%;
      button {
        width: 100%;
        height: 100%;
        background-color: #d81e06;
        border: unset;
        padding: unset;
        font-size: 32px;
        color: #fff;
      }
    }
    // 总价
    .total-prices {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > div:nth-child(1) {
        display: flex;

        font-size: 32px;
      }
      > div:nth-child(2) {
        display: flex;
        font-size: 24px;
      }
    }
    .fw {
      font-weight: 700;
    }
  }
  .goods {
    height: 262px;
    width: 100%;
    padding: 18px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    .left {
      width: 60px;
      height: 60px;
      img {
        width: 36px;
        height: 36px;
      }
    }
    .center {
      height: 100%;
      img {
        height: 100%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px;
      > p {
        font-size: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        span {
          font-size: 28px;
          padding: 0 10px;
          color: #fff;
          background-color: #d81e06;
          margin-right: 10px;
          text-align: center;
        }
      }
      > div {
        display: flex;
        justify-content: space-between;
        > span {
          color: #d81e06;
          font-size: 32px;
        }
        > div {
          display: flex;
          align-items: center;
          justify-content: space-around;

          span {
            font-size: 28px;
            margin-right: 20px;
          }
          span:nth-child(2) {
            font-size: 32px;
            text-align: center;
            line-height: 40px;
            width: 60px;
            height: 40px;
            padding: 0 10px;
            background-color: #eee;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
