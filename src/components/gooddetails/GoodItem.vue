<template>
  <div class="goods-info">
    <div class="left">
      <img :src="goodInfo.img">
    </div>
    <div class="right">
      <p class="title">{{goodInfo.name}}</p>
      <span class="price">￥ {{goodInfo.price}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gooditem',
  props: {
    goodId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      goodInfo: {},
    }
  },
  created() {
    this.getGoodsInfo()
  },
  methods: {
    async getGoodsInfo() {
      try {
        const { data } = await this.$http.get(`/goodsDetail?goodsId=${this.goodId}&token=8f497f50-d6fd-11ea-8930-e5fa1f6c40e0`)
        this.goodInfo = data.data.goodsData
      } catch (err) {
        console.log('获取数据失败')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.goods-info {
  height: 236px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin: 16px 0;
  padding: 16px;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
  .left {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 8px;
    p.title {
      margin: 0;
      font-size: 32px;
      color: #333;
    }
    span.price {
      font-size: 32px;
      color: #d81e06;
    }
  }
}
</style>
