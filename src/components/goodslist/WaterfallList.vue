<template>
  <!-- 商品列表模块 -->
  <div class="good-list" :style="{ height: goodsViewHeight }">
    <div
      class="good-list-item"
      v-for="(item, index) in goodsList"
      :key="item.id"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
      @click="toGoodsDetails(item.isHave, item.id)"
    >
      <img :src="item.img" :style="imgStyles[index]" />
      <p>
        <span class="direct-sales" v-show="item.isDirect">直营</span>
        <span v-show="!item.isHave">缺货</span>
        {{ item.name }}
      </p>
      <div>
        <span class="price">￥{{ item.price }}</span>
        <span class="sales">销量: {{ item.volume }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WaterfallList',
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      MARGIN_BOTTOM: 8,
      goodsItemStyles: [],
      goodsViewHeight: '100%',
    }
  },
  created() {},
  mounted() {},
  methods: {
    initImgHeight() {
      this.goodsList.forEach((item) => {
        const imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({ height: imgHeight })
      })
    },
    imgHeight() {
      const imgHeight = Math.floor(
        Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
          this.MIN_IMG_HEIGHT
      )
      return imgHeight
    },
    initWaterfall() {
      this.$nextTick(() => {
        const $goodsItems = this.$refs.goodsItem
        if (!$goodsItems) return null
        let leftHeightTotal = 0
        let rightHeightTotal = 0
        $goodsItems.forEach(($el, index) => {
          let goodsItemStyle = {}
          const $elHeight = $el.clientHeight + this.MARGIN_BOTTOM
          if (leftHeightTotal <= rightHeightTotal) {
            goodsItemStyle = {
              left: '0px',
              top: leftHeightTotal + 'px',
            }
            leftHeightTotal += $elHeight
          } else {
            goodsItemStyle = {
              right: '0px',
              top: rightHeightTotal + 'px',
            }
            rightHeightTotal += $elHeight
          }
          this.goodsItemStyles.push(goodsItemStyle)
        })
        this.goodsViewHeight =
          leftHeightTotal >= rightHeightTotal
            ? leftHeightTotal + 'px'
            : rightHeightTotal + 'px'
      })
    },
    toGoodsDetails(have, id) {
      if (have) {
        this.$router.push(`/goods/details/${id}`)
      } else {
        this.$toast.fail('该商品暂时没有货物，请挑选一下其他商品')
      }
    },
  },
  watch: {
    goodsList: {
      handler: function (val) {
        this.initWaterfall()
        this.initImgHeight()
        return val
      },
      immediate: true,
    },
  },
}
</script>
<style lang="less" scoped>
// 商品列表
.good-list {
  // margin: 16px;

  position: relative;
  .good-list-item {
    position: absolute;
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

      span {
        font-size: 32px;
      }
      span.price {
        float: left;
        color: #d81e06;
      }
      span.sales {
        float: right;
        font-size: 24px;
        color: #999;
      }
    }
  }
}
</style>
