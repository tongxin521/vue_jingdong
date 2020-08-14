<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      transitionName: 'fold-left',
    }
  },
  watch: {
    // 监听路由对象，决定使用哪种过渡效果
    $route(to, from) {
      // 获取到携带的标记
      const routerType = to.params.routerType
      if (routerType === 'push') {
        // 当进入新页面的时候，保存新页面名称到虚拟任务栈
        // this.virtualTaskStack.push(to.name)
        // 跳转页面
        this.transitionName = 'fold-left'
      } else {
        // 执行后退操作的时候，把最后一个页面从任务栈中弹出
        // this.virtualTaskStack.pop()
        // 后退页面
        this.transitionName = 'fold-right'
      }

      /**
       * 初始化虚拟任务栈
       */
      if (to.params.clearTask) {
        this.virtualTaskStack = ['imooc']
      }
    },
  },
}
</script>
<style lang="scss">
#app {
  background-color: #eee;
  // push 页面时：新页面的进入动画
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.4s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  // push 页面时：原页面的退出动画
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.4s;
  }
  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }

  // 后退页面时：即将展示页面的动画
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.4s;
  }
  @keyframes fold-right-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  // 后退页面时：后退的页面的动画
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.4s;
  }
  @keyframes fold-right-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
}
</style>
