<template>
  <div class="count-down">
    <span class="count-down-time">{{activeTime}}点场</span>
    <span class="count-down-underway">{{activeStatus}}</span>
  </div>
</template>
<script>
export default {
  name: 'CoutDown',
  props: {
    activeTime: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      activeStatus: '活动进行中',
      // 倒计时时间
      activeCountDown: 0,
      clock: null,
    }
  },
  created() {
    this.computedCountdownTime()
  },
  methods: {
    computedCountdownTime() {
      if (this.clock) {
        clearInterval(this.clock)
      }
      /**
       *   如果当前时间小于12点，那么显示活动未开始
       *   如果当前时间等于十二点，开启倒计时
       *   如果当前时间等于活动时间，那么显示活动进行中
       *   如果当前时间大于活动时间，那么显示活动已结束
       **/
      const currentTime = new Date()

      if (currentTime.getHours() < 12) {
        return (this.activeStatus = '活动未开始')
      }
      if (currentTime.getHours() === this.activeTime) {
        return (this.activeStatus = '活动进行中')
      }
      if (currentTime.getHours() > this.activeTime) {
        return (this.activeStatus = '活动已结束')
      }
      const countDownHours = this.activeTime - currentTime.getHours() - 1
      const countDownMinutes = 60 - currentTime.getMinutes() - 1
      const countDownSeconds = 60 - currentTime.getSeconds()
      this.activeCountDown =
        countDownHours * 3600 + countDownMinutes * 60 + countDownSeconds
      this.clock = setInterval(() => {
        this.activeCountDown--
      }, 1000)
    },
    format(n) {
      if (n < 10) return '0' + n
      return n
    },
  },
  watch: {
    activeCountDown(newTime) {
      const hh = this.format(Math.floor(newTime / 3600))
      const mm = this.format(Math.floor(newTime / 60) % 60)
      const ss = this.format(newTime % 60)
      this.activeStatus = `${hh}:${mm}:${ss}`
      if (!newTime) return this.computedCountdownTime()
    },
    activeTime() {
      this.computedCountdownTime()
    },
  },
}
</script>
<style lang="less" scoped>
.count-down {
  display: flex;
  .count-down-time {
    background-color: #d81e06;
    border: 1px solid #d81e06;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #fff;
    font-size: 30px;
    padding: 0 10px;
  }
  .count-down-underway {
    border: 1px solid #d81e06;
    color: #d81e06;
    font-size: 30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0 10px;
  }
}
</style>
