<template>
  <div class="home-container">
    <transition>
      <router-view></router-view>
    </transition>
    <van-grid :column-num="3" class="bt-nav">
      <van-grid-item text="首页" :to="{ name: 'page', params: { clearTask: 'tabs' } }">
        <i slot="icon" class="iconfont icon-1"></i>
      </van-grid-item>
      <van-grid-item text="购物车" :to="{ name: 'shopping', params: { clearTask: 'tabs' } }">
        <i slot="icon" class="iconfont icon-gouwuche"></i>
      </van-grid-item>
      <van-grid-item text="我的" :to="{ name: 'my', params: { clearTask: 'tabs' } }">
        <i slot="icon" class="iconfont icon-wode2"></i>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  name: 'home',
}
</script>
<style lang="less" scoped>
.home-container {
  background-color: #eee;
  .bt-nav {
    height: 96px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    .van-grid-item {
      box-sizing: border-box;
      height: 100%;
      /deep/ .van-grid-item__text {
        margin-top: unset;
      }
    }
  }
  .iconfont {
    font-size: 44px;
  }
}
</style>
